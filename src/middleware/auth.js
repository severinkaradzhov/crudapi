//check req.header.Authorization in db 
const jwt = require('jsonwebtoken')

module.exports = function (req, res, next) {
	const token = req.header('Authorization')
	if (!token) return res.status(401).send('Access Denied')

	try {
		// eslint-disable-next-line no-undef
		const verified = jwt.verify(token, process.env.TOKEN_SECRET)
		req.user = verified
		next()
	} catch (err) {
		return res.status(400).send('Invalid Token')
	}
}

