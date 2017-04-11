const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');

const PropertySchema = new mongoose.Schema({
    propertyType: { type: String, required: true },
    province: { type: String, required: true },
    price: Number, // หน่วยเป็นตารางเมตร
    remark: String
});
PropertySchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Property', PropertySchema);