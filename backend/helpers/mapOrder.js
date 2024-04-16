const parseData = require("./parseData")

module.exports = function (order) {
    return {
        id: order.id,
        deliveryTerms: order.delivery_terms,
        products: order.products,
        numberOrder: order.number_order,
        publishedAt: parseData(order.createdAt),
    }
}