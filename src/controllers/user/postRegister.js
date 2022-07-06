const userModels = require('../../models/userModel')
const bcrypt = require('bcryptjs')
const logger = require('../../common/logger')

async function postUser(req, res) {

	logger.info(`req <= /POST /users/register`)

	try {
		const { password: plainTextPassword } = req.body
		req.body.password = await bcrypt.hash(plainTextPassword, 10)
		await userModels.User.collection.insertOne(req.body)
		logger.info(`res => [201] /POST /users/register`)
		return res.status(201).send('Registered successfully')
	} catch (err) {
		logger.info(`res => [400] /POST /users/register - ${err.stack}`)
		if (err.code === 11000) return res.status(400).send('User with this username/email already exists!')
		return res.status(400).send({ msg: err.message })
	}
}

module.exports = postUser
