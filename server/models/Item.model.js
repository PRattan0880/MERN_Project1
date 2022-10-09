const mongoose = require('mongoose');
const Schema = mongoose.Schema;


/**
 * Creates an Item Schema and validation such as required value
 * for document
 */
const itemSchema = new Schema({
    sku: Number,
    name: String,
    // quantity: Number,
    category: String,
    price: Number,
    imageURL: String
    //     quantity: Number,
    //     imageURL: String
    // }]
}, {
    toJson: { virtual: true },
    toObject: { virtual: true }
});
const Item = mongoose.model('Item', itemSchema, 'Item');

module.exports = Item;