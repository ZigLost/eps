const db = require('../../db');
const EpsUtil = require('../../../models/util');
const Property = require('../../../models/Property');

// To get Building Price based on province and property type
// (accessed at GET http://localhost:8280/api/prices/building/:province/:proptype/:unitamount)
module.exports = (req, res) => {
    Property.find({
        province: req.params.province,
        propertyType: req.params.proptype
    }, 'propertyType province price', (err, props) => {
        if(err) return res.send(err);
        else if(props.length === 0) return res.status(404).send('Property not found');
        
        let util = new EpsUtil();
        for(let p of props) {
            p.price = (p.price * util.ConvertToSquareMeter(req.params.unitamount)).toLocaleString();
        }
        res.json(props);
    });
};