const Product = require('../models/Product')

// add
async function addProduct(product) {
    const newProduct = await Product.create(product);
    return newProduct
}

// edit
async function editProduct(id, product) {
    const newProduct = await Product.findByIdAndUpdate(id, product, { returnDocument: 'after' })
    return newProduct;
}

// delete
function deleteProduct(id) {
    return Product.deleteOne({ _id: id })
}

// get list with search and pagination
async function getProducts(search = '', limit, page) {
    const [products, count] = await Promise.all([
        Product.find({ title: { $regex: search, $options: 'i' } })
            .limit(limit)
            .skip((page - 1) * limit)
            .sort({ createdAt: -1 }),
        Product.countDocuments({ title: { $regex: search, $options: 'i' } })
    ])

    return {
        products,
        lastPage: Math.ceil(count / limit)
    }
}

// get item
function getProductsCategoryId(categoryId) {
    return Product.find({category_id: categoryId})
}

function getProduct(id) {
    return Product.findById(id)
}


module.exports = {
    addProduct: addProduct,
    editProduct: editProduct,
    deleteProduct: deleteProduct,
    getProducts: getProducts,
    getProductsCategoryId: getProductsCategoryId,
    getProduct: getProduct
}