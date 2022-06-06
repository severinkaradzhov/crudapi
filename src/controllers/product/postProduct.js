const functions = require('../../models/productModel')

async function postProduct(req, res) {

	try {
		const data = await functions.insert(req.body)
		return res.status(201).send(data)
	} catch (err) {
		console.log(err.stack)
		return res.status(400).send({ msg: err.message })
	}
}

module.exports = postProduct
