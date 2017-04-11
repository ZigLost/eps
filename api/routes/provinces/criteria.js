const db = require('../../db');
const Property = require('../../../models/Property');

// To find property by province (accessed at GET http://localhost:8280/api/provinces/:name)
module.exports = (req, res) => {
    Property.find({
        province: new RegExp(req.params.name, 'i')
    }, (err, props) => {
        if(err) res.send(res);
        else if(props.length === 0) res.status(404).send('Property not found');
        res.json(props);
    });
};