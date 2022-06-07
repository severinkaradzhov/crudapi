const functions = require('../../models/productModel')


function getProducts(req, res) {
	const page = req.query.page || 0
	const productsPerPage = req.query.page_size || 3
	functions.find().skip(page * productsPerPage).limit(productsPerPage).then(result => {
		res.status(201).send(result)
	}).catch(err => {
		res.status(500).send(err.message)
	})
}

module.exports = getProducts