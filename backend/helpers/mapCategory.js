module.exports = function (category) {
    return {
        id: category.id,
        title: category.title,
        imageUrl: category.image,
        publishedAt: category.createdAt
    }
}