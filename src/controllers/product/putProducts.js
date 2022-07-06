const productModels = require('../../models/productModel')
const logger = require('../../common/logger')

//logger.info()//req sent/=> req <=incoming endpoint, url endpoint 
function updateProduct(req, res) {
	const id = req.params.id
	logger.info(`req <= /PUT /products/${id}`)
	return productModels.update(id, req.body).then((result) => {
		if (!result) {
			logger.info(`res => [404] /PUT /products/${id}`)
			return res.status(404).send('Not found')
		}
		logger.info(`res => [200] /PUT /products/${id}`)
		return res.status(200).send(result)
	}).catch(err => {
		logger.info(`res => [500] /PUT /products/${id}`)
		return res.status(500).send(err)
	})
}

module.exports = updateProduct