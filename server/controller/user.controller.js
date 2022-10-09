const User = require('../models/User.model.js');

const { default: mongoose } = require('mongoose');
const bycrpt = require("bcrypt");
const jwt = require('jsonwebtoken');

const createNewUser = async (email, hashedPassword) => {
    try {
        const user = new User({
            email: email,
            password: hashedPassword
        });

        user.save()
    } catch (err) {
        throw err;
    }


}

const loginUser = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        // if (user != null) {
        const passwordMatch = await bycrpt.compare(req.body.password, user.password);
        if (passwordMatch) {
            const token = jwt.sign(
                {
                    userId: user._id,
                    userEmail: user.email,
                },
                "RANDOM TOKEN",
                { expiresIn: "24h" }
            );

            console.log(token)
            return {
                email: req.body.email,
                token
            };
        } else {
            throw { status: 400, msg: "Password doesn't match" }
        }

    } catch (err) {
        throw { status: 400, msg: "Password doesn't match" }
    }
}

module.exports = { createNewUser, loginUser };