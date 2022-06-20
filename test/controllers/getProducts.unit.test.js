const getProductsController = require('../../src/controllers/product/getProducts')
const { getMockReq, getMockRes } = require('@jest-mock/express')
const functions = require('../../src/models/productModel')

const filter = {}
filter.brand = 'Sku'

jest.mock('../../src/models/productModel', () => {
	return {
		find: jest.fn().mockReturnThis(),
		skip: jest.fn().mockReturnThis(),
		limit: jest.fn().mockReturnThis()
	}
})


describe('getProductController', () => {
	test('should return 200', async () => {
		functions.limit.mockResolvedValueOnce({ foo: 'bar' })

		const req = getMockReq()
		const { res } = getMockRes()

		await getProductsController(req, res)

		expect(res.status).toHaveBeenCalledWith(200)
		expect(res.send).toHaveBeenCalledWith({ foo: 'bar' })
	})
	test('should return 404 with no results', async () => {
		functions.limit.mockResolvedValueOnce('')
		const req = getMockReq()
		const { res } = getMockRes()

		await getProductsController(req, res)

		console.log(res.status)
		expect(res.status).toHaveBeenCalledWith(404)
		expect(res.send).toHaveBeenCalledWith('No products matched your criteria')
	})

	test('should return 200 with going through if statements', async () => {
		//given
		functions.limit.mockResolvedValueOnce({ foo: 'bar' })
		const req = getMockReq({ query: { inStock: 'true', price: 'gt(25)', brand: 'Nestle', search: 'foo' } })
		const { res } = getMockRes()
		//when
		await getProductsController(req, res)
		//then
		expect(res.status).toHaveBeenCalledWith(200)
		expect(res.send).toHaveBeenCalledWith({ foo: 'bar' })
	})

	test('should return 200 with going through else statements', async () => {
		//given
		functions.limit.mockResolvedValueOnce({ foo: 'bar' })
		const req = getMockReq({ query: { inStock: 12, price: 'gt(25)', brand: 'Nestle', search: 123 } }) // does not add to filter - invalid data
		const { res } = getMockRes()
		//when
		await getProductsController(req, res)
		//then
		expect(res.status).toHaveBeenCalledWith(200)
		expect(res.send).toHaveBeenCalledWith({ foo: 'bar' })
	})
	test('should return 500', async () => {
		functions.limit.mockRejectedValue(new Error('server side'))
		const req = getMockReq()
		const { res } = getMockRes()

		await getProductsController(req, res)

		expect(res.status).toHaveBeenCalledWith(500)
		expect(res.send).toHaveBeenCalledWith('server side')
	})
})