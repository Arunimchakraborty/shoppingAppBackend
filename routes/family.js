const router = require("express").Router();
const User = require("../models/User");
const authOnlyMiddleware = require("../middlewares/authOnly");
const filterData = require("../utils/filterData");
const config = require("../config");
const List = require("../models/List");
const Family = require("../models/Family");

// get all families
router.get("/", authOnlyMiddleware([]), async (req, res) => {
	const families = await Family.find();
	res.json({ families });
});

// get family by user
router.get("/user", authOnlyMiddleware([]), async (req, res) => {
	const allFamilies = await Family.find({members : req.auth.user});
	res.status(200).json(allFamilies);
});

// get family by family id
router.get("/getfamily/:id", authOnlyMiddleware([]), async (req, res) => {
	if (!req.params.id)
		return res.status(404).json({ msg: "Family ID not found in body" });
	const family = await Family.findById(req.params.id);
	if (!family) return res.status(404).json({ msg: "Family not found" });
	res.status(200).json(family);
});

//create new Family
router.post("/createFamily/", authOnlyMiddleware([]), async (req, res) => {
	const name = req.body.name;
	const members = req.body.members;
	if (!name && !members)
		return res.status(400).json({ msg: "Name or members not found in body" });
	const newFamily = new Family({
		name: name,
		members: [req.auth.user, ...members],
	});
	try {
		return res.status(200).send(await newFamily.save());
	} catch (error) {
		return res.status(500).json({ msg: error });
	}
});

//add member to family
router.post("/addmember/:id", authOnlyMiddleware([]), async (req, res) => {
	const member = req.body.member;
	if (!member) return res.status(400).json({ msg: "Member not found in body" });
	const foundFamily = await Family.findById(req.params.id);
	if (!foundFamily) return res.status(400).json({ msg: "Family not found" });
	foundFamily.members.push(member);
	try {
		return res.status(200).send(await foundFamily.save());
	} catch (error) {
		return res.status(500).json({ msg: error });
	}
});

module.exports = router;
