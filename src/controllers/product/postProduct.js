const productModels = require('../../models/productModel')
const logger = require('../../common/logger')

async function postProduct(req, res) {
	logger.info(`req <= /POST /product`)
	try {
		const data = await productModels.insert(req.body)
		logger.info(`res => [201] /POST /product`)
		return res.status(201).send(data)
	} catch (err) {
		logger.info(`res => [400] /POST/product`)
		if (err.code === 11000) {
			return res.status(400).send({ msg: 'Cannot have multiple products with the same sku' })
		}
		return res.status(400).send(err.message)
	}
}

module.exports = postProduct
