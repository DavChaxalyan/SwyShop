const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    oldPrice: { type: Number, required: false },
    image: { type: String, required: false },
    statimage: { type: String, required: false },
    category: { type: String, required: true },
    color: { type: String, required: true },
    quantity: { type: Number, required: false },
    isInCart: { type: Boolean, required: false, default: false},
    rating: { type: Number, required: false },
    reviewsCount: { type: Number, required: false },
    date: { type: String, required: true },
    updateDate: { type: String, required: false },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: false }, 
    whoInCart: [{
        userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        count: { type: Number, required: false, default: 1 } 
    }],
    whoInFavorite: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
}, { timestamps: true });

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
