const Ajv = require('ajv')
const ajv = new Ajv({ allErrors: true })
const addFormats = require('ajv-formats')
addFormats(ajv)
const userSchema = require('../schema/userSchema')
const validate = ajv.compile(userSchema)

function validateUsers() {
	return (req, res, next) => {
		const isValid = validate(req.body)
		if (!isValid) {
			const errors = validate.errors
			console.log(errors)
			return res.status(400).send(errors)
		}
		return next()
	}
}

module.exports = validateUsers