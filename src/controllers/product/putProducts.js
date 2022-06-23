const functions = require('../../models/productModel')

function updateProduct(req, res) {
	const id = req.params.id
	return functions.update(id, req.body).then((result) => {
		if (!result) return res.status(404).send('Not found')
		console.log('Updated')
		return res.status(200).send(result)
	}).catch(err => {
		return res.status(500).send(err)
	})
}

module.exports = updateProduct