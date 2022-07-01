const productModels = require('../../models/productModel')
const { AsyncParser } = require('json2csv');

async function getReport(req, res) {

	const headers = ['name', 'price', 'brand', 'sku', 'inStock', 'description']
	const opts = { headers }
	const transformOpts = { highWaterMark: 8192 }

	const asyncParser = new AsyncParser(opts, transformOpts)

	const data = await productModels.find()
	asyncParser.processor
		.pipe(res)
		.on('end', () => {
			return res
				.setHeader('Content-disposition', 'attachment; filename=data.csv')
				.set('Content-Type', 'multipart/form-data; charset=utf-8')
				.status(200)
				.send()
		}).on('error', err => {
			return res.status(500).send(err)
		})

	asyncParser.input.push(JSON.stringify(data))
	asyncParser.input.push(null)

}

module.exports = getReport


