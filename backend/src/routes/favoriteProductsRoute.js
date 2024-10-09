const express = require('express');
const favoriteProductController = require('../controllers/favoriteProductController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/add/favorite', authMiddleware, favoriteProductController.postProductInFavorite);
router.delete('/delete-in-favorite', authMiddleware, favoriteProductController.deleteProductInFavorite);
router.get('/favorite', authMiddleware, favoriteProductController.getProductsInFavorite);

module.exports = router;
