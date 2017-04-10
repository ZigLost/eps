const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PropertySchema = new Schema({
    propertyType: { type: String, required: true },
    province: { type: String, required: true },
    price: Number,
    remark: String
});

module.exports = mongoose.model('Property', PropertySchema);