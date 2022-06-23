const getReport = require('../../src/controllers/product/getReport')
const functions = require('../../src/models/productModel')
const { getMockReq, getMockRes } = require('@jest-mock/express')
const { parse } = require('json2csv');

jest.mock('json2csv', () => {
	return {
		parse: jest.fn()
	}
})

jest.mock('../../src/models/productModel', () => {
	return {
		find: jest.fn().mockReturnThis()
	}
})

describe('getReport', () => {
	test('should return 200 with message', async () => {
		functions.find.mockResolvedValueOnce([{ foo: 'bar' }, { foo1: 'bar2' }])
		parse.mockResolvedValueOnce()
		const req = getMockReq()
		const { res } = getMockRes()

		await getReport(req, res)

		expect(res.status).toHaveBeenCalledWith(200)
		expect(res.send).toHaveReturned()
	})

	test('should return 500 with message', async () => {
		functions.find.mockRejectedValueOnce('Error')
		const req = getMockReq()
		const { res } = getMockRes()

		await getReport(req, res)

		expect(res.status).toHaveBeenCalledWith(500)
		expect(res.send).toHaveBeenCalledWith('Error')
	})

})
