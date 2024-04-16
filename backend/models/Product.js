const mongoose = require('mongoose');
const validator = require('validator');


const ProductSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true,
        validate: {
            validator: validator.isURL,
            message: 'Изображение должно быть действительным URL-адресом.'
        }
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    category_id: {
        type: String,
        required: true
    },
}, { timestamps: true })

const Product = mongoose.model('Product', ProductSchema);

module.exports = Product;