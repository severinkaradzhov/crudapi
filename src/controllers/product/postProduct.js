const productModels = require('../../models/productModel')

async function postProduct(req, res) {

	try {
		const data = await productModels.insert(req.body)
		return res.status(201).send(data)
	} catch (err) {
		if (err.code === 11000) return res.status(400).send({ msg: 'Cannot have multiple products with the same sku' })
		return res.status(400).send(err.message)
	}
}

module.exports = postProduct
