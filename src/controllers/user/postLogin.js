const functions = require('../../models/userModel')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')

dotenv.config()

async function postLogin(req, res) {
	const user = await functions.find(req.body.username)
	if (!user) return res.status(404).send('User does not exist') //404 or 400
	const isValidPass = await bcrypt.compare(req.body.password, user.password)
	if (!isValidPass) return res.status(400).send('Invalid password')
	// eslint-disable-next-line no-undef
	const token = jwt.sign({ username: user.username }, process.env.TOKEN_SECRET)
	return res.status(200).send({ msg: 'Logged in', token })
}

module.exports = postLogin

