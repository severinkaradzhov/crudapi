const mongoose = require('mongoose')
const Schema = mongoose.Schema

const productSchema = new Schema({
	name: {
		type: String,
		required: true,
	},
	price: {
		type: Number,
		required: true,
		min: [0, 'cannot have price less than 0']
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
	return Product.findOneAndRemove({ 'sku': id })
	//return Product.deleteMany({})
}
function insert(product) {
	return Product.collection.insertOne(product)
}
function find(queries) {
	return Product.find(queries, { _id: 0 })
}
function findById(id) {
	return Product.findOne({ 'sku': id }, { _id: 0 })
}
function update(id, product) {
	const options = {
		runValidators: true,
		new: true,
		upsert: false
	}
	return Product.findOneAndUpdate({ 'sku': id }, product, options)
}


module.exports = {
	remove, insert, find, findById
	, update
}
