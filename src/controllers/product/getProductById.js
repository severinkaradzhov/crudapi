const functions = require('../../models/productModel')
const { isEmpty } = require('lodash')

function getProductById(req, res) {
	const id = (req.params.id)
	return functions.findById(id).then(result => {
		if (isEmpty(result)) return res.status(404).send({ msg: 'Product was not found' })// check 
		return res.status(200).send(result)
	}).catch(err => {
		return res.status(500).send(err)//server side
	})
}

module.exports = getProductById