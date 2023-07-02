const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const User = new Schema({
    username: { type: String, required: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    phonenumber: { type: String, required: true },
    gender: { type: String, required: true },
    userId: { 
        type: String,
        default: function() {
            return Math.random().toString(36).substring(2);
        },
        required: true,
        unique: true
    },
    password: { type: String, required: true },
    gender: { type: String, required: true },
});

module.exports = mongoose.model('User', User);
