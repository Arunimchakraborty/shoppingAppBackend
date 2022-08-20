require("dotenv").config();

module.exports = {
	server: {
		port: process.env.PORT || 5050,
	},
	db: {
		string: process.env.DB_STRING,
		cleanInterval: 1000 * 60 * 5, // 5 min
	},
	mail: {
		credentials: {
			email: process.env.EMAIL_ID,
			password: process.env.PASSWORD,
		},
	},
	auth: {
		requiresEmailVerification: true,
		roles: {
			list: ["user", "admin"],
			default: "user",
		},
		otp: {
			length: 4,
			validFor: 1000 * 60 * 30, // 30 min
		},
		password: {
			length: {
				min: 8,
				max: 128,
			},
			hashingRounds: 10,
		},
		token: {
			validFor: 1000 * 60 * 60 * 24 * 7, // 1 week
			length: 32,
		},
	},
};
