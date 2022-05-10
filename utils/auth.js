const jwt = require('jsonwebtoken')
const SECRET_KEY = process.env.SECRET_KEY

const generateAuthToken = async (id) => {
	const token = jwt.sign({ _id: id }, SECRET_KEY);
	return token
}

module.exports = { generateAuthToken }