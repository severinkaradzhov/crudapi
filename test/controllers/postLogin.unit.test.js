const postLoginController = require('../../src/controllers/user/postLogin')
const { getMockReq, getMockRes } = require('@jest-mock/express')
const functionModels = require('../../src/models/userModel')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const dotenv = require('dotenv').config()

const token = ''

const user = {
	username: "markoo",
	password: "qwerty1123"
}

jest.mock('jsonwebtoken', () => {
	return {
		sign: jest.fn()
	}
})
jest.mock('../../src/models/userModel', () => {
	return {
		find: jest.fn()
	}
})
jest.mock('bcryptjs', () => {
	return {
		compare: jest.fn()
	}
})
console.log(bcrypt);
describe('postLoginController', () => {
	test('should return 200 with', async () => {
		functionModels.find.mockResolvedValue(user)
		bcrypt.compare.mockResolvedValue(user, dotenv.TOKEN_SECRET)
		const req = getMockReq({
			body: user,
		})
		const { res } = getMockRes()

		await postLoginController(req, res)

		expect(res.status).toHaveBeenCalledWith(200)
		expect(res.send).toHaveBeenCalledWith({ "msg": "Logged in", "token": undefined })
	})

	test('should return 404 with error', async () => {
		functionModels.find.mockResolvedValue('')
		const req = getMockReq({
			body: user,
		})
		const { res } = getMockRes()

		await postLoginController(req, res)

		expect(res.status).toHaveBeenCalledWith(400)
		expect(res.send).toHaveBeenCalledWith("Invalid username/password")
	})
})