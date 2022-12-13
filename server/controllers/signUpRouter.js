const signUpRouter = require("express").Router();
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const logger = require("../utils/logger");

signUpRouter.post("/", async (req, res) => {
  try {
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ error: "Email already exists" });
    }

    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);
    const newUser = new User({
      email,
      password: passwordHash,
    });

    const savedUser = await newUser.save();

    res.status(201).json(savedUser);
  } catch (error) {
    logger.info("error");
  }
});

module.exports = signUpRouter;
