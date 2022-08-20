const mongoose = require("mongoose");

const itemSchema = mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	value: {
		type: Number,
		required: true,
	},
	unit: {
		type: String,
		required: true,
	},
});

const listSchema = mongoose.Schema(
	{
		creator: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: "true",
		},
		items: {
			type: [itemSchema],
			required: true,
		},
		assignedTo: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
		},
	},
	{ timestamps: true }
);

module.exports = mongoose.model("List", listSchema);
