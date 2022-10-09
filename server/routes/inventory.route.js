//CRUD

const router = require('express').Router();
const { default: mongoose } = require('mongoose');
const { findAllInventory, findInventoryById, createInventory, updateInventory, insertToInventory, removeItemFromInventory, removeItemById, updateItem } = require('../controller/inventory.controller.js');
const Inventory = require('../models/Inventory.model.js');

const validateObjectId = (req, res, next) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        res.status(204).send();
    } else {
        next();
    }
}

router.get('/', async (req, res) => {
    const inventory = await findAllInventory();
    res.json(inventory);
});

router.get('/:id', validateObjectId, async (req, res) => {
    try {
        console.log(req.params.id)
        const item = await findInventoryById(req.params.id);
        res.json(item);
    } catch (err) {
        res.status(err?.status ?? 500).json(err);
    }
});

router.post('/', async (req, res) => {
    try {
        const item = await createInventory(req.body);
        res.status(201).json(item)
    } catch (err) {
        console.log(err)
        res.status(err?.status ?? 500).json(err);
    }

});

router.delete('/:id', async (req, res) => {
    try {
        console.log('DELETE')
        await removeItemById(req.params.id);
        res.send(200)
    } catch (err) {
        res.status(err?.status ?? 500).json(err);
    }
});

router.delete('/:warehouseId/removeItem/:id', validateObjectId, async (req, res) => {
    try {
        // console.log(req.params.warehouseId);
        // console.log(req.params.id);
        console.log(req.body)
        await removeItemFromInventory(req.params.warehouseId, req.params.id, req.body);
        //console.log(res.send())
        res.status(201).json(req.body)
    } catch (err) {
        res.status(err?.status ?? 500).json(err);
    }
});

router.put('/updateItem/:id', validateObjectId, async (req, res) => {
    try {
        // console.log(req.params.warehouseId);
        // console.log(req.params.id);
        console.log(req.params.id)
        await updateItem(req.params.id, req.body);
        //console.log(res.send())
        res.send();
    } catch (err) {
        res.status(err?.status ?? 500).json(err);
    }
});

router.put('/:id', validateObjectId, async (req, res) => {
    try {
        const inventory = await updateInventory(req.params.id, req.body);
        res.send();
    } catch (err) {
        res.status(err?.status ?? 500).json(err);
    }
});

router.put('/addItem/:id', validateObjectId, async (req, res) => {
    // console.log(req.body);

    try {
        const inventory = await insertToInventory(req.params.id, req.body);
        // console.log(inventory);
        res.send();
    } catch (err) {
        res.status(err?.status ?? 500).json(err);
    }
});




module.exports = router;