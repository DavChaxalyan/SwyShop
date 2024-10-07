const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/routes');
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

// Роуты
app.use('/api/auth', authRoutes);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
