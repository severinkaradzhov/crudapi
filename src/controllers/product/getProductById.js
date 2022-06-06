const functions = require('../../models/productModel')

function getProductById(req, res) {
	const id = req.params.id
	functions.findById(id).then(result => {
		res.status(201).send(result)
	}).catch(err => {
		console.log(err)
	})
}

module.exports = getProductById