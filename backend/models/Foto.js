const mongoose = require('mongoose');
const validator = require('validator')


const FotoSchema = mongoose.Schema({
    image: {
        type: String,
        required: true,
        validate: {
            validator: validator.isURL,
            message: 'Изображение должно быть действительным URL-адресом.'
        }
    },
}, { timestamps: true })

const Foto = mongoose.model('Foto', FotoSchema);

module.exports = Foto;