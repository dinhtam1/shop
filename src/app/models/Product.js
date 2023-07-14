const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const Product = new Schema({
    img: { type: String, required: true },
    name: { type: String, required: true },
    oldprice: { type: String, required: true },
    price: { type: String, required: true },
    like: { type: String, required: true },
    sold: { type: Number, required: true },
    brand: { type: String, required: true },
    origin: { type: String, required: true },
    material: { type: String, required: true },
    slug: { type: String, slug : 'name'},

});

module.exports = mongoose.model('Product', Product);

