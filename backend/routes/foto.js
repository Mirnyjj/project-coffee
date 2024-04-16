const express = require('express')
const authenticated = require('../middlewares/authenticated')
const hasRole = require('../middlewares/hasRole')
const ROLES = require('../constants/roles')
const { getFoto, addFoto, deleteFoto } = require('../controllers/foto')
const mapFoto = require('../helpers/mapFoto')

const router = express.Router({ mergeParams: true })

router.get('/', async (req, res) => {
    const foto = await getFoto()
    res.send({ data: foto.map(mapFoto) })
})

router.post('/', authenticated, hasRole([ROLES.ADMIN]), async (req, res) => {
    const newFoto = await addFoto({
        image: req.body.imageUrl,
    });

    res.send({ data: mapFoto(newFoto) })
})

router.delete('/:id', authenticated, hasRole([ROLES.ADMIN]), async (req, res) => {
    await deleteFoto(req.params.id);
    res.send({ error: null })
})

module.exports = router





