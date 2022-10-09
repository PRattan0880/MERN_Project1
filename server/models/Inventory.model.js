const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const inventorySchema = new Schema({
    warehouseNumber: {
        type: Number,
        unique: true
    },
    MAX_CAPACITY: Number,
    remaining_capacity: Number,
    imageURL: String,
    inventory: [{
        item: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Item',
            // _id: false
        },
        quantity: Number
    }]
    // inventory: {
    //     items: [
    //         {
    //             item: { type: mongoose.Schema.Types.ObjectId, ref: 'Item' },
    //             quantity: Number
    //         }
    //     ],
    // }

});

const Inventory = mongoose.model('Inventory', inventorySchema, 'Inventory');

module.exports = Inventory;