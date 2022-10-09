//CRUD

const router = require('express').Router();
const { default: mongoose } = require('mongoose');
const { findAllInventory, findInventoryById, createInventory, updateInventory, insertToInventory, removeItemFromInventory, removeItemById, updateItem } = require('../controller/inventory.controller.js');
const Inventory = require('../models/Inventory.model.js');

/**
 * Middleware function used to validate if passed in id is valid mongoDB objectId
 * @param {Object} req      - Requset object containing data regarding response
 * @param {Object} res      - Response object containing data regarding response
 * @param {Function} next   - Executes code after the middleware function is finished
 */
const validateObjectId = (req, res, next) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        res.status(204).send();
    } else {
        next();
    }
}

/**
 * Router is used to intercept get request to inventory endpoint
 * @param {anonymous}       - Callback function used to findAllInventory
 * 
 * @callback anonymous 
 * @param {Object} req      - Requset object containing data regarding response
 * @param {Object} res      - Response object containing data regarding response
 */
router.get('/', async (req, res) => {
    const inventory = await findAllInventory();
    res.json(inventory);
});


/**
 * Router is used to intercept get request to inventory/:id endpoint
 * @param {anonymous}                       - Callback function used to find all inventory by specific Id
 * @param {Function}  validateObjectId      - Middleware function used for validation
 * 
 * @callback anonymous 
 * @param {Object}    req                   - Requset object containing data regarding response
 * @param {Object}    res                   - Response object containing data regarding response
 */
router.get('/:id', validateObjectId, async (req, res) => {
    try {
        const item = await findInventoryById(req.params.id);
        res.json(item);
    } catch (err) {
        res.status(err?.status ?? 500).json(err);
    }
});

/**
 * Router is used to intercept post request to inventory endpoint
 * @param {anonymous}       - Callback function used to create inventory
 * 
 * @callback anonymous 
 * @param {Object} req      - Requset object containing data regarding response
 * @param {Object} res      - Response object containing data regarding response
 */
router.post('/', async (req, res) => {
    try {
        const item = await createInventory(req.body);
        res.status(201).json(item)
    } catch (err) {
        console.log(err)
        res.status(err?.status ?? 500).json(err);
    }

});

/**
 * Router is used to intercept delete request to inventory/:id endpoint
 * @param {anonymous}       - Callback function used to delete inventory by specific Id
 * @param {Function}  validateObjectId      - Middleware function used for validation
 * 
 * @callback anonymous 
 * @param {Object} req      - Requset object containing data regarding response
 * @param {Object} res      - Response object containing data regarding response
 */
router.delete('/:id', async (req, res) => {
    try {
        await removeItemById(req.params.id);
        res.send(200)
    } catch (err) {
        res.status(err?.status ?? 500).json(err);
    }
});

/**
 * Router is used to intercept delete request to inventory/:warehouseId/removeItem/:id endpoint
 * @param {anonymous}       - Callback function used to delete specific item with in inventory
 *                           by specific Id
 * @param {Function}  validateObjectId      - Middleware function used for validation
 * 
 * @callback anonymous 
 * @param {Object} req      - Requset object containing data regarding response
 * @param {Object} res      - Response object containing data regarding response
 */
router.delete('/:warehouseId/removeItem/:id', validateObjectId, async (req, res) => {
    try {
        await removeItemFromInventory(req.params.warehouseId, req.params.id, req.body);
        res.status(201).json(req.body)
    } catch (err) {
        res.status(err?.status ?? 500).json(err);
    }
});

/**
 * Router is used to intercept put request to /inventory/updateItem/:id endpoint
 * @param {anonymous}       - Callback function used to delete specific item with in inventory
 *                           by specific Id
 * @param {Function}  validateObjectId      - Middleware function used for validation
 * 
 * @callback anonymous 
 * @param {Object} req      - Requset object containing data regarding response
 * @param {Object} res      - Response object containing data regarding response
 */
router.put('/updateItem/:id', validateObjectId, async (req, res) => {
    try {
        await updateItem(req.params.id, req.body);
        res.send();
    } catch (err) {
        res.status(err?.status ?? 500).json(err);
    }
});

/**
 * Router is used to intercept put request to /inventory/id endpoint
 * @param {anonymous}       - Callback function used to delete specific item with in inventory
 *                           by specific Id
 * @param {Function}  validateObjectId      - Middleware function used for validation
 * 
 * @callback anonymous 
 * @param {Object} req      - Requset object containing data regarding response
 * @param {Object} res      - Response object containing data regarding response
 */
router.put('/:id', validateObjectId, async (req, res) => {
    try {
        const inventory = await updateInventory(req.params.id, req.body);
        res.send();
    } catch (err) {
        res.status(err?.status ?? 500).json(err);
    }
});

/**
 * Router is used to intercept put request to /inventory/addItem/:id endpoint
 * @param {anonymous}       - Callback function used to delete specific item with in inventory
 *                           by specific Id
 * @param {Function}  validateObjectId      - Middleware function used for validation
 * 
 * @callback anonymous 
 * @param {Object} req      - Requset object containing data regarding response
 * @param {Object} res      - Response object containing data regarding response
 */
router.put('/addItem/:id', validateObjectId, async (req, res) => {
    try {
        const inventory = await insertToInventory(req.params.id, req.body);
        res.send();
    } catch (err) {
        res.status(err?.status ?? 500).json(err);
    }
});




module.exports = router;