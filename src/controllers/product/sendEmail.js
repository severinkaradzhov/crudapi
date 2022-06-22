const nodemailer = require('nodemailer')
const functions = require('../../models/productModel')
const dotenv = require('dotenv')

dotenv.config()

async function sendEmail(req, res) {
	const { emails } = req.body
	console.log(emails);

	const products = await functions.find().then(result => {
		return result
	})

	let transporter = nodemailer.createTransport({
		service: "gmail",
		auth: {
			user: process.env.GMAIL_N,
			pass: process.env.GMAIL_P,
		},
	});

	const msg = {
		from: '"Sent from the Express app" severin.karadzhov@strypes.eu', // sender address
		to: `${emails}`, // list of receivers
		subject: "Product data", // Subject line
		text: "All the products", // plain text body
		html: `<style>
		table, th, td {
			border:1px solid black;
		}
		</style><table><tr><td>NAME</td><td>PRICE<td>SKU</td><td>STOCK</td><td>BRAND</td><td>DESCRIPTION</td></td></tr>`
	} // html body

	for (const product of products) {
		msg.html += `<tr><td>${product.name}</td><td style="width:70px">${product.price}<td style="width:70px">${product.sku}</td><td style="width:70px">${product.inStock}</td><td style="width:70px">${product.brand}</td><td>${product.description}</td></td></tr>`
	}
	msg.html += '</table>'

	await transporter.sendMail(msg).then(() => {
		return res.status(200).send('Email sent!')
	}).catch((err) => {
		return res.status(500).send(err)
	})

}

module.exports = sendEmail