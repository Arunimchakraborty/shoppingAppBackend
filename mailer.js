var nodemailer = require("nodemailer");
require("dotenv").config();

var transporter = nodemailer.createTransport({
	service: "gmail",
	auth: {
		user: process.env.EMAIL_ID,
		pass: process.env.PASSWORD,
	},
});

var mailOptions = {
	from: "arunim@gmail.com",
	to: "debikachakra@gmail.com",
	subject: "Node JS testing 1",
	text: "Hee hee",
};

transporter.sendMail(mailOptions, function (error, info) {
	if (error) {
		console.log(error);
	} else {
		console.log("Email sent: " + info.response);
	}
});
