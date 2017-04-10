const prices = require('express').Router();

prices.get('/:province/:proptype/:unitamount', require('./buildingprice'));

module.exports = prices;