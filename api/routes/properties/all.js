const db = require('../../db');
const Property = require('../../../models/Property');

// get all properies (accessed at GET http://localhost:8280/api/properties)
module.exports = (req, res) => {
    Property.find((err, props) => {
        if(err) res.send(err);
        res.json(props);
    });
};