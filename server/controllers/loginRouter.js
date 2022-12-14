const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const loginRouter = require("express").Router();
const config = require("../utils/config");

loginRouter.post("/", async (req, res) => {
  const { email, password } = req.body;

  const existingUser = await User.findOne({ email });

  const passwordCorrect =
    existingUser === null
      ? false
      : await bcrypt.compare(password, existingUser.password);

  if (!(existingUser && passwordCorrect)) {
    return res.status(401).json({
      error: "invalid username or password",
    });
  }

  const userForToken = {
    email: existingUser.email,
  };

  const token = jwt.sign(userForToken, config.SECRET);

  res.status(200).send({ token, email: existingUser.email });
});

module.exports = loginRouter;
