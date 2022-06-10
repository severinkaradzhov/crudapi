const Ajv = require('ajv')
const ajv = new Ajv({ allErrors: true })
const userSchema = require('../schema/userLoginSchema')
const validate = ajv.compile(userSchema)

function validateUserLogin() {
	return (req, res, next) => {
		const isValid = validate(req.body)
		if (!isValid) {
			const errors = validate.errors
			return res.status(400).json(errors)
		}
		return next()
	}
}

module.exports = validateUserLogin