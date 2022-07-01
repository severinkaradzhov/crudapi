const productModels = require('../../models/productModel')
const { isEmpty } = require('lodash')

function getProductById(req, res) {
	const id = (req.params.id)
	return productModels.findById(id).then(result => {
		if (isEmpty(result)) return res.status(404).send({ msg: 'Product was not found' })
		return res.status(200).send(result)
	}).catch(err => {
		return res.status(500).send(err)
	})
}

module.exports = getProductById