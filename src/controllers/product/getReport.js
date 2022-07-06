const productModels = require('../../models/productModel')
const { AsyncParser } = require('json2csv');
const logger = require('../../common/logger')


async function getReport(req, res) {
	logger.info(`req <= /GET /products/report`)
	const headers = ['name', 'price', 'brand', 'sku', 'inStock', 'description']
	const opts = { headers }
	const transformOpts = { highWaterMark: 8192 }

	const asyncParser = new AsyncParser(opts, transformOpts)

	const data = await productModels.find()
	asyncParser.processor
		.pipe(res)
		.on('end', () => {
			logger.info(`res => [200] /GET /products/report`)
			return res
				.setHeader('Content-disposition', 'attachment; filename=data.csv')
				.set('Content-Type', 'multipart/form-data; charset=utf-8')
				.status(200)
				.send()
		}).on('error', err => {
			logger.info(`res => [500] /GET /products/report`)
			return res.status(500).send(err)
		})

	asyncParser.input.push(JSON.stringify(data))
	asyncParser.input.push(null)

}

module.exports = getReport


