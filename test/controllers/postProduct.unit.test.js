const postProdController = require('../../src/controllers/product/postProduct')
const { getMockReq, getMockRes } = require('@jest-mock/express')
const functionModels = require('../../src/models/productModel')
const product = {
	name: 'Ipahasoneasd 6',
	price: 'asd',
	description: 'appalee phone ',
	sku: 'A1123aa5',
	inStock: 6
}

jest.mock('../../src/models/productModel', () => {
	return {
		insert: jest.fn()
	}
})

describe('postProdController', () => {
	test('should return 201 with data', async () => {
		functionModels.insert.mockResolvedValue(product)
		const req = getMockReq({
			body: product,
		})
		const { res } = getMockRes()

		await postProdController(req, res)

		expect(res.status).toHaveBeenCalledWith(201)
		expect(res.send).toHaveBeenCalledWith(product)
	})

	test('should return 400 with error', async () => {
		functionModels.insert.mockRejectedValueOnce(new Error('Error message'))
		const req = getMockReq({
			body: 'product',
		})
		const { res } = getMockRes()

		await postProdController(req, res)

		expect(res.status).toHaveBeenCalledWith(400)
		expect(res.send).toHaveBeenCalledWith('Error message')
	})
})
