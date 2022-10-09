const Item = require('../models/Item.model.js');

const { default: mongoose } = require('mongoose');

/**
 * Find all item documents item collection
 * @returns list of documents that are found in the item collection
 */
const findAllItems = async () => await Item.find();

/**
 * Creates and adds new item document to the item collection
 * @param {Object} itemToSave       - Item object containing data of item
 * @returns an object representation of item document
 */
const createItem = async itemToSave => {
    try {
        const item = new Item(itemToSave);
        await item.save();
        return item;
    } catch (err) {
        throw { status: 400, msg: err.message }
    }
}

/**
 * Find document based on id in item collection and delete it
 * @param {string} id       - MongoDB _id for the item document 
 */
const deleteItem = async (id) => {
    await Item.findByIdAndDelete(id);
}

/**
 *  Updates a item document based on id and data provided to update 
 * @param {string} id        - MongoDB _id for the item document 
 * @param {Object} itemToUpdate   - Item object containing data of item
 */
const updateItem = async (id, itemToUpdate) => {
    try {
        const test = await Item.findByIdAndUpdate(id, itemToUpdate);
        console.log(id)
    } catch (err) {
        throw { status: 400, msg: err }
    }

}


module.exports = { findAllItems, createItem, deleteItem, updateItem };