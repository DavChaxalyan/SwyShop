const express = require('express');
const oderController = require('../controllers/orderController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/create', authMiddleware, oderController.createOrder);
router.get('/get', authMiddleware, oderController.getOrders);

module.exports = router;
