const Product = require("../models/Product");

exports.postProductInFavorite = async (req, res) => {
    let { id } = req.body;
    try {
        const product = await Product.findById(id);

        if (!product) {
            return res.status(404).json({ error: 'No product found' });
        }
        
        product.whoInFavorite.push(req.user);
        await product.save();

        res.status(200).json(product);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to retrieve products' });
    }
};

exports.deleteProductInFavorite = async (req, res) => {
    let { id } = req.body;
    try {
        const product = await Product.findById(id);

        if (!product) {
            return res.status(404).json({ error: 'No product found' });
        }

        if (product.whoInFavorite.includes(req.user._id)) {
            product.whoInFavorite = product.whoInFavorite.filter(userId => !userId.equals(req.user._id));
        } else {
            return res.status(400).json({ error: 'Product is not in your favorite' });
        }
        await product.save(); 
        res.status(200).json(product);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to remove product from favorite' });
    }
};

exports.getProductsInFavorite = async (req, res) => {
    try {
        const products = await Product.find({ whoInFavorite: { $in: [req.user] } });

        if (!products) {
            return res.status(404).json({ error: 'No products found in the favorite' });
        }

        res.status(200).json(products);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to retrieve products' });
    }
};