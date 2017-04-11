const db = require('../../db');
const Land = require('../../../models/Land');

// To find lands by province nad district
// (accessed at GET http://localhost:8280/api/lands/:province/:district/:page)
module.exports = (req, res) => {
    Land.paginate({
        province: req.params.province,
        district: new RegExp(req.params.district, 'i')
    }, { page: req.params.page, limit: 20 }, (err, lands) => {
        if(err) return res.send(err);
        else if(lands.docs.length === 0) return res.status(404).send('Land not found');
        res.json(lands);
    });
};