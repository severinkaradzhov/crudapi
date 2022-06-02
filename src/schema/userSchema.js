const userSchema = {
	type: 'object',
	properties: {
		username: { type: 'string' }, // mandatory
		firstName: { type: 'string', minLength: 2, maxLength: 50 }, // mandatory
		lastName: { type: 'string', minLength: 2, maxLength: 50 },
		email: { type: 'string', format: 'email' },// mandatory
		password: { type: 'string', minLength: 2, maxLength: 20 }// mandatory
	},
	required: ['username', 'firstName', 'email', 'password'],
	additionalProperties: false,
}

module.exports = userSchema