const express = require('express')
const app = express()
const port = 3000
//import controllers
const validateUser = require('./middleware/validateUserData')
const validateProducts = require('./middleware/validateProductData')
const userSchema = require('./schema/userSchema')
const productSchema = require('./schema/productSchema')
app.use(express.json())

app.get('/products', (req, res) => {
	res.status(201).send('Hello')
})

app.get('/products/:id', (req, res) => {

})

app.post('/product', validateProducts(productSchema), (req, res) => {
	res.status(201).send('Products')
})

app.put('/products/:id', (req, res) => {

})

app.delete('/products/:id', (req, res) => {

})

app.post('/users/register', validateUser(userSchema), (req, res) => {
	res.status(201).send('Hello')
})

app.listen(port, () => {
	console.log(`Server is listening on port ${port}`)
})