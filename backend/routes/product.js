const express = require('express')
const authenticated = require('../middlewares/authenticated')
const hasRole = require('../middlewares/hasRole')
const ROLES = require('../constants/roles')
const { getProducts, getProduct, addProduct, editProduct, deleteProduct, getProductsCategoryId } = require('../controllers/product')
const mapProduct = require('../helpers/mapProduct')



const router = express.Router({ mergeParams: true })

router.get('/', async (req, res) => {
    const { products, lastPage } = await getProducts(
        req.query.search,
        req.query.limit,
        req.query.page
    )

    res.send({ data: { lastPage, products: products.map(mapProduct) } })
})

router.get('/categoryId/:categoryId', async (req, res) => {
    const product = await getProductsCategoryId(req.params.categoryId)

    res.send({ data: product.map(mapProduct) })
})

router.get('/:id', async (req, res) => {
    const product = await getProduct(req.params.id)

    res.send({ data: mapProduct(product) })
})

router.post('/', authenticated, hasRole([ROLES.ADMIN]), async (req, res) => {

    const newProduct = await addProduct({
        title: req.body.title,
        description: req.body.description,
        price: req.body.price,
        image: req.body.imageUrl,
        category_id: req.body.categoryId,
    });

    res.send({ data: mapProduct(newProduct) })
})

router.patch('/:id', authenticated, hasRole([ROLES.ADMIN]), async (req, res) => {
    const updatedProduct = await editProduct(
        req.params.id,
        {
            title: req.body.title,
            description: req.body.description,
            price: req.body.price,
            image: req.body.imageUrl,
            category_id: req.body.categoryId,
        }
    );

    res.send({ data: mapProduct(updatedProduct) })
})

router.delete('/:id', authenticated, hasRole([ROLES.ADMIN]), async (req, res) => {
    await deleteProduct(req.params.id);
    res.send({ error: null })
})

module.exports = router