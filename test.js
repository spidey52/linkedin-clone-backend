const axios = require('axios')
async function createUser(username, password) {
	for (let i = 3; i < 100; i++) {
		try {
			const { data } = await axios.post('http://localhost:4000/users/register', { username: `username${i}`, password })
			console.log(data)
		} catch (error) {
			console.log(error.message)
		}
	}

}

createUser('suraj', 'suraj52')