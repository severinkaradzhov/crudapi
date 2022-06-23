const mongoose = require('mongoose')
const Schema = mongoose.Schema
const dotenv = require('dotenv')

dotenv.config()

const temporarySchema = new Schema({
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
	},
	date: {
		type: Date,
		required: true
	}
})

const Temporary = mongoose.model('Temporary', temporarySchema)

function addToTemp(product) {
	Temporary.collection.createIndex({
		date: 1,
	}, {
		expireAfterSeconds: process.env.EXPIRE_AFTER,
	})
	const temp = {
		_id: product._id,
		name: product.name,
		price: product.price,
		sku: product.sku,
		description: product.description,
		inStock: product.inStock,
		date: new Date(Date.now() - process.env.EXPIRE_AFTER * 1000)
	}
	if (product.brand) temp.brand = product.brand
	console.log(temp)
	return Temporary.collection.insertOne(temp)
}

module.exports = { addToTemp }