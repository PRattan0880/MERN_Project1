const router = require('express').Router();
const { default: mongoose } = require('mongoose');
const { createNewUser, loginUser } = require('../controller/user.controller.js')
const bycrpt = require("bcrypt");
const jwt = require('jsonwebtoken');

router.post("/register", (req, res) => {
    try {
        bycrpt
            .hash(req.body.password, 10)
            .then((hashedPassword) => {
                createNewUser(req.body.email, hashedPassword);
            })
        res.status(201).send();
    } catch (err) {
        res.status(err?.status ?? 500).json(err);
    }

});

router.post("/login", async (req, res) => {
    try {
        const token = await loginUser(req, res);

        res.status(201).send(token);
    } catch (err) {
        res.status(err?.status ?? 500).json(err);
    }
})

module.exports = router;