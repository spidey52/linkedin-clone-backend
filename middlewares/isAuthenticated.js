const jwt = require('jsonwebtoken');
const User = require('../models/user-model');
const SECRET_KEY = process.env.SECRET_KEY

const isAuthenticated = async (req, res, next) => {
	try {
		const { authorization } = req.headers;
		if (!authorization) return res.status(400).send("authorization token not found");
		const decoded = jwt.verify(authorization, SECRET_KEY);
		const user = await User.findOne({ _id: decoded._id, });

		if (!user) return res.status(400).send("invalid token")
		if (!user.tokens.includes(authorization)) return res.status(400).send('token expired')

		req.token = authorization
		req.user = user
		next()

	} catch (error) {
		return res.status(500).send(error.message);
	}

}

module.exports = isAuthenticated