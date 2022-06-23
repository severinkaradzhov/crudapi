const functions = require('../../models/productModel')
const { parse } = require('json2csv');

function getReport(req, res) {

	const fields = ['name', 'price', 'brand', 'sku', 'inStock', 'description'];
	const opts = { fields };
	return functions.find().then(result => {
		const csv = parse(result, opts)
		return res.status(200).send(csv)
	}).catch(err => {
		return res.status(500).send(err)
	})

}

module.exports = getReport