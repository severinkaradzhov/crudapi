const userSchema = {
	type: 'object',
	properties: {
		username: { type: 'string' },
		firstName: { type: 'string', minLength: 2, maxLength: 50 },
		lastName: { type: 'string', minLength: 2, maxLength: 50 },
		email: { type: 'string', format: 'email' },
		password: { type: 'string', minLength: 2, maxLength: 20 }
	},
	required: ['username', 'firstName', 'email', 'password'],
	additionalProperties: false,
}

module.exports = userSchema