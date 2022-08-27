const mongoose = require("mongoose");

const familySchema = mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
		},
		members: {
			type: [mongoose.Schema.Types.ObjectId],
			ref: "User",
			required: true,
		},
		creator: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: true,
		}
	},
	{ timestamps: true }
);

module.exports = mongoose.model("Family", familySchema);
