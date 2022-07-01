const getReport = require('../../src/controllers/product/getReport')
const functions = require('../../src/models/productModel')
const { getMockReq, getMockRes } = require('@jest-mock/express')
const { AsyncParser } = require('json2csv');

jest.mock('../../src/models/productModel', () => {
	return {
		find: jest.fn()
	}
})

jest.mock('json2csv', () => {
	return {
		AsyncParser: jest.fn()
	}
})


describe('getReport', () => {
	test.only('should return 200', async () => {
		functions.find.mockResolvedValueOnce([{ foo: 'bar' }, { foo1: 'bar2' }])
		AsyncParser.mockResolvedValueOnce('foo')
		const req = getMockReq()
		const { res } = getMockRes()

		await getReport(req, res)

		expect(res.status).toHaveBeenCalledWith(200)
		expect(res.send).toHaveBeenCalledWith('foo')
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
