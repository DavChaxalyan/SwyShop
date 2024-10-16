const path = require('path');
require('dotenv').config(); 

module.exports = {
  port: process.env.PORT || 5000,
  mongoURI: process.env.MONGODB_URI || 'mongodb://localhost:27017/myapp',
  uploadsDir: path.join(__dirname, '../../uploads'), 
  imagesDir: path.join(__dirname, '../../../frontend/src/assets/images'), 
};