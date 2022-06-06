const Product = require('../../models/productModel')


function getProducts(req, res) {
	Product.find().then(result => {
		res.status(201).send(result)
	}).catch(err => {
		res.status(500).send(err.message)
	})
}

module.exports = getProducts