const express = require('express');
const cartProductController = require('../controllers/cartProductController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/post', authMiddleware, cartProductController.postProductInCart);
router.get('/cart', authMiddleware, cartProductController.getProductsInCart);
router.delete('/delete-in-cart', authMiddleware, cartProductController.deleteProductInCart);

module.exports = router;
