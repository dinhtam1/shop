const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const Cart = new Schema({
    img: { type: String, required: true },
    name: { type: String, required: true },
    oldprice: { type: String, required: true },
    price: { type: String, required: true },
    like: { type: String, required: true },
    sold: { type: Number, required: true },
    brand: { type: String, required: true },
    origin: { type: String, required: true },
    material: { type: String, required: true },
    quantity: { type: String, required: true },
    
    

});

module.exports = mongoose.model('Cart', Cart);

