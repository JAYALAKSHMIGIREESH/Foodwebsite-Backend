const express = require('express');
const { addToCart, updateCart, getUserCart } = require('../controllers/cartControllers');
const authUser = require('../middleware/auth');

const cartRouter = express.Router();

cartRouter.post('/add', authUser, addToCart); // Add product to cart
cartRouter.post('/update', authUser, updateCart); // Update cart quantity
cartRouter.post('/get', authUser, getUserCart); // Get user cart

module.exports = cartRouter;
