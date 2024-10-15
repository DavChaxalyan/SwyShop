const express = require('express');
const authController = require('../controllers/authController');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware')

router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/verify-email', authController.verifyEmail);
router.post('/forgot-password', authController.forgotPassword);
router.post('/reset-password/:token', authController.resetPassword);
router.put('/change-password', authMiddleware, authController.changePassword);

module.exports = router;
