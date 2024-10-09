// backend/src/controllers/productController.js
const Product = require("../models/Product");

exports.addProduct = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'No image uploaded' });
        }

        const { name, price, category, color, date, quantity, rating, reviewsCount } = req.body; 
        const imagePath = req.file.path; 

        const newProduct = new Product({
            name,
            price,
            image: imagePath, 
            category,
            color,
            date,
            quantity,
            rating,
            reviewsCount,
            user: req.user,
        });

        const savedProduct = await newProduct.save();

        res.status(201).json({ message: 'Product added successfully', product: savedProduct });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to add product' });
    }
};

exports.getProducts = async (req, res) => {
    try {
        const products = await Product.find();
        if (!products || products.length === 0) {
            return res.status(404).json({ error: 'No products found' });
        }
        res.status(200).json(products);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to retrieve products' });
    }
};