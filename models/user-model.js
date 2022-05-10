const mongoose = require('mongoose');


const UserSchema = mongoose.Schema({
	username: {
		type: String,
		required: true,
		unique: true
	},
	email: {
		type: String,
	},

	mobile: {
		type: String,
	},

	password: {
		type: String,
		required: true
	},

	tokens: [{
		type: String
	}]


}, {
	timestamps: true
})

const User = mongoose.model('User', UserSchema);

module.exports = User
