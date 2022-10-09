const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/**
 * Creates an Inventory Schema and validation such as required value
 * for document
 */
const inventorySchema = new Schema({
    warehouseNumber: {
        type: Number,
        unique: true
    },
    MAX_CAPACITY: {
        type: Number,
        required: true
    },
    remaining_capacity: {
        type: Number,
        required: true
    },
    imageURL: {
        type: String,
        required: true
    },
    inventory: [{
        item: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Item',
            required: true
        },
        quantity: {
            type: Number,
            required: true
        }
    }]
});

const Inventory = mongoose.model('Inventory', inventorySchema, 'Inventory');

module.exports = Inventory;