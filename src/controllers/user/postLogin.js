const userModels = require('../../models/userModel')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
const logger = require('../../common/logger')

dotenv.config()

async function postLogin(req, res) {
	logger.info(`req <= /POST /users/login`)
	const user = await userModels.find(req.body.username)
	if (!user) {
		logger.info(`res => [400] /POST /users/login`)
		return res.status(400).send('Invalid username/password') //should be 400 with 'Invalid username/password' rigth ?
	}
	const isValidPass = await bcrypt.compare(req.body.password, user.password)
	if (!isValidPass) {
		logger.info(`res => [400] /POST /users/login`)
		return res.status(400).send('Invalid username/password')
	}
	// eslint-disable-next-line no-undef
	const token = jwt.sign({ username: user.username }, process.env.TOKEN_SECRET)
	logger.info(`res => [200] /POST /users/login`)
	return res.status(200).send({ msg: 'Logged in', token })
}

module.exports = postLogin