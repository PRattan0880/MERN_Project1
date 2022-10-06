// Make all queries in this file
const { updateOne } = require('../models/Inventory.model.js');
const Inventory = require('../models/Inventory.model.js');

const findAllInventory = async () => await Inventory.find().populate('inventory.item');

const findInventoryById = async (id) => {
    try {
        const inventory = await Inventory.findById(id).populate('inventory.item');
        if (inventory == null) throw { status: 204, msg: `No item with the id ${id} was found` };
        return inventory;
    } catch (err) {
        throw { status: 500, msg: err.message };
    }
}

const removeItemById = async (id) => {
    const deleteItem = await Inventory.deleteOne({ "upc": id });
    console.log(deleteItem);
}

const createInventory = async (inventoryToSave) => {
    try {
        const inventory = new Inventory(inventoryToSave);
        await inventory.save();
        return inventory;
    } catch (err) {
        throw err;
    }
}

const updateInventory = async (id, inventoryToUpdate) => {
    try {
        await Inventory.findByIdAndUpdate(id, inventoryToUpdate);
    } catch (err) {
        throw { status: 400, msg: err }
    }
}

const insertToInventory = async (id, itemToInsert) => {
    console.log(itemToInsert);
    try {
        const itemTest = { "_id": itemToInsert.item._id }
        const inventory = await Inventory.findOneAndUpdate({ _id: id/*req.params.id*/ },
            {
                "$addToSet": {
                    "inventory": {
                        item: itemTest,
                        quantity: itemToInsert.quantity
                    },
                }, "$inc": {
                    "remaining_capacity": -itemToInsert.quantity
                }
            }, /*{ arrayFilters: [{ "elem._id": itemToInsert.item._id }] },*/ { "new": true });
        console.log(inventory);
    } catch (err) {
        throw { status: 400, msg: err }
    }
}

module.exports = { findAllInventory, findInventoryById, createInventory, removeItemById, updateInventory, insertToInventory };

