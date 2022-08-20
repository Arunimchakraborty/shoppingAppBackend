const mongoose = require("mongoose");

const familySchema = mongoose.Schema(
	{
		members: {
			type: [mongoose.Schema.Types.ObjectId],
			ref: "User",
		},
	},
	{ timestamps: true }
);

module.exports = mongoose.model("List", familySchema);
