const db = require('../../db');
const Land = require('../../../models/Land');

// To find district by province name (accessed at GET http://localhost:8280/api/districts/:province)
module.exports = (req, res) => {
    Land.find({
        province: req.params.province
    }).distinct('district', (err, lands) => {
        if(err) return res.send(err);
        else if(lands.length === 0) return res.status(404).send('District not found');
        res.json(lands);
    });
};