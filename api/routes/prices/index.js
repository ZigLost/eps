const prices = require('express').Router();

prices.get('/building/:province/:proptype/:unitamount', require('./buildingprice'));
prices.get('/land/:province/:district/:road/:unitamount', require('./landprice'));
prices.get('/:proptype/:province/:district/:road/:unitamount', require('./totalprice'));

module.exports = prices;