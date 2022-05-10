const nodemailer = require("nodemailer");

let transporter = nodemailer.createTransport({
	service: "gmail",
	host: "smtp.gmail.com",
	port: 25,
	secure: true, // true for 465, false for other ports
	auth: {
		user: process.env.MAIL_USER,
		pass: process.env.MAIL_PASSWORD
	},
});

const sendMail = async (to, subject = "reset password for passmanager", text = "", html = "") => {
	try {
		let info = await transporter.sendMail({
			from: 'satyamkumar5254@gmail.com', // sender address
			to,
			subject,
			text,
			html
		});

		console.log('hello')

		return info
	} catch (error) {
		console.log(error.message)
		return error.message
	}


}

module.exports = sendMai