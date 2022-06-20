const deleteProductController = require('../../src/controllers/product/deleteProducts')
const { getMockReq, getMockRes } = require('@jest-mock/express')
const functions = require('../../src/models/productModel')
const tempModels = require('../../src/models/temporaryModel')
const product = {
	name: 'Ipahasoneasd 6',
	price: 'asd',
	description: 'appalee phone ',
	sku: 'A1123aa5',
	inStock: 6,
	id: "RLB2U"
}


jest.mock('../../src/models/productModel', () => {
	return {
		remove: jest.fn()
	}
})
jest.mock('../../src/models/temporaryModel', () => {
	return {
		addToTemp: jest.fn()
	}
})

describe('getProductController', () => {
	test('should return 204', async () => {
		functions.remove.mockResolvedValue(product.id)
		tempModels.addToTemp.mockResolvedValue(product)
		const req = getMockReq({
			body: product.id,
		})
		const { res } = getMockRes()

		await deleteProductController(req, res)

		expect(res.status).toHaveBeenCalledWith(204)
	})

	test('should return 500 with error message', async () => {
		functions.remove.mockRejectedValueOnce('Server side error')
		const req = getMockReq({
			body: product.id,
		})
		const { res } = getMockRes()

		await deleteProductController(req, res)

		expect(res.status).toHaveBeenCalledWith(500)
		expect(res.send).toHaveBeenCalledWith('Server side error')
	})
})