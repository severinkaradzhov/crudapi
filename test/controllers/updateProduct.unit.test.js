const updateProductController = require('../../src/controllers/product/putProducts')
const { getMockReq, getMockRes } = require('@jest-mock/express')
const functions = require('../../src/models/productModel')

const product = {
	price: 16,
	name: 'updated',
	sku: "RLB2U"
}

jest.mock('../../src/models/productModel', () => {
	return {
		update: jest.fn(),
	}
})

describe('updateProductController', () => {
	test('should return 200', async () => {
		functions.update.mockResolvedValueOnce(product.sku, product)
		const req = getMockReq({
			body: product
		})
		const { res } = getMockRes()

		await updateProductController(req, res)

		console.log(res.status)
		expect(res.status).toHaveBeenCalledWith(200)
		expect(res.send).toHaveBeenCalledWith(product.sku)
	})
	test('should return 404 with error message', async () => {
		functions.update.mockResolvedValueOnce('', product)
		const req = getMockReq({
			body: product
		})
		const { res } = getMockRes()

		await updateProductController(req, res)

		expect(res.status).toHaveBeenCalledWith(404)
		expect(res.send).toHaveBeenCalledWith('Not found')
	})
	test('should return 500 with error message', async () => {
		functions.update.mockRejectedValueOnce('Server side error')
		const req = getMockReq()
		const { res } = getMockRes()

		await updateProductController(req, res)

		expect(res.status).toHaveBeenCalledWith(500)
		expect(res.send).toHaveBeenCalledWith('Server side error')
	})
})

