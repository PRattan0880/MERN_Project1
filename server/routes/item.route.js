const router = require('express').Router();
const { default: mongoose } = require('mongoose');
const { findAllItems, createItem, deleteItem, updateItem } = require('../controller/item.controller.js')

/**
 * Middleware function used to validate if passed in id is valid mongoDB objectId
 * @param {Object} req      - Request object containing data regarding response
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
 * Router is used to intercept get request to item endpoint
 * @param {anonymous}       - Callback function used to findAllInventory
 * 
 * @callback anonymous 
 * @param {Object} req      - Request object containing data regarding response
 * @param {Object} res      - Response object containing data regarding response
 */

router.get('/', async (req, res) => {
    const item = await findAllItems();
    res.json(item);
});

/**
 * Router is used to intercept post request to item endpoint
 * @param {anonymous}       - Callback function used to create inventory
 * 
 * @callback anonymous 
 * @param {Object} req      - Request object containing data regarding response
 * @param {Object} res      - Response object containing data regarding response
 */
router.post('/', async (req, res) => {
    try {
        const item = await createItem(req.body);
        console.log(item)
        res.status(201).json(item);
    } catch (err) {
        res.status(err?.status ?? 500).json(err);
    }
});

/**
 * Router is used to intercept delete request to item/:id endpoint
 * @param {anonymous}                       - Callback function used to delete inventory by specific Id
 * @param {Function}  validateObjectId      - Middleware function used for validation
 * 
 * @callback anonymous 
 * @param {Object} req      - Request object containing data regarding response
 * @param {Object} res      - Response object containing data regarding response
 */
router.delete('/:id', validateObjectId, async (req, res) => {
    try {
        await deleteItem(req.params.id)
        res.send();
    } catch (err) {
        res.status(err?.status ?? 500).json(err);
    }
});

/**
 * Router is used to intercept put request to /item/:id endpoint
 * @param {anonymous}       - Callback function used to delete specific item with in inventory
 *                           by specific Id
 * @param {Function}  validateObjectId      - Middleware function used for validation
 * 
 * @callback anonymous 
 * @param {Object} req      - Request object containing data regarding response
 * @param {Object} res      - Response object containing data regarding response
 */
router.put('/:id', validateObjectId, async (req, res) => {
    try {
        const inventory = await updateItem(req.params.id, req.body);
        res.send();
    } catch (err) {
        res.status(err?.status ?? 500).json(err);
    }
});
module.exports = router;