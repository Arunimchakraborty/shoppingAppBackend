var nodemailer = require("nodemailer");

var transporter = nodemailer.createTransport({
	service: "gmail",
	auth: {
		user: "arunimchakraborty@gmail.com",
		pass: "tpverjqmevbyjmjd",
	},
});

var mailOptions = {
	from: "arunim@gmail.com",
	to: "debikachakra@gmail.com",
	subject: "Sending Email using Node.js",
	text: "That was easy!",
};

transporter.sendMail(mailOptions, function (error, info) {
	if (error) {
		console.log(error);
	} else {
		console.log("Email sent: " + info.response);
	}
});
