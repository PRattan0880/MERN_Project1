const Item = require('../models/Item.model.js');
const Inventory = require('../models/Inventory.model.js');
const { default: mongoose } = require('mongoose');

const findAllItems = async () => await Item.find();

const createItem = async itemToSave => {
    try {
        const item = new Item(itemToSave);
        await item.save();
        return item;
    } catch (err) {
        throw err;
    }
}

const deleteItem = async (id) => {
    // const deleteItem = await Item.findByIdAndDelete(id);
    //console.log(deleteItem);
    //if (deleteItem) {
    const test = await Item.findByIdAndDelete(id);
    // console.log(test)
    //     //const test = await Inventory.deleteOne({ "items._id": mongoose.Types.ObjectId(id) });
    //     console.log(test);
    //     //}
}


module.exports = { findAllItems, createItem, deleteItem };