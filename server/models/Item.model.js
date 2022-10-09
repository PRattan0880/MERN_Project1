const mongoose = require('mongoose');
const Schema = mongoose.Schema;


/**
 * Creates an Item Schema and validation such as required value
 * for document
 */
const itemSchema = new Schema({
    sku: {
        type: Number,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    imageURL: {
        type: String,
        required: true
    },
}, {
    toJson: { virtual: true },
    toObject: { virtual: true }
});
const Item = mongoose.model('Item', itemSchema, 'Item');

module.exports = Item;