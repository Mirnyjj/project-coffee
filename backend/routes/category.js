const express = require('express')
const authenticated = require('../middlewares/authenticated')
const hasRole = require('../middlewares/hasRole')
const ROLES = require('../constants/roles')
const { getCategories, getCategory, addCategory, editCategory, deleteCategory } = require('../controllers/categories')
const mapCategory = require('../helpers/mapCategory')



const router = express.Router({ mergeParams: true })

router.get('/', async (req, res) => {
    const { categories, lastPage } = await getCategories(
        req.query.limit,
        req.query.page
    )

    res.send({ data: { lastPage, categories: categories.map(mapCategory) } })
})

router.get('/:id', async (req, res) => {
    const category = await getCategory(req.params.id)

    res.send({ data: mapCategory(category) })
})

router.post('/', authenticated, hasRole([ROLES.ADMIN]), async (req, res) => {
    const newCategory = await addCategory({
        title: req.body.title,
        image: req.body.imageUrl,
    });

    res.send({ data: mapCategory(newCategory) })
})

router.patch('/:id', authenticated, hasRole([ROLES.ADMIN]), async (req, res) => {
    const updatedCategory = await editCategory(
        req.params.id,
        {
            title: req.body.title,
            image: req.body.imageUrl,
        }
    );

    res.send({ data: mapCategory(updatedCategory) })
})

router.delete('/:id', authenticated, hasRole([ROLES.ADMIN]), async (req, res) => {
    await deleteCategory(req.params.id);
    res.send({ error: null })
})

module.exports = router
