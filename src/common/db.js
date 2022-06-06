const express = require('express')
const app = express()
const port = 3000
const mongoose = require('mongoose')
const dbURI = 'mongodb+srv://user123:user123@cluster0.n9esa.mongodb.net/crudapi?retryWrites=true&w=majority'
module.exports = mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true }).then(() =>
	app.listen(port, () => {
		console.log(`Example app listening on port ${port}`)
	})
)
	.catch((err) => console.log(err))
