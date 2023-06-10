const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const Product = new Schema({
    name: { type: String, required: true },
    price: { type: String },
    quantity: { type: Number },

});

module.exports = mongoose.model('Product', Product);