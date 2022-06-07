
const functions = require('../../models/productModel')

function deleteProduct(req, res) {
	const id = req.params.id
	functions.remove(id).then(result => {
		res.status(201).send(result)
		console.log('Deleted')
	}).catch(err => {
		console.log(err)
	})
}

module.exports = deleteProduct
