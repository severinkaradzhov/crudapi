const express = require('express')
const app = express()
const port = 3000
const validateUser = require('./middleware/validateUserData')
const validateUserLogin = require('./middleware/validateUserLogin')
const validateProducts = require('./middleware/validateProductData')
const userSchema = require('./schema/userSchema')
const productSchema = require('./schema/productSchema')
const postUser = require('./controllers/user/postRegister')
const postProduct = require('./controllers/product/postProduct')
const postLogin = require('./controllers/user/postLogin')
const updateProduct = require('./controllers/product/putProducts')
const deleteProduct = require('./controllers/product/deleteProducts')
const getProductById = require('./controllers/product/getProductById')
const getProducts = require('./controllers/product/getProducts')
const auth = require('./middleware/auth')
const userLoginSchema = require('./schema/userLoginSchema')
require('./common/db')

app.use(express.json())

app.get('/products', auth, getProducts)

app.get('/products/:id', auth, getProductById)

app.post('/product', auth, validateProducts(productSchema), postProduct)

app.put('/products/:id', auth, updateProduct)

app.delete('/products/:id', auth, deleteProduct)

app.post('/users/register', validateUser(userSchema), postUser)

app.post('/users/login', validateUserLogin(userLoginSchema), postLogin)

app.listen(port, () => {
	console.log(`Example app listening on port ${port}`)
})