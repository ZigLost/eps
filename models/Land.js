const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');

const LandSchema = new mongoose.Schema({
    province: { type: String, required: true },
    district: { type: String, required: true },
    road: { type: String, required: true },
    minPrice: Number, // หน่วยเป็นตารางวา
    maxPrice: Number  // หน่วยเป็นตารางวา
});
LandSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Land', LandSchema);