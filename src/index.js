
const validateUser = require('./middleware/validateUserData')
const validateProducts = require('./middleware/validateProductData')
const userSchema = require('./schema/userSchema')
const productSchema = require('./schema/productSchema')
const postUser = require('./controllers/user/postRegister')
const postProduct = require('./controllers/product/postProduct')
const deleteProduct = require('./controllers/product/deleteProducts')
const getProductById = require('./controllers/product/getProductById')
//const updateProduct = require('./controllers/product/putProducts')
const getProducts = require('./controllers/product/getProducts')
//require('./common/db')
const express = require('express')
const app = express()
const port = 3000
const mongoose = require('mongoose')
const dbURI = 'mongodb+srv://user123:user123@cluster0.n9esa.mongodb.net/crudapi?retryWrites=true&w=majority'
module.exports = mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true }).then(() =>
	app.listen(port, () => {
		console.log(`Example app listening on port ${port}`)
	})
)
	.catch((err) => console.log(err))


app.use(express.json())

app.get('/products', getProducts)

app.get('/products/:id', getProductById)

app.post('/product', validateProducts(productSchema), postProduct)

//app.put('/products/:id', updateProduct)

app.delete('/products/:id', deleteProduct)

app.post('/users/register', validateUser(userSchema), postUser)

