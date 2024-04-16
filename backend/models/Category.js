const mongoose = require('mongoose');
const validator = require('validator')


const CategorySchema = mongoose.Schema({
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
    }
}, { timestamps: true })

const Category = mongoose.model('Category', CategorySchema);

module.exports = Category;