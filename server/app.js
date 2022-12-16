const express = require("express");
const cors = require("cors");
const path = require("path");
const signUpRouter = require("./controllers/signUpRouter");
const loginRouter = require("./controllers/loginRouter");
const allergyRouter = require("./controllers/allergyRouter");
const { tokenExtractor, userExtractor } = require("./utils/middleware");

const app = express();

app.use(cors());
app.use(express.json());
app.use(tokenExtractor);
app.use(userExtractor);
app.use("/api/Signup", signUpRouter);
app.use("/api/Signin", loginRouter);
app.use("/api/Allergies", allergyRouter);

app.use(express.static("dist"));
app.use("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../dist/index.html"));
});
module.exports = app;
