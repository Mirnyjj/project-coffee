const Order = require('../models/Order')

// add
async function addOrder(order) {
    const newOrder = await Order.create(order);

    return newOrder
}

// edit
async function editOrder(id, order) {
    const newOrder = await Order.findByIdAndUpdate(id, order, { returnDocument: 'after' })

    return newOrder;
}

// delete
function deleteOrder(id) {
    return Order.deleteOne({ _id: id })
}

// get list with search and pagination
async function getOrders(search, limit = 3, page = 1) {
    let query = {};

  if (search !== "" && search) {
      let phoneNumberRegExp = new RegExp(search + '$');
      query = { 'delivery_terms.telephone': phoneNumberRegExp };

  }
    const [orders, count] = await Promise.all([
        Order.find(query)
            .limit(limit)
            .skip((page - 1) * limit)
            .sort({ createdAt: -1 }),
        Order.countDocuments()
    ])

    return {
        orders,
        lastPage: Math.ceil(count / limit)
    }
}

// get item
function getOrder(id) {
    return Order.findById(id)
}

module.exports = {
    addOrder: addOrder,
    editOrder: editOrder,
    deleteOrder: deleteOrder,
    getOrders: getOrders,
    getOrder: getOrder
}