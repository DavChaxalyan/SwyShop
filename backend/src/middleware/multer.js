// backend/src/middleware/multer.js
const multer = require('multer');
const path = require('path');

// Настройка хранилища для загруженных файлов
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Папка для хранения изображений
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Уникальное имя файла
  },
});

// Создание экземпляра multer с настройками хранилища
const upload = multer({ storage });

module.exports = upload; // Экспортируем upload
