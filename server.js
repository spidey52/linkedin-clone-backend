require('dotenv').config()
const express = require("express");
const mongoose = require("mongoose")
const cors = require('cors')

const app = express();

app.use(express.json({}));
app.use(cors({}))

const PORT = process.env.PORT || 4000;
const mongoUri = process.env.MONGODB_URI;

mongoose.connect(mongoUri,)

const db = mongoose.connection
db.on('error', () => { console.log('connection error:') })
db.on('error', (err) => {
	console.log(err.message)
})
db.once('open', function () {
	console.log('database connected')
})


const userRoute = require('./routes/user-route')
app.use('/users', userRoute)
app.get('/', (req, res) => {
	return res.send('data');
})


app.listen(PORT, () => {
	console.log('server listening on port', PORT)
})