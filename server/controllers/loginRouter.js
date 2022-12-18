const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const loginRouter = require("express").Router();
const config = require("../utils/config");

loginRouter.post("/", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: "Email or password is missing" });
  }

  const existingUser = await User.findOne({ email });
  if (!existingUser) {
    return res.status(400).json({ error: "Email doesnot exists" });
  }

  const passwordCorrect =
    existingUser === null
      ? false
      : await bcrypt.compare(password, existingUser.password);

  if (!(existingUser && passwordCorrect)) {
    return res.status(400).json({
      error: "invalid password",
    });
  }

  const userForToken = {
    email: existingUser.email,
    id: existingUser.id,
  };

  const token = jwt.sign(userForToken, config.SECRET);

  res
    .status(200)
    .send({ token, email: existingUser.email, id: existingUser.id });
});

module.exports = loginRouter;
