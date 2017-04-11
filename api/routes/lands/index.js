const lands = require('express').Router();

lands.get('/:province/:page', require('./byProvince'));
lands.get('/:province/:district/:page', require('./byDistrict'));
lands.get('/:province/:district/:road/:page', require('./byRoad'));

module.exports = lands;