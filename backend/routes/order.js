const express = require('express')
const authenticated = require('../middlewares/authenticated')
const hasRole = require('../middlewares/hasRole')
const ROLES = require('../constants/roles')
const { getOrders, getOrder, addOrder, editOrder, deleteOrder } = require('../controllers/order')
const mapOrder = require('../helpers/mapOrder')
const getRandomOrder = require('../helpers/getRandomOrder')


const router = express.Router({ mergeParams: true })

router.post('/', async (req, res) => {
    const orderNumber = getRandomOrder(100, 999)

    const newOrder = await addOrder({
        products: req.body.products,
        delivery_terms: req.body.deliveryTerms,
        number_order: orderNumber,
    });

    res.send({ data: mapOrder(newOrder).numberOrder })
})

router.get('/', authenticated, async (req, res) => {
    const { orders, lastPage } = await getOrders(
        req.query.search,
        req.query.limit,
        req.query.page
    )

    res.send({ data: { lastPage, orders: orders.map(mapOrder) } })
})

router.get('/:id', authenticated, async (req, res) => {
    const order = await getOrder(req.params.id)

    res.send({ data: mapOrder(order) })
})


router.patch('/:id', authenticated, hasRole([ROLES.ADMIN]), async (req, res) => {
    const updatedOrder = await editOrder(
        req.params.id,
        {
            products: req.body.products,
            delivery_terms: req.body.deliveryTerms,
        }
    );

    res.send({ data: mapOrder(updatedOrder) })
})

router.delete('/:id', authenticated, hasRole([ROLES.ADMIN]), async (req, res) => {
    await deleteOrder(req.params.id);
    res.send({ error: null })
})

module.exports = router
