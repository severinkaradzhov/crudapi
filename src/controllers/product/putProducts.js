const functions = require('../../models/productModel')

function updateProduct(req, res) {
	const id = req.params.id
	functions.update(id, req.body).then((result) => {
		res.status(201).send(result)
		console.log('Updated')
	}).catch(err => {
		console.log(err)
	})
}

module.exports = updateProduct