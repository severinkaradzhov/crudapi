const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
	username: {
		type: String,
		required: true,
		unique: true,
	},
	firstName: {
		type: String,
		required: true
	},
	lastName: {
		type: String,
		required: false
	},
	email: {
		type: String,
		required: true,
		unique: true,
	},
	password: {
		type: String,
		required: true
	}
})

const User = mongoose.model('Users', userSchema)
function find(username) {
	return User.findOne({ 'username': username }, { _id: 0 })
}
module.exports = { User, find }