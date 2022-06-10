const functions = require('../../models/productModel')


function getProducts(req, res) {
	console.log(req.query)
	const { brand, inStock, price, search, page = 0, page_size = 4 } = req.query
	const filter = {}
	if (brand) filter.brand = brand
	if (price) {
		const [type, toSplit] = price.split('(')
		const [num] = toSplit.split(')')
		const operator = '$' + type
		filter.price = { [operator]: num }
	}

	if (inStock) {
		if (inStock === 'true') filter.inStock = { '$gte': 1 }
		if (inStock === 'false') filter.inStock = { '$eq': 0 }
	}
	if (search) {

		filter.$text = {
			$search: /omemade/i
		}
	}
	console.log(filter)
	functions.find(filter).skip(page * page_size).limit(page_size).then(result => {
		res.status(201).send(result)
	}).catch(err => {
		res.status(500).send(err.message)
	})
}

module.exports = getProducts