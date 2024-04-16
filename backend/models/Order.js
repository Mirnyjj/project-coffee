const mongoose = require('mongoose');


const OrderSchema = mongoose.Schema({
    delivery_terms: {},
    products: [], 
    number_order: {
        type: Number,
        required: true
    }
}, { timestamps: true })

const Order = mongoose.model('Order', OrderSchema);

module.exports = Order;