const Product = require("../models/Product");

exports.seedProducts = async (req, res) => {
    try {
        const existingProducts = await Product.countDocuments();
        if (existingProducts === 0) {
        const products = [
            {
              id: 1,
              name: "Smartphone",
              price: 299.99,
              oldPrice: 349.99,
              statimage: "images/iphone1.jpg",
              category: "Electronics",
              rating: 4.2,
              reviewsCount: 10,
              color: "black",
              date: "1/14/2024",
              quantity: 1,
              isInCart: false
            },
            {
              id: 2,
              name: "Headphones",
              price: 99.99,
              oldPrice: 129.99,
              statimage: "images/headphones1.jpeg",
              category: "Audio",
              rating: 4.8,
              reviewsCount: 10,
              color: "black",
              date: "1/14/2024",
              quantity: 1,
              isInCart: false
            },
            {
              id: 3,
              name: "Sneakers",
              price: 79.99,
              oldPrice: 99.99,
              statimage: "images/sneaker1.webp",
              category: "Clothing",
              rating: 4.5,
              reviewsCount: 10,
              color: "black",
              date: "1/14/2024",
              quantity: 1,
              isInCart: false
            },
            {
              id: 4,
              name: "Fitness Bracelet",
              price: 49.99,
              oldPrice: 69.99,
              statimage: "images/fitness-bracelet1.webp",
              category: "Gadgets",
              rating: 4.5,
              reviewsCount: 10,
              color: "black",
              date: "1/14/2024",
              quantity: 1,
              isInCart: false
            },
            {
              id: 5,
              name: "Smartphone",
              price: 299.99,
              oldPrice: 349.99,
              statimage: "images/smartphone1.jpg",
              category: "Electronics",
              rating: 4.5,
              reviewsCount: 10,
              color: "black",
              date: "1/14/2024",
              quantity: 1,
              isInCart: false
            },
            {
              id: 6,
              name: "Headphones",
              price: 99.99,
              oldPrice: 129.99,
              statimage: "images/headphones2.webp",
              category: "Audio",
              rating: 4.5,
              reviewsCount: 10,
              color: "black",
              date: "1/14/2024",
              quantity: 1,
              isInCart: false
            },
            {
              id: 7,
              name: "Sneakers",
              price: 79.99,
              oldPrice: 99.99,
              statimage: "images/sneakers2.jpg",
              category: "Clothing",
              rating: 4.5,
              reviewsCount: 10,
              color: "black",
              date: "1/14/2024",
              quantity: 1,
              isInCart: false
            },
            {
              id: 8,
              name: "Fitness Bracelet",
              price: 49.99,
              oldPrice: 69.99,
              statimage: "images/fitness-bracelet2.jpg",
              category: "Gadgets",
              rating: 4.5,
              reviewsCount: 10,
              color: "black",
              date: "1/14/2024",
              quantity: 1,
              isInCart: false
            },
            {
              id: 9,
              name: "Smartphone",
              price: 299.99,
              oldPrice: 349.99,
              statimage: "images/smartphone.jpg",
              category: "Electronics",
              rating: 4.5,
              reviewsCount: 10,
              color: "black",
              date: "1/14/2024",
              quantity: 1,
              isInCart: false
            },
            {
              id: 10,
              name: "Headphones",
              price: 99.99,
              oldPrice: 129.99,
              statimage: "images/headphones2.webp",
              category: "Audio",
              rating: 4.5,
              reviewsCount: 10,
              color: "black",
              date: "1/14/2024",
              quantity: 1,
              isInCart: false
            },
            {
              id: 11,
              name: "Sneakers",
              price: 79.99,
              oldPrice: 99.99,
              statimage: "images/sneaker1.webp",
              category: "Clothing",
              rating: 4.5,
              reviewsCount: 10,
              color: "black",
              date: "1/14/2024",
              quantity: 1,
              isInCart: false
            },
            {
              id: 12,
              name: "Fitness Bracelet",
              price: 49.99,
              oldPrice: 69.99,
              statimage: "images/fitness-bracelet1.webp",
              category: "Gadgets",
              rating: 4.5,
              reviewsCount: 10,
              color: "black",
              date: "1/14/2024",
              quantity: 1,
              isInCart: false
            },
            {
              id: 13,
              name: "Smartphone",
              price: 299.99,
              oldPrice: 349.99,
              statimage: "images/smartphone1.jpg",
              category: "Electronics",
              rating: 4.5,
              reviewsCount: 10,
              color: "black",
              date: "1/14/2024",
              quantity: 1,
              isInCart: false
            },
            {
              id: 14,
              name: "Headphones",
              price: 99.99,
              oldPrice: 129.99,
              statimage: "images/headphones1.jpeg",
              category: "Audio",
              rating: 4.5,
              reviewsCount: 10,
              color: "black",
              date: "1/14/2024",
              quantity: 1,
              isInCart: false
            },
            {
              id: 15,
              name: "Sneakers",
              price: 79.99,
              oldPrice: 99.99,
              statimage: "images/sneaker1.webp",
              category: "Clothing",
              rating: 4.5,
              reviewsCount: 10,
              color: "black",
              date: "1/14/2024",
              quantity: 1,
              isInCart: false
            },
            {
              id: 16,
              name: "Fitness Bracelet",
              price: 49.99,
              oldPrice: 69.99,
              statimage: "images/fitness-bracelet1.webp",
              category: "Gadgets",
              rating: 4.5,
              reviewsCount: 10,
              color: "black",
              date: "1/14/2024",
              quantity: 1,
              isInCart: false
            },
            {
              id: 17,
              name: "Fitness Bracelet",
              price: 49.99,
              oldPrice: 69.99,
              statimage: "images/fitness-bracelet2.jpg",
              category: "Gadgets",
              rating: 4.5,
              reviewsCount: 10,
              color: "black",
              date: "1/14/2024",
              quantity: 1,
              isInCart: false
            },
            {
              id: 18,
              name: "Smartphone",
              price: 299.99,
              oldPrice: 349.99,
              statimage: "images/iphone1.jpg",
              category: "Electronics",
              rating: 4.5,
              reviewsCount: 10,
              color: "black",
              date: "1/14/2024",
              quantity: 1,
              isInCart: false
            },
          ];
          await Product.insertMany(products);
        }
        
        res.status(201).json({ message: 'Products successfully loaded into the database' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to load products' });
    }
};

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

exports.getMyProducts = async (req, res) => {
    try {
        const userId = req.user; 
        const products = await Product.find({ user: userId });

        if (!products) {
            res.status(500).json({ message: 'Server error' });
        }
        res.json(products);
      } catch (err) {
        res.status(500).json({ message: 'Server error' });
      }
};

exports.deleteMyProduct = async (req, res) => {
    let { id } = req.body;
    try {
        const product = await Product.findById(id);

        if (!product) {
            return res.status(404).json({ error: 'No product found' });
        }

        if (product.user.toString() !== req.user._id.toString()) {
            return res.status(404).json({ error: 'This is not your product' });
        }

        await product.deleteOne();

        res.status(200).json({ message: 'Product successfully deleted' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to remove product' });
    }
};

exports.putProduct = async (req, res) => {
    try {
        
        const { id, name, price, category, color, date, quantity, rating, reviewsCount } = req.body
        const imagePath = req.file.path;
        const product = await Product.findById(id);
        if (!product) {
            return res.status(404).json({ error: 'No product found' });
        }

        if (product.user.toString() !== req.user._id.toString()) {
            return res.status(404).json({ error: 'No product found' });
        }

        product.name = name
        product.oldPrice = product.price
        product.price = price
        product.image = imagePath
        product.category = category
        product.color = color
        product.updateDate = product.date
        product.date = date
        product.quantity = quantity
        product.rating = rating
        product.reviewsCount = reviewsCount
        product.user = req.user

        await product.save()
        res.status(200).json(product);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to retrieve products' });
    }
};