const db = require('../../db');
const EpsUtil = require('../../../models/util');
const Land = require('../../../models/Land');
const Property = require('../../../models/Property');
//const Promise = require('bluebird');

module.exports = (req, res) => {
    let util = new EpsUtil();

    Property.find({
        province: req.params.province,
        propertyType: req.params.proptype
    }, 'propertyType province price', (err, props) => {
        if(err) return res.send(err);
        else if(props.length === 0) return res.status(404).send('Property not found');
        
        Land.find({
            province: req.params.province,
            district: req.params.district,
            road: new RegExp(req.params.road, 'i')
        }, (err, lands) => {
            if(err) return res.send(err);
            else if(lands.length === 0) return res.status(404).send('Land not found');

            let totalPrices = [];
            for(let p of props) {
                p.price = p.price * util.ConvertToSquareMeter(req.params.unitamount);

                for(let o of lands) {
                    o.minPrice = o.minPrice / 4 * util.ConvertToSquareMeter(req.params.unitamount);
                    o.maxPrice = o.maxPrice / 4 * util.ConvertToSquareMeter(req.params.unitamount);
                    
                    totalPrices.push({
                        propertyType: p.propertyType,
                        province: o.province,
                        district: o.district,
                        road: o.road,
                        minPrice: (o.minPrice + p.price).toLocaleString(),
                        maxPrice: (o.maxPrice + p.price).toLocaleString()
                    });
                }
            }
            res.json(totalPrices);
        });
    });
}


// module.exports = (req, res) => {
//     let calTotalPrice = Promise.promisify(() => {
//         let util = new EpsUtil(), arrProps = [], arrLands = [];
        
//         Property.find({
//             province: req.params.province,
//             propertyType: req.params.proptype
//         }, 'propertyType province price', (err, props) => {
//             if(err) return res.send(err);
//             else if(props.length === 0) return res.status(404).send('Property not found');
            
//             for(let p of props) {
//                 p.price = p.price * util.ConvertToSquareMeter(req.params.unitamount);
//             }
//             arrProps = props;
//             console.log(JSON.stringify(arrProps));
//         });

//         Land.find({
//             province: req.params.province,
//             district: req.params.district,
//             road: req.params.road
//         }, (err, lands) => {
//             if(err) return res.send(err);
//             else if(lands.length === 0) return res.status(404).send('Land not found');

//             for(let o of lands) {
//                 o.minPrice = o.minPrice / 4 * util.ConvertToSquareMeter(req.params.unitamount);
//                 o.maxPrice = o.maxPrice / 4 * util.ConvertToSquareMeter(req.params.unitamount);
//             }
//             arrLands = lands;
//             console.log(JSON.stringify(arrLands));
//         });

//         let totalPrices = [];
//         for(let o of arrLands) {
//             let t = {
//                 province: o.province,
//                 district: o.district,
//                 road: o.road,
//                 propertyType: arrProps[0].propertyType,
//                 minPrice: o.minPrice + arrProps[0].price,
//                 maxPrice: o.maxPrice + arrProps[0].price
//             };
//             totalPrices.push(t);
//         }

//         res.json(totalPrices);
//     });

//     // calTotalPrice().then((err) => {
//     //     if(err) throw err;

//     //     let totalPrices = [];
//     //     for(let o of arrLands) {
//     //         let t = {
//     //             province: o.province,
//     //             district: o.district,
//     //             road: o.road,
//     //             propertyType: arrProps[0].propertyType,
//     //             minPrice: o.minPrice + arrProps[0].price,
//     //             maxPrice: o.maxPrice + arrProps[0].price
//     //         };
//     //         totalPrices.push(t);
//     //     }

//     //     res.json(totalPrices);
//     // });
// };