const postRegisterController = require('../../src/controllers/user/postRegister')
const { getMockReq, getMockRes } = require('@jest-mock/express')
const functionModels = require('../../src/models/userModel')
const user = {
	username: "markzo",
	firstName: "Johzn",
	lastName: "Doze",
	email: "JohnDdzsasdoe@gmail.com",
	password: "qwzerty123"
}

jest.mock('../../src/models/userModel', () => {
	return {
		User: {
			collection: {
				insertOne: jest.fn()
			}
		}
	}
})

describe('postRegisterController', () => {
	// should return promise
	test('should return 201', async () => {
		functionModels.User.collection.insertOne.mockResolvedValue(user)
		const req = getMockReq({
			body: user,
		})
		const { res } = getMockRes()

		await postRegisterController(req, res)

		console.log(res.status)
		expect(res.status).toHaveBeenCalledWith(201)
		expect(res.send).toHaveBeenCalledWith('Registered successfully')
	})

	test('should return 400 with error', async () => {
		functionModels.User.collection.insertOne.mockRejectedValueOnce(new Error('Error message'))
		const req = getMockReq({
			body: user,
		})
		const { res } = getMockRes()

		//when
		await postRegisterController(req, res)
		//then

		expect(res.status).toHaveBeenCalledWith(400)
		expect(res.send).toHaveBeenCalledWith({ msg: 'Error message' })
	})
})
