const proptypes = require('express').Router();

proptypes.get('/', require('./all'));

module.exports = proptypes;