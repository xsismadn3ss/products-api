const express = require('express')
const router = express.Router()
const controller = require('../controllers/productoController')

router.get('/productos', controller.get_all)
router.get('/productos/:id', controller.get_by_pk)
router.post('/productos', controller.create)
router.post('/productos/:id', controller.update)
router.post('/productos/:id', controller.on_delete)
router.post('/productos/categoria/:id', controller.get_by_cat_id)

module.exports = router