const router = require("express").Router();
const User = require("../models/User");
const authOnlyMiddleware = require("../middlewares/authOnly");
const filterData = require("../utils/filterData");
const config = require("../config");

// get self
router.get("/", async (req, res) => {
	res.status(200).send("Health is okay");
});

module.exports = router;
