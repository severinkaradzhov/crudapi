const functions = require('../../models/productModel')

function updateProduct(req, res) {
	const id = req.params.id
	functions.update(id, req.body).then((result) => {
		console.log('Updated')
		return res.status(201).send(result)
	}).catch(err => {
		console.log(err)
		return res.status(400).send(err.message)
	})
}

module.exports = updateProduct