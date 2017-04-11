const db = require('../../db');
const Property = require('../../../models/Property');

// update the property with that id (accessed at PUT http://localhost:8280/api/properties/:id)
module.exports = (req, res) => {
    Property.findById(req.params.id, (err, prop) => {
        if(err) res.send(err);
        else if(props.length === 0) res.status(404).send('Property not found');

        prop.price = req.body.price;
        prop.remark = req.body.remark;

        prop.save((err) => {
            if(err) res.send(err);
            res.json({ message: 'Property updated' });
        });
    });
};