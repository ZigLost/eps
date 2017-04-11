const db = require('../../db');
const Property = require('../../../models/Property');

// delete the property with that id (accessed at DELETE http://localhost:8280/api/properties/:id)
module.exports = (req, res) => {
    Property.remove({ _id: req.params.id }, (err, prop) => {
        if(err) res.send(err);
        else if(props.length === 0) res.status(404).send('Property not found');
        res.json({ message: 'Successfully delete property' });
    });
};