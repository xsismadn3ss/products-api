const express = require('express')
const router = express.Router()
const controller = require('../controllers/productoController')

router.get('/productos', controller.get_all)
router.get('/productos/:id', controller.get_by_pk)
router.post('/productos', controller.create)
router.post('/productos/:id', controller.update)
router.post('/productos/:id', controller.on_delete)

module.exports = router