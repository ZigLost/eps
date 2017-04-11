const db = require('../../db');
const Land = require('../../../models/Land');

// To find road by province and district name
// (accessed at GET http://localhost:8280/api/roads/:province/:district)
module.exports = (req, res) => {
    Land.find({
        province: req.params.province,
        district: req.params.district
    }).distinct('road', (err, lands) => {
        if(err) return res.send(err);
        else if(lands.length === 0) return res.status(404).send('Road not found');
        res.json(lands);
    });
};