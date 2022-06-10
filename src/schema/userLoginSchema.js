const userLoginSchema = {
	type: 'object',
	properties: {
		username: { type: 'string' },
		password: { type: 'string', minLength: 2, maxLength: 1000 }
	},
	required: ['username', 'password'],
	additionalProperties: false,
}

module.exports = userLoginSchema