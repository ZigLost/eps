const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/eps');
mongoose.Promise = global.Promise;

module.exports = mongoose;