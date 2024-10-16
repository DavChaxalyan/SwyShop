const express = require('express');
const cors = require('cors');
const path = require('path');
const connectDB = require('./config/db'); 
const config = require('./config/config'); 
const authRoutes = require('./routes/authRoutes');
const productsRoute = require('./routes/productsRoute');
const cartProductsRoute = require('./routes/cartProductsRoute');
const favoriteProductsRoute = require('./routes/favoriteProductsRoute');
const userRoutes = require('./routes/userRoutes');

const app = express();

app.use(cors());
app.use(express.json());

connectDB();

app.use('/api/auth', authRoutes);
app.use('/api/product', productsRoute);
app.use('/api/product', cartProductsRoute);
app.use('/api/product', favoriteProductsRoute);
app.use('/api/user', userRoutes);

app.use('/uploads', express.static(config.uploadsDir));
app.use('/images', express.static(config.imagesDir));

const PORT = config.port;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
