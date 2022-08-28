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
	const allFamilies = await Family.find({ members: req.auth.user });
	res.status(200).json(allFamilies);
});

// get family by family id
router.get("/getfamily/:id", authOnlyMiddleware([]), async (req, res) => {
	if (!req.params.id)
		return res.status(404).json({ msg: "Family ID not found in body" });
	const family = await Family.findById(req.params.id).populate("members");
	if (!family) return res.status(404).json({ msg: "Family not found" });
	res.status(200).json(family);
});

// get member IDs by family id
router.get("/getmembers/:id", authOnlyMiddleware([]), async (req, res) => {
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
		creator: req.auth.user,
	});
	try {
		return res.status(200).send(await newFamily.save());
	} catch (error) {
		return res.status(500).json({ msg: error });
	}
});

//patch family
router.post("/patchfamily/:id", authOnlyMiddleware([]), async (req, res) => {
	const members = req.body.members;
	if (!members)
		return res.status(400).json({ msg: "Member not found in body" });
	const foundFamily = await Family.findById(req.params.id).populate("creator");
	if (!foundFamily) return res.status(400).json({ msg: "Family not found" });
	if (JSON.stringify(req.auth.user) != JSON.stringify(foundFamily.creator))
		return res
			.status(400)
			.json({ msg: "You must be creator of the family to patch family" });
	foundFamily.members = members;
	try {
		return res.status(200).send(await foundFamily.save());
	} catch (error) {
		return res.status(500).json({ msg: error });
	}
});

//delete family
router.post("/delete/:id", authOnlyMiddleware([]), async (req, res) => {
	const familyFound = Family.findById(req.params.id).populate('creator');
	if (!familyFound) return res.status(400).json({ msg: "Family not found" });
	if (JSON.stringify(familyFound.creator) != JSON.stringify(req.auth.user))
		return res
			.status(400)
			.json({ msg: "You must be creator of the family to delete it" });
	try {
		res.json(await Family.deleteOne({ _id: req.params.id }));
	} catch (error) {
		return res.status(500).json({ msg: error });
	}
});

module.exports = router;
