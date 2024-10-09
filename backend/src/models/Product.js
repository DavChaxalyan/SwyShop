const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: String, required: true },
    category: { type: String, required: true },
    color: { type: String, required: true },
    quantity: { type: Number, required: false },
    isInCart: { type: Boolean, required: false, default: false},
    rating: { type: Number, required: false },
    reviewsCount: { type: Number, required: false },
    date: { type: String, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, 
    whoInCart: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    whoInFavorite: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
}, { timestamps: true });

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
