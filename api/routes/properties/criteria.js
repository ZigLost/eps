const db = require('../../db');
const Property = require('../../../models/Property');

// To find properties by type and province (accessed at GET http://localhost:8280/api/properties/:proptype/:province)
module.exports = (req, res) => {
    Property.find({
        propertyType: req.params.proptype,
        province: req.params.province
    }, (err, props) => {
        if(err) return res.send(err);
        else if(props) return res.status(404).send('Property not found');
        res.json(props);
    });
};