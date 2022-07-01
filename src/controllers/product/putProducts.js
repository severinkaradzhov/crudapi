const productModels = require('../../models/productModel')
const logger = require('../../common/logger')

//logger.info()//req sent/=> req <=incoming endpoint, url endpoint 
function updateProduct(req, res) {
	const id = req.params.id
	logger.info('URL : /products/:id, Method : PUT , => req with id')
	return productModels.update(id, req.body).then((result) => {
		if (!result) {
			logger.info('URL : /products/:id, Method : PUT , => res with status 404')
			return res.status(404).send('Not found')
		}
		logger.info('URL : /products/:id, Method : PUT , => res with status 200')
		return res.status(200).send(result)
	}).catch(err => {
		logger.info('URL : /products/:id, Method : PUT , => res with status 500')
		return res.status(500).send(err)
	})
}

module.exports = updateProduct