const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// Routes
const inventoryRouter = require('./routes/inventory.route.js');
const itemRouter = require('./routes/item.route.js')
const userRouter = require('./routes//user.route.js')
app.use('/inventory', inventoryRouter);
app.use('/item', itemRouter);
app.use('/user', userRouter);


const connectToMongo = async () => {
    try {
        console.log(process.env.MONGO_URI);
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected to Mongoose");
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
}

connectToMongo();

app.listen(process.env.PORT || 8080, () => {
    console.log(`Listening on port ${process.env.PORT || 8080}`)
});
