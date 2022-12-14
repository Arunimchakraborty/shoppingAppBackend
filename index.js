const express = require("express");
const config = require("./config");
const mongoose = require("mongoose");
const authMiddleware = require("./middlewares/auth");
const tokenMiddleware = require("./middlewares/token");
const cleanDB = require("./utils/cleanDB");
const cors = require("cors");

const app = express();

// middlewares
app.use(express.json());
app.use(cors({ exposedHeaders: "token" }));

// custom middlewares
app.use(authMiddleware);
app.use(tokenMiddleware);

// connect to db
mongoose.connect(config.db.string, (err) => {
	if (err) console.error(err);
	else console.log("connected to db");
});

// routes
app.use("/auth/", require("./routes/auth"));
app.use("/user/", require("./routes/user"));
app.use("/list/", require("./routes/list"));
app.use("/family/", require("./routes/family"));
app.use("/", require('./routes/test'))

app.listen(config.server.port, "0.0.0.0", () => {
	console.log(`server live on port ${config.server.port}`);
});

// clean DB
setTimeout(cleanDB, config.db.cleanInterval);
