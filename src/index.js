const express = require('express')
const app = express()
const port = 3000
const validateUser = require('./middleware/validateUserData')
const validateProducts = require('./middleware/validateProductData')
const userSchema = require('./schema/userSchema')
const productSchema = require('./schema/productSchema')
const postUser = require('./controllers/user/postRegister')
const postProduct = require('./controllers/product/postProduct')
const deleteProduct = require('./controllers/product/deleteProducts')
const getProductById = require('./controllers/product/getProductById')
const getProducts = require('./controllers/product/getProducts')
require('./common/db')

app.use(express.json())

app.get('/products', getProducts)

app.get('/products/:id', getProductById)

app.post('/product', validateProducts(productSchema), postProduct)

app.delete('/products/:id', deleteProduct)

app.post('/users/register', validateUser(userSchema), postUser)

app.listen(port, () => {
	console.log(`Example app listening on port ${port}`)
})