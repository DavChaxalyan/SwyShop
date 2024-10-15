const express = require('express');
const userController = require('../controllers/usersController');
const authMiddleware = require('../middleware/authMiddleware');
const upload = require('../middleware/multer');
const router = express.Router();

router.get('/get/:id', authMiddleware, userController.getUser);
router.put('/put', authMiddleware, upload.single('profileImage'), userController.putUser);

module.exports = router;
