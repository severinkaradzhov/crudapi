const express = require('express')
const app = express()
const port = 3000
//import controllers
const validateUser = require('./middleware/validateUserData')
const validateProducts = require('./middleware/validateProductData')
const userSchema = require('./schema/userSchema')
const productSchema = require('./schema/productSchema')
const mongoose = require('mongoose')
const postUser = require('./controllers/user/postRegister')
const dbURI = 'mongodb+srv://user123:user123@cluster0.n9esa.mongodb.net/crudapi?retryWrites=true&w=majority'
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true }).then(() =>
	app.listen(port, () => {
		console.log(`Example app listening on port ${port}`)
	})
)
	.catch((err) => console.log(err))
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

app.post('/users/register', validateUser(userSchema), postUser)

