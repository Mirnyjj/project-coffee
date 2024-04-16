module.exports = function (product) {
    return {
        id: product.id,
        title: product.title,
        imageUrl: product.image,
        description: product.description,
        price: product.price,
        categoryId: product.category_id,
        publishedAt: product.createdAt,
    }
}