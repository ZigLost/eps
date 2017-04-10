const properties = require('express').Router();

properties.get('/', require('./all'));
properties.get('/:proptype/:province', require('./criteria'));
properties.post('/', require('./create'));
properties.put('/:id', require('./update'));
properties.delete('/:id', require('./delete'));

module.exports = properties;