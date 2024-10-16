const Product = require("../models/Product");

exports.postProductInCart = async (req, res) => {
    let { id } = req.body;
    try {
        const product = await Product.findById(id);

        if (!product) {
            return res.status(404).json({ error: 'No product found' });
        }

        const userInCart = product.whoInCart.find(item => item.userId.toString() === req.user.toString());
        
        if (userInCart) {
            userInCart.count = 1; 
        } else {
            product.whoInCart.push({ userId: req.user, count: 1 });
        }
        
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
        
        const userInCart = product.whoInCart.find(item => item.userId.toString() === req.user._id.toString());

        if (userInCart) {
            product.whoInCart = product.whoInCart.filter(item => !item.userId.toString() === req.user._id.toString());

            await product.save(); 
            return res.status(200).json({ message: 'Product removed from cart', product });
        } else {
            return res.status(400).json({ error: 'Product is not in your cart' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to remove product from cart' });
    }
};

exports.getProductsInCart = async (req, res) => {
    
    try {
        const products = await Product.find({
            'whoInCart.userId': req.user._id
        });

        if (!products) {
            return res.status(404).json({ error: 'No products found in the cart' });
        }

        res.status(200).json(products);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to retrieve products' });
    }
};

exports.increaseProductCount = async (req, res) => {
    const { productId } = req.body;

    try {
        const product = await Product.findById(productId);

        if (!product) {
            return res.status(404).json({ error: 'No product found' });
        }

        const userInCart = product.whoInCart.find(item => item.userId.toString() === req.user._id.toString());

        if (userInCart) {
            userInCart.count += 1;
        } else {
            product.whoInCart.push({ userId: req.user._id, count: 1 });
        }

        await product.save();
        res.status(200).json(product);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to update product count' });
    }
};

exports.decreaseProductCount = async (req, res) => {
    const { productId } = req.body; 

    try {
        const product = await Product.findById(productId);

        if (!product) {
            return res.status(404).json({ error: 'No product found' });
        }

        
        const userInCart = product.whoInCart.find(item => item.userId.toString() === req.user._id.toString());

        if (userInCart) {
            userInCart.count -= 1;

            if (userInCart.count <= 0) {
                product.whoInCart = product.whoInCart.filter(item => item.userId.toString() !== req.user._id.toString());
            }

            await product.save();
            res.status(200).json(product);
        } else {
            res.status(404).json({ error: 'User does not have this product in the cart' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to update product count' });
    }
};