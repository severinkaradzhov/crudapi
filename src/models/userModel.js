const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
	username: {
		type: String,
		required: true
	},
	firstName: {
		type: String,
		required: true
	},
	lastName: {
		type: String,
		required: false
	}
})

userSchema.index({ email: -1 }, { unique: true })
const User = mongoose.model('User', userSchema)
module.exports = User