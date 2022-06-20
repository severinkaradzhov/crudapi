const functions = require('../../models/productModel')
const tempFunctions = require('../../models/temporaryModel')

function deleteProduct(req, res) {
	const id = req.params.id
	return functions.remove(id).then(result => {
		if (result === null) return res.status(404).send({ msg: 'Product does not exist' })
		console.log(result)
		tempFunctions.addToTemp(result)
		console.log('Deleted')
		return res.status(204).send()
	}).catch(err => {
		console.log(err)
		return res.status(500).send(err)
	})
}

module.exports = deleteProduct
