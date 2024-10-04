const express = require('express');
const authController = require('../controllers/authController');
const router = express.Router();

// Маршруты для регистрации и логина
router.post('/register', authController.register);
router.post('/login', authController.login);

module.exports = router;
