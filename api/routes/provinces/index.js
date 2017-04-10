const provinces = require('express').Router();

provinces.get('/', require('./all'));
provinces.get('/:name', require('./criteria'));

module.exports = provinces;