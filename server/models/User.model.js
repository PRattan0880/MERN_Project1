const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    email: {
        type: String,
        required: [true, "Please provide an Email!"],
        unique: [true, "Email already exists"],
    },
    password: {
        type: String,
        required: [true, "Please provide an password!"],
        unique: false,
    }
}, {
    toJson: { virtual: true },
    toObject: { virtual: true }
});

const Item = mongoose.model('User', UserSchema, 'User');

module.exports = Item;