const router = require("express").Router();
const User = require("../models/User");
const authOnlyMiddleware = require("../middlewares/authOnly");
const filterData = require("../utils/filterData");
const config = require("../config");
const List = require("../models/List");

// get all users
router.get("/", authOnlyMiddleware([]), async (req, res) => {
	const lists = await List.find();
	res.json({ lists });
});

// get all lists by creator user
router.get("/creator", authOnlyMiddleware([]), async (req, res) => {
	const lists = await List.find({ creator: req.auth.user });
	res.status(200).json(lists);
});

// get all lists by assigned family
router.get("/assigned/:id", authOnlyMiddleware([]), async (req, res) => {
	const lists = await List.find({ assignedTo: req.params.id });
	if(!lists) return res.status(404).json({msg : "Family Not Found"})
	res.status(200).json(lists);
});

// get list by list id
router.get("/getlist/:id", authOnlyMiddleware([]), async (req, res) => {
	if (!req.params.id)
		return res.status(404).json({ msg: "List ID not found in body" });
	const list = await List.findById(req.params.id).populate('assignedTo');
	if (!list) return res.status(404).json({ msg: "List ID not found" });
	res.status(200).json(list);
});

//add new list
router.post("/createlist/", authOnlyMiddleware([]), async (req, res) => {
	const items = req.body.items;
	const assignedTo = req.body.assignedTo;
	if (!items) return res.status(400).json({ msg: "No Item in Body" });
	let newList = null;
	if (assignedTo) {
		newList = new List({
			creator: req.auth.user,
			items: items,
			assignedTo: assignedTo,
		});
	} else {
		newList = new List({
			creator: req.auth.user,
			items: items,
		});
	}
	try {
		return res.status(200).send(await newList.save());
	} catch (error) {
		return res.status(500).json({ msg: error });
	}
});

module.exports = router;
