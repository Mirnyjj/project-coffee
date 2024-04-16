module.exports = function (foto) {
    return {
        id: foto.id,
        imageUrl: foto.image,
        publishedAt: foto.createdAt,
    }
}