const { Router } = require('express');
const isAuthenticated = require('../middlewares/isAuthenticated');
const User = require('../models/user-model');
const { generateAuthToken } = require('../utils/auth');
const bcrypt = require('bcrypt')

const router = new Router()

// register user
router.post("/register", async (req, res) => {
	try {
		const { username, password } = req.body;
		const isExists = await User.findOne({ username })
		if (isExists) return res.status(400).send(`user already exists with username ${username}`);

		const encryptedPassword = await bcrypt.hash(password, 8);
		const user = await User.create({ username, password: encryptedPassword });
		return res.status(201).send(user)
	} catch (error) {
		return res.status(400).send(error.message);
	}
})

// sign in
router.post('/sign-in', async (req, res) => {
	try {
		const { username, password } = req.body;
		const user = await User.findOne({ $or: [{ username, }, { email: username }] });
		const isValid = await bcrypt.compare(password, user.password)
		if (user && isValid) {
			const token = await generateAuthToken(user._id);
			user.tokens.push(token)
			await user.save()
			user.set('tokens', undefined)
			return res.status(200).send({ user, token });
		} else
			return res.status(400).send('username or password is incorrect');
	} catch (error) {
		return res.status(500).send(error.message);
	}

})

// log out
router.post('/logout', isAuthenticated, async (req, res) => {
	try {
		const tokens = req.user.tokens.filter(user => user.token !== req.token);
		req.user.tokens = tokens
		await req.user.save()
		return res.send('ok')
	} catch (error) {
		return res.status(500).send(error.message)
	}

})

// logout all
router.post('/logout-all', isAuthenticated, async (req, res) => {
	try {
		req.user.tokens = []
		await req.user.save()
		return res.send('ok')
	} catch (error) {
		return res.status(500).send(error.message)
	}
})

// update all field 
router.patch('/:id', isAuthenticated, async (req, res) => {
	try {

		const { username, password, email, mobile } = req.body;
		const userId = req.params.id

		const encryptedPassword = await bcrypt.hash(password, 8)

		const user = await User.findById(userId)
		if (!user) return res.status(404).send('user not found');

		user.username = username || user.username;
		user.password = password ? encryptedPassword : user.password
		user.email = email || user.email
		user.mobile = mobile || user.mobile

		await user.save();

		return res.status(200).send(user)

	} catch (error) {
		return res.status(500).send(error.message)
	}
})


// get all users only for development use
router.get("/all", async (req, res) => {
	const users = await User.find({})
	return res.send(users)
})

module.exports = router



