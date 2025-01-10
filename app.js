const express = require('express')

const categorias = require('./routes/categorias')
const productos = require('./routes/productos')



const app = express()
app.use('/api', categorias)
app.use('/api', productos)


module.exports = app