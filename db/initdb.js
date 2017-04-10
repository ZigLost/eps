const fs = require('fs');
const csv = require('fast-csv');
const db = require('../api/db');
const Property = require('../models/Property');

// -- Initialize building prices
Property.find((err, props) => {
    if(err) console.log(err);
    if(props.length === 0) {
        let arrProp = [];
        let stream = fs.createReadStream('./sourcefiles/BuildingPrices.csv');
        let csvStream = csv()
            .on('data', (data) => {
                arrProp.push({
                    propertyType: data[1].trim(),
                    province: data[0].trim(),
                    price: data[2].trim(),
                    remark: data[3].trim()
                });
            })
            .on('end', () => {
                Property.insertMany(arrProp, (err, props) => {
                    if(err) console.log(err);
                });
                console.log('done');
            });
        stream.pipe(csvStream);
    }
});