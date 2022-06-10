const functions = require('../../models/productModel')
const addToTemp = require('../../models/temporaryModel')

function deleteProduct(req, res) {
	const id = req.params.id
	functions.remove(id).then(result => {
		if (result === null) return res.status(400).send({ msg: 'Product does not exist' })
		result.date = 1
		result.expireAfterSeconds = 604801
		console.log(result)
		addToTemp(result)
		console.log('Deleted')
		return res.status(200).send({ msg: 'Deleted' })
	}).catch(err => {
		console.log(err)
		return res.status(400).send(err.message)
	})
}

module.exports = deleteProduct
