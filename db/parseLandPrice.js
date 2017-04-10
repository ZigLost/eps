const lineReader = require('line-reader');
const Promise = require('bluebird');
const fs = require('fs');
const path = require('path');

let importedFile = './sourcefiles/นนทบุรี.txt',
    errorFile = './error.json',
    outFile = './นนทบุรี.json';
let lands = [], district = '', province = path.basename(importedFile, '.txt');

if(fs.existsSync(errorFile)) fs.unlink(errorFile);

let eachLine = Promise.promisify(lineReader.eachLine);
eachLine(importedFile, (line) => {
    let land = {};
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
    //console.log(lands);
    fs.writeFile(outFile, JSON.stringify(lands));
});