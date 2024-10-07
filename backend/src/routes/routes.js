const express = require('express');
const authController = require('../controllers/authController');
const productController = require('../controllers/productController');
const upload = require('../middleware/multer');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

// Маршруты для регистрации и логина
router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/add', authMiddleware, upload.single('image'), productController.addProduct);

module.exports = router;
