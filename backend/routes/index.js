const express = require('express')

const router = express.Router({ mergeParams: true })

router.use('/', require('./auth'))
router.use('/products', require('./product'))
router.use('/users', require('./user'))
router.use('/categories', require('./category'))
router.use('/orders', require('./order'))
router.use('/fotos', require('./foto'))

module.exports = router