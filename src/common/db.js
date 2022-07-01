const mongoose = require('mongoose')
const dotenv = require('dotenv')

dotenv.config()

const dbURI = process.env.MONGO_URL
module.exports = mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
	console.log('Connected to database!')
}).catch((err) => console.log(err))
