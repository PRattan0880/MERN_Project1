const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const itemSchema = new Schema({
    sku: Number,
    name: String,
    // quantity: Number,
    category: String,
    price: Number,
    imageURL: String

    // "warehouseNumber": Number,
    // "MAX_CAPACITY": Number,
    // "items": [
    //     {
    //         "sku": String,
    //         "qty": Number,
    //         "category": String,
    //         "price": Number,
    //         "description": String
    //     }
    // ]
    // warehouseNo: Number,
    // items: [{
    //     upc: {
    //         type: String,
    //         unique: true
    //     },
    //     description: String,
    //     category: String,
    //     price: Number,
    //     quantity: Number,
    //     imageURL: String
    // }]
}, {
    toJson: { virtual: true },
    toObject: { virtual: true }
});

const Item = mongoose.model('Item', itemSchema, 'Item');

module.exports = Item;