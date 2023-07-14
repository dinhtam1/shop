const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const slug = require('mongoose-slug-generator');
mongoose.plugin(slug);

const Cart = new Schema({
    img: { type: String, required: true },
    name: { type: String, required: true },
    price: { type: Number, required: true },
    material: { type: String, required: true },
    quantity: { type: Number, required: true },
    userId: { type: String, required: true },
    slug: { type: String, slug : 'name'},
});

module.exports = mongoose.model('Cart', Cart);

