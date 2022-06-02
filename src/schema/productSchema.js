const productSchema = {
	type: 'object',
	properties: {
		name: { type: 'string', minLength: 2, maxLength: 50 },
		price: { type: 'number' },
		description: { type: 'string', minLength: 2, maxLength: 50 },
		sku: { type: 'string' },
		inStock: { type: 'number' },
		brand: { type: 'string', minLength: 2, maxLength: 20 }
	},
	required: ['name', 'price', 'sku', 'inStock'],
	additionalProperties: false,
}

module.exports = productSchema