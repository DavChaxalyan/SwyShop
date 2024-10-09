const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
const productsRoute = require('./routes/productsRoute');
const cartProductsRoute = require('./routes/cartProductsRoute');
const favoriteProductsRoute = require('./routes/favoriteProductsRoute');
const app = express();
const path = require('path');
const cors = require('cors');
require('dotenv').config();

app.use(cors());
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("MongoDB connected"))
    .catch((err) => console.log(err));

// Middlewares
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/product', productsRoute);
app.use('/api/product', cartProductsRoute);
app.use('/api/product', favoriteProductsRoute);
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
