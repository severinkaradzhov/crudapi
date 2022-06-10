const User = require('../../models/userModel')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')

dotenv.config()

async function postLogin(req, res) {
	const user = await User.findOne({ 'username': req.body.username }, { _id: 0 })
	if (!user) return res.status(400).send('User does not exist')
	const isValidPass = await bcrypt.compare(req.body.password, user.password)
	if (!isValidPass) return res.status(400).send('Invalid password')
	const token = jwt.sign({ username: user.username }, process.env.TOKEN_SECRET)
	res.header('Authorization', token).status(200).send(token)
}

module.exports = postLogin

