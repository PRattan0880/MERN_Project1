// Make all queries in this file


const Inventory = require('../models/Inventory.model.js');

/**
 * Find all inventory documents inventory collection and populate it with item reference
 * @returns list of documents that are found in the inventory collection
 */
const findAllInventory = async () => await Inventory.find().populate('inventory.item');

/**
 * Find document based on id in inventory collection and populate it with item reference
 * @param {string} id  - MongoDB _id for the inventory document 
 * @returns documents that are found in the inventory collection matching the id
 */
const findInventoryById = async (id) => {
    try {
        const inventory = await Inventory.findById(id).populate('inventory.item');
        if (inventory == null) throw { status: 204, msg: `No item with the id ${id} was found` };
        return inventory;
    } catch (err) {
        throw { status: 500, msg: err.message };
    }
}

/**
 * Find document based on id in inventory collection and delete it
 * @param {string} id   - MongoDB _id for the inventory document 
 */
const removeItemById = async (id) => {
    await Inventory.findByIdAndDelete(id);
}

/**
 * 
 * Creates and adds new inventory document to the inventory collection
 * @param {Object} inventoryToSave  - Inventory object containing data of warehouse
 * @returns an object representation of inventory document
 */
const createInventory = async (inventoryToSave) => {
    try {
        const inventory = new Inventory(inventoryToSave);
        await inventory.save();
        return inventory;
    } catch (err) {
        throw err;
    }
}

/**
 * Updates a inventory document based on id and data provided to update 
 * @param {string} id                 - MongoDB _id for the inventory document 
 * @param {Object} inventoryToUpdate  - Inventory object containing data of warehouse
 * @returns updated inventory document
 */
const updateInventory = async (id, inventoryToUpdate) => {
    try {
        return await Inventory.findByIdAndUpdate(id, inventoryToUpdate);
    } catch (err) {
        throw { status: 400, msg: err }
    }
}

/**
 * Finds a inventory document based on id and add new item reference to the inventory array
 * @param {string} id                      - MongoDB _id for the inventory document 
 * @param {Object} itemToInsert            - Inventory object containing data of warehouse
 */
const insertToInventory = async (id, itemToInsert) => {
    console.log(itemToInsert);
    try {
        const itemTest = { "_id": itemToInsert.item._id }
        const inventory = await Inventory.findOneAndUpdate({ _id: id },
            {
                "$addToSet": {
                    "inventory": {
                        item: itemTest,
                        quantity: itemToInsert.quantity
                    },
                }, "$inc": {
                    "remaining_capacity": -itemToInsert.quantity
                }
            }, { "new": true });
    } catch (err) {
        throw { status: 400, msg: err }
    }
}

/**
 * Finds a inventory document based on id and removes item refernce of given id
 * @param {string} warehouseId          - MongoDB _id for the inventory document 
 * @param {string} id                   - MongoDB _id for the item document 
 * @param {Object} data                 - data that is provided in body used to control remaining_capacity
 */
const removeItemFromInventory = async (warehouseId, id, data) => {
    try {
        const inventory = await Inventory.findOneAndUpdate({ _id: warehouseId },
            {
                "$pull": {
                    "inventory": {
                        item: id,
                    },
                }, "$inc": {
                    "remaining_capacity": data.quantity
                }
            }, { "new": true });
        console.log(inventory);
    } catch (err) {
        throw { status: 400, msg: err }
    }
}

/**
* Updates a inventory document based on id and data provided to update 
 * @param {string} id                    - MongoDB _id for the item document 
 * @param {Object} inventoryToUpdate     - Inventory object containing data of warehouse
 */
const updateInventoryItem = async (id, itemToUpdate) => {
    try {
        console.log(itemToUpdate)
        console.log(itemToUpdate.item._id,)
        const testID = itemToUpdate.inventory_id
        const inventory = await Inventory.updateOne({
            'inventory._id': testID
        },
            {
                "$set": {
                    "inventory.$.quantity": itemToUpdate.quantity

                }, "$inc": {
                    "remaining_capacity": -itemToUpdate.quantity
                }
            }, { "new": true });
        console.log(inventory)
        return inventory;
    } catch (err) {
        throw { status: 400, msg: err }
    }
}

module.exports = { findAllInventory, findInventoryById, createInventory, removeItemById, updateInventory, insertToInventory, removeItemFromInventory, updateInventoryItem };

