const sendEmail = require('../../src/controllers/product/sendEmail')
const functions = require('../../src/models/productModel')
const { getMockReq, getMockRes } = require('@jest-mock/express')
const nodemailer = require('nodemailer')
const email = { "emails": "sendEmail@gmail.com" }
jest.mock('nodemailer', () => {
	return {
		createTransport: jest.fn().mockReturnThis(),
		sendMail: jest.fn().mockReturnThis()
	}
})

jest.mock('../../src/models/productModel', () => {
	return {
		find: jest.fn().mockReturnThis()
	}
})

describe('sendEmail', () => {
	test('should return 200 with message', async () => {
		functions.find.mockResolvedValueOnce([{ foo: 'bar' }, { foo1: 'bar2' }])
		nodemailer.sendMail.mockResolvedValueOnce({ 'msg': 'se' })
		const req = getMockReq({
			body: email,
		})
		const { res } = getMockRes()

		await sendEmail(req, res)

		console.log(res.status)
		expect(res.status).toHaveBeenCalledWith(200)
		expect(res.send).toHaveBeenCalledWith('Email sent!')
	})

	test('should return 500 with server error', async () => {
		functions.find.mockResolvedValueOnce([{ foo: 'bar' }, { foo1: 'bar2' }])
		nodemailer.sendMail.mockRejectedValueOnce('Error')
		const req = getMockReq({
			body: email,
		})
		const { res } = getMockRes()

		await sendEmail(req, res)

		expect(res.status).toHaveBeenCalledWith(500)
		expect(res.send).toHaveBeenCalledWith('Error')
	})

})
