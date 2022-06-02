const User = require('../../models/userModel')

async function postUser(req, res) {

	try {
		const data = await User.collection.insertOne(req.body)
		return res.status(201).send(data)
	} catch (err) {
		console.log(err.stack)
		return res.status(400).send({ msg: err.message })
	}
}

module.exports = postUser
