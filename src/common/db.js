const mongoose = require('mongoose')
const dbURI = 'mongodb+srv://user123:user123@cluster0.n9esa.mongodb.net/crudapi?retryWrites=true&w=majority'
module.exports = mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
	console.log('Connected to database!')
}).catch((err) => console.log(err))
