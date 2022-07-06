const productModels = require('../../models/productModel')
const logger = require('../../common/logger')

function getProducts(req, res) {
	logger.info(`req <= /GET /products/`)
	const { brand, inStock, price, search, page = 0, page_size = 4 } = req.query
	const filter = {}
	if (brand) filter.brand = brand.toUpperCase()
	if (price) {
		const [type, toSplit] = price.split('(')
		const [num] = toSplit.split(')')
		const operator = '$' + type
		filter.price = { [operator]: num }
	}

	if (inStock) {
		if (inStock === 'true' || inStock === 'false') {
			if (inStock === 'true') filter.inStock = { '$gte': 1 }
			if (inStock === 'false') filter.inStock = { '$eq': 0 }
		} else {
			logger.info(`req <= /GET /products - Invalid inStock Data!`)
		}
	}
	if (search) {
		if (typeof search === 'string') {
			filter.$or = [{ name: new RegExp(search, 'i') }, { description: new RegExp(search, 'i') }]
		} else {
			logger.info(`req <= /GET /products - Invalid search Data!`)
		}
	}
	return productModels.find(filter).skip(page * page_size).limit(page_size).then(result => {
		if (result.length === 0) {
			logger.info(`res => [404] /GET /products`)
			return res.status(404).send('No products matched your criteria')
		}
		logger.info(`res => [200] /GET /products`)
		return res.status(200).send(result)
	}).catch(err => {
		logger.info(`res => [500] /GET /products`)
		return res.status(500).send(err.message)
	})
}

module.exports = getProducts