const db = require('../../db');
const Land = require('../../../models/Land');

// To find lands by province (accessed at GET http://localhost:8280/api/lands/:province/:page)
module.exports = (req, res) => {
    Land.paginate({
        province: new RegExp(req.params.province, 'i')
    }, { page: req.params.page, limit: 20 }, (err, lands) => {
        if(err) return res.send(err);
        else if(lands.docs.length === 0) return res.status(404).send('Land not found');
        res.json(lands);
    });
};