const db = require('../../db');
const Property = require('../../../models/Property');

// To find all property types (accessed at GET http://localhost:8280/api/proptypes)
module.exports = (req, res) => {
    Property.find().distinct('propertyType', (err, provs) => {
        if(err) res.send(err);
        res.json(provs);
    });
};