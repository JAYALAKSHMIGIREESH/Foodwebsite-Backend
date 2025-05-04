const express = require('express');
const { placeOrder,  allOrder, userOrder, updateStatus } = require('../controllers/orderControllers');
const adminAuth = require('../middleware/adminAuth');
const authUser = require('../middleware/auth');

const orderRouter = express.Router();

// Fetch all orders (Admin only)
orderRouter.post('/list', adminAuth, allOrder);

// Update order status (Admin only)
orderRouter.post('/status', adminAuth, updateStatus);

// Fetch user orders (Authenticated users)
orderRouter.post('/userorders', authUser, userOrder);

// Place a new order (Authenticated users)
orderRouter.post('/place', authUser, placeOrder);


module.exports = orderRouter;
