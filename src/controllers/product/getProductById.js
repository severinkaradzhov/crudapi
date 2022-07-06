const productModels = require('../../models/productModel')
const { isEmpty } = require('lodash')
const logger = require('../../common/logger')

function getProductById(req, res) {
	const id = (req.params.id)
	logger.info(`req <= /GET /products/${id}`)
	return productModels.findById(id).then(result => {
		if (isEmpty(result)) {
			logger.info(`res => [404] /GET /products/${id}`)
			return res.status(404).send({ msg: 'Product was not found' })
		}
		logger.info(`res => [200] /GET /products/${id}`)
		return res.status(200).send(result)
	}).catch(err => {
		logger.info(`res => [500] /GET /products/${id}`)
		return res.status(500).send(err)
	})
}

module.exports = getProductById