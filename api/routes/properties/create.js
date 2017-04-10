const db = require('../../db');
const Property = require('../../../models/Property');

// create a property (accessed at POST http://localhost:8280/api/properties)
module.exports = (req, res) => {
    let pr = new Property();
    pr.propertyType = req.body.propertyType;
    pr.province = req.body.province;
    pr.price = req.body.price;

    pr.save((err) => {
        if(err) res.send(err);
        res.json({ message: `Create property success` });
    });
};