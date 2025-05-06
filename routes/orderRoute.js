const express = require('express');
const { placeOrder,  allOrder, userOrder, updateStatus } = require('../controllers/orderControllers');
const adminAuth = require('../middleware/adminAuth');
const authUser = require('../middleware/auth');

const orderRouter = express.Router();

orderRouter.post('/list', adminAuth, allOrder);

orderRouter.post('/status', adminAuth, updateStatus);

orderRouter.post('/userorders', authUser, userOrder);

orderRouter.post('/place', authUser, placeOrder);


module.exports = orderRouter;
