const router = require('express').Router();
const { default: mongoose } = require('mongoose');
const { findAllItems, createItem, deleteItem } = require('../controller/item.controller.js')

const validateObjectId = (req, res, next) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        res.status(204).send();
    } else {
        next();
    }
}

router.get('/', async (req, res) => {
    const item = await findAllItems();
    res.json(item);
});

router.post('/', async (req, res) => {
    try {
        const item = await createItem(req.body);
        res.status(201).json(item);
    } catch (err) {
        res.status(err?.status ?? 500).json(err);
    }
});

router.delete('/:id', validateObjectId, async (req, res) => {
    try {
        await deleteItem(req.params.id)
        res.send();
    } catch (err) {
        res.status(err?.status ?? 500).json(err);
    }
});

module.exports = router;