const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const inventorySchema = new Schema({
    warehouseNumber: {
        type: Number,
        unique: true
    },
    MAX_CAPACITY: Number,
    remaining_capacity: Number,
    items: {
        type: [{
            type: mongoose.Types.ObjectId,
            ref: 'Item'
        }]
    }
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
});

const Inventory = mongoose.model('Inventory', inventorySchema, 'Inventory');

module.exports = Inventory;