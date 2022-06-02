const Ajv = require('ajv')
const ajv = new Ajv({ allErrors: true })
const productSchema = require('../schema/productSchema')
const validate = ajv.compile(productSchema)

function validateProducts() {
	return (req, res, next) => {
		const isValid = validate(req.body)
		if (!isValid) {
			const errors = validate.errors
			return res.status(400).json(errors)
		}
		return next()
	}
}

module.exports = validateProducts