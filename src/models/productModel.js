const mongoose = require('mongoose')
const Schema = mongoose.Schema

const productSchema = new Schema({
	name: {
		type: String,
		required: true,
	},
	price: {
		type: Number,
		required: true
	},
	description: {
		type: String,
		required: false
	},
	sku: {
		type: String,
		required: true,
		unique: true
	},
	inStock: {
		type: Number,
		required: true,
	},
	brand: {
		type: String,
		required: false
	}
})

const Product = mongoose.model('Products', productSchema)

function remove(id) {
	return Product.findByIdAndDelete(id)
}
function insert(product) {
	return Product.collection.insertOne(product)
}
function find() {
	return Product.find()
}
function findById(id) {
	return Product.findById(id)
}


module.exports = { remove, insert, find, findById }
