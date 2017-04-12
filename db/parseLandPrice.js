const lineReader = require('line-reader');
const Promise = require('bluebird');
const fs = require('fs');
const path = require('path');
const db = require('../api/db');
const Land = require('../models/Land');

let sourcefilesDir = './sourcefiles',
    errorFile = './error.json';
let lands = [], district = '';

if(fs.existsSync(errorFile)) fs.unlink(errorFile);

let eachLine = Promise.promisify(lineReader.eachLine);

fs.readdir(sourcefilesDir, (err, files) => {
    files.filter((f) => { 
        return f.includes('.txt');
    }).forEach((file) => {
        file = `${sourcefilesDir}/${file}`;
        let province = path.basename(file, '.txt');

        Land.remove({}, (err) => {
            if(err) throw err;

            eachLine(file, (line) => {
                let land = new Land();
                // fix bug first line contains ﻿ (line-reader)
                if(line == '﻿') return;
                if(line.includes('อำเภอ')) {
                    district = line;
                    return;
                }

                land.province = province;
                land.district = district;
                let price = [], i = line.length - 1;
                for(; i >= 0; i--) {
                    if(line.charAt(i) === ',') continue;
                    if(line.charAt(i) === ' ') break;
                    price.unshift(line.charAt(i));
                }
                land.road = line.substring(0, i);

                let realPrices = price.join('').split('-');
                land.minPrice = parseFloat(realPrices[0]);
                land.maxPrice = parseFloat(realPrices.length > 1 ? realPrices[1] : realPrices[0]);

                if(land.maxPrice < land.minPrice) {
                    fs.appendFileSync(errorFile, JSON.stringify(land) + '\n');
                }
                
                lands.push(land);
            }).then((err) => {
                if(err) throw err;

                console.log(`InsertMany ${province}`);
                Land.insertMany(lands, (err, props) => {
                    if(err) console.log(err);
                    console.log(`Completed import data ${province}`);
                });
            });
        });
    });
});