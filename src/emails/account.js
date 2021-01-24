const sgMail = require('@sendgrid/mail')
const fromEmail = 'idonatos13@gmail.com'
sgMail.setApiKey(process.env.SENDGRID_API_KEY)


const sendWelcomeEmail = (email, name) => {
	sgMail.send({
		from: fromEmail,
		to: email,
		subject: 'Welcome to Task Manager!',
		text: `Hello ${name},\nThank you for joining in!`
	})
}

const sendCancelEmail = (email, name) => {
	sgMail.send({
		from: fromEmail,
		to: email,
		subject: 'Account deletion notification',
		text: `Hello ${name},\nSorry to hear that you're leaving!`
	})
}

module.exports = {
	sendWelcomeEmail,
	sendCancelEmail
}