const userModels = require('../../models/userModel')
const bcrypt = require('bcryptjs')
async function postUser(req, res) {

	try {
		const { password: plainTextPassword } = req.body
		req.body.password = await bcrypt.hash(plainTextPassword, 10)
		await userModels.User.collection.insertOne(req.body)
		console.log(req.body)
		return res.status(201).send('Registered successfully')
	} catch (err) {
		console.log(err.stack)
		if (err.code === 11000) return res.status(400).send('User with this username/email already exists!')
		return res.status(400).send({ msg: err.message })
	}
}

module.exports = postUser
