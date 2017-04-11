const roads = require('express').Router();

roads.get('/:province/:district', require('./criteria'));

module.exports = roads;