const db = require('../../db');
const Property = require('../../../models/Property');

// To find all provinces (accessed at GET http://localhost:8280/api/provinces)
module.exports = (req, res) => {
    Property.find().distinct('province', (err, provs) => {
        if(err) res.send(err);
        res.json(provs);
    });
};