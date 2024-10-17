const express = require('express');
const productController = require('../controllers/productController');
const upload = require('../middleware/multer');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/add', authMiddleware, upload.single('image'), productController.addProduct);
router.get('/get', productController.getProducts);
router.put('/put', productController.putProduct);
router.get('/get/all', productController.seedProducts);
router.get('/my-products', authMiddleware, productController.getMyProducts);
router.put('/put-product', authMiddleware, upload.single('image'), productController.putProduct);

module.exports = router;
