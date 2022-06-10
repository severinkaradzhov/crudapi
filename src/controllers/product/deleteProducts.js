const functions = require('../../models/productModel')

function deleteProduct(req, res) {
	const id = req.params.id
	functions.remove(id).then(result => {
		if (result === null) return res.status(400).send({ msg: 'Product does not exist' })
		console.log('Deleted')
		return res.status(200).send({ msg: 'Deleted' })
	}).catch(err => {
		console.log(err)
		return res.status(400).send(err.message)
	})
}

module.exports = deleteProduct
