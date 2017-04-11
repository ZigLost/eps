const db = require('../../db');
const EpsUtil = require('../../../models/util');
const Land = require('../../../models/Land');

// To get Land Price based on province, district, and road
// (accessed at GET http://localhost:8280/api/prices/land/:province/:district/:road/:unitamount)
module.exports = (req, res) => {
    Land.find({
        province: req.params.province,
        district: req.params.district,
        road: req.params.road
    }, (err, lands) => {
        if(err) return res.send(err);
        else if(lands.length === 0) return res.status(404).send('Land not found');

        let util = new EpsUtil();
        for(let o of lands) {
            o.minPrice = (o.minPrice / 4 * util.ConvertToSquareMeter(req.params.unitamount)).toLocaleString();
            o.maxPrice = (o.maxPrice / 4 * util.ConvertToSquareMeter(req.params.unitamount)).toLocaleString();
        }
        res.json(lands);
    });
};