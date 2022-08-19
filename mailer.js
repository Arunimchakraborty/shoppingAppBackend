var nodemailer = require("nodemailer");
require("dotenv").config();

function mailer(emailID, body, subject) {
	var transporter = nodemailer.createTransport({
		service: "gmail",
		auth: {
			user: process.env.EMAIL_ID,
			pass: process.env.PASSWORD,
		},
	});

	var mailOptions = {
		from: "arunim@gmail.com",
		to: emailID,
		subject: subject,
		html: body,
	};

	transporter.sendMail(mailOptions, function (error, info) {
		if (error) {
			console.log(error);
		} else {
			console.log("Email sent: " + info.response);
		}
	});
}

module.exports = mailer;
