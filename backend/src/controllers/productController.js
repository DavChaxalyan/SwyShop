// backend/src/controllers/productController.js
const Product = require("../models/Product");
const CartProducts = require("../models/ProducstInCart")

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

exports.postProductInCart = async (req, res) => {
    let { id } = req.body;
    try {
        const product = await Product.findById(id);

        if (!product) {
            return res.status(404).json({ error: 'No product found' });
        }
        
        product.whoInCart.push(req.user);
        await product.save();

        res.status(200).json(product);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to retrieve products' });
    }
};

exports.deleteProductInCart = async (req, res) => {
    let { id } = req.body;
    try {
        const product = await Product.findById(id);

        if (!product) {
            return res.status(404).json({ error: 'No product found' });
        }

        if (product.whoInCart.includes(req.user._id)) {
            product.whoInCart = product.whoInCart.filter(userId => !userId.equals(req.user._id));
        } else {
            return res.status(400).json({ error: 'Product is not in your cart' });
        }
        await product.save(); 
        res.status(200).json(product);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to remove product from cart' });
    }
};

exports.getProductsInCart = async (req, res) => {
    try {
        const products = await Product.find({ whoInCart: { $in: [req.user] } });

        if (!products) {
            return res.status(404).json({ error: 'No products found in the cart' });
        }

        res.status(200).json(products);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to retrieve products' });
    }
};