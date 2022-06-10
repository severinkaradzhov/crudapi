const functions = require('../../models/productModel')

function getProductById(req, res) {
	const id = (req.params.id)
	functions.findById(id).then(result => {
		if (result === null) res.status(404).send({ msg: 'Product was not found' })
		res.status(201).send(result)
	}).catch(err => {
		console.log(err)
		res.status(400).send(err.message)
	})
}

module.exports = getProductById