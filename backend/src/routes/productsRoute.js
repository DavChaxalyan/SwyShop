const express = require('express');
const productController = require('../controllers/productController');
const upload = require('../middleware/multer');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/add', authMiddleware, upload.single('image'), productController.addProduct);
router.get('/get', productController.getProducts);

module.exports = router;
