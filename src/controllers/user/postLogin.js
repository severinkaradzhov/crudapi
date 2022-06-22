const functions = require('../../models/userModel')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')

dotenv.config()

async function postLogin(req, res) {
	const user = await functions.find(req.body.username)
	if (!user) return res.status(404).send('Invalid username/password')
	const isValidPass = await bcrypt.compare(req.body.password, user.password) // mock compare
	if (!isValidPass) return res.status(400).send('Invalid username/password')
	// eslint-disable-next-line no-undef
	const token = jwt.sign({ username: user.username }, process.env.TOKEN_SECRET)
	return res.status(200).send({ msg: 'Logged in', token })
}

module.exports = postLogin