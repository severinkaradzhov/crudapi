const getProductController = require('../../src/controllers/product/getProductById')
const { getMockReq, getMockRes } = require('@jest-mock/express')
const functions = require('../../src/models/productModel')

const id = {
	sku: "RLB2U"
}

jest.mock('../../src/models/productModel', () => {
	return {
		findById: jest.fn()
	}
})

describe('getProductController', () => {
	test('should return 200', async () => {
		functions.findById.mockResolvedValueOnce(id)
		const req = getMockReq()
		const { res } = getMockRes()

		await getProductController(req, res)

		console.log(res.status)
		expect(res.status).toHaveBeenCalledWith(200)
		expect(res.send).toHaveBeenCalledWith({ "sku": "RLB2U" })
	})
	test('should return 404 with non existing product', async () => {
		functions.findById.mockResolvedValueOnce('')
		const req = getMockReq()
		const { res } = getMockRes()

		await getProductController(req, res)

		expect(res.status).toHaveBeenCalledWith(404)
		expect(res.send).toHaveBeenCalledWith({ msg: "Product was not found" })
	})
	test('should return 500 with error message', async () => {
		functions.findById.mockRejectedValueOnce('SS error');
		const req = getMockReq()
		const { res } = getMockRes()

		await getProductController(req, res)

		expect(res.status).toHaveBeenCalledWith(500)
		expect(res.send).toHaveBeenCalledWith('SS error')
	})
})

