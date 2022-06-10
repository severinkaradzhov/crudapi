const User = require('../../models/userModel')
const bcrypt = require('bcryptjs')
async function postUser(req, res) {

	try {
		const { password: plainTextPassword } = req.body
		req.body.password = await bcrypt.hash(plainTextPassword, 10)
		const data = await User.collection.insertOne(req.body)
		console.log(req.body)
		return res.status(201).send(data)
	} catch (err) {
		console.log(err.stack)
		return res.status(400).send({ msg: err.message })
	}
}

module.exports = postUser
