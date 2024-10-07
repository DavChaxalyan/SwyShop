// backend/src/controllers/productController.js
const Product = require("../models/Product");

exports.addProduct = async (req, res) => {
    console.log(req.body); 
    console.log(req.file);

    try {
        if (!req.file) {
            return res.status(400).json({ error: 'No image uploaded' });
        }

        const { name, price, category, color, date } = req.body; 
        const imagePath = req.file.path; 

        const newProduct = new Product({
            name,
            price,
            image: imagePath, 
            category,
            color,
            date,
            user: req.user,
        });

        const savedProduct = await newProduct.save();

        res.status(201).json({ message: 'Product added successfully', product: savedProduct });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to add product' });
    }
};
