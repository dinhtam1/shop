const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const Cart = new Schema({
    img: { type: String, required: true },
    name: { type: String, required: true },
    price: { type: Number, required: true },
    material: { type: String, required: true },
    quantity: { type: Number, required: true },
});

module.exports = mongoose.model('Cart', Cart);

