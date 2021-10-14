// Importing require modules
const express = require('express');
const router = express.Router();

const userRouter = require('./users.router');
const productRouter = require('./products.router');
const orderRouter = require('./orders.router');

router.use('/users', userRouter);
router.use('/products', productRouter);
router.use('/orders', orderRouter);


module.exports = router;