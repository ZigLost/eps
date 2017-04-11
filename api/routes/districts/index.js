const districts = require('express').Router();

districts.get('/:province', require('./criteria'));

module.exports = districts;