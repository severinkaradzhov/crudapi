const productModels = require('../../models/productModel')
const tempFunctions = require('../../models/temporaryModel')
const logger = require('../../common/logger')

function deleteProduct(req, res) {
	const id = req.params.id
	logger.info(`req <= /DELETE /product/${id}`)
	return productModels.remove(id).then(result => {
		if (result === null) {
			logger.info(`res => [404] /DELETE /products/${id}`)
			return res.status(404).send({ msg: 'Product does not exist' })
		}
		tempFunctions.addToTemp(result)
		logger.info(`res => [204] /DELETE /products/${id}`)
		return res.status(204).send()
	}).catch(err => {
		logger.info(`res => [500] /DELETE /products/${id} - ${err.stack}`)
		return res.status(500).send(err)
	})
}

module.exports = deleteProduct
