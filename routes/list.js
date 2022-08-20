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

module.exports = router;
