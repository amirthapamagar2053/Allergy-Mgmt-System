const express = require("express");
const fileUpload = require("express-fileupload");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
const signUpRouter = require("./controllers/signUpRouter");
const loginRouter = require("./controllers/loginRouter");
const allergyRouter = require("./controllers/allergyRouter");
const { tokenExtractor, userExtractor } = require("./utils/middleware");
const config = require("./utils/config");
const app = express();

app.use(cors());
app.use(express.json());
app.use(fileUpload({ useTempFiles: true }));

app.use(tokenExtractor);
app.use(userExtractor);

const mongoUrl = config.MONGODB_URI;
mongoose.connect(mongoUrl);
app.use("/api/Signup", signUpRouter);
app.use("/api/Signin", loginRouter);
app.use("/api/Allergies", allergyRouter);

app.use(express.static("dist"));
app.use("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../dist/index.html"));
});
module.exports = app;
