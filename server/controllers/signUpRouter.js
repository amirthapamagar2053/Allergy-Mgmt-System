const signUpRouter = require("express").Router();
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const logger = require("../utils/logger");

signUpRouter.post("/", async (req, res) => {
  console.log("the signuprouter enetered");
  try {
    console.log("the try enetered");

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
    // console.log("the newUser is", newUser);

    const savedUser = await newUser.save();

    res.status(201).json(savedUser);
  } catch (error) {
    logger.info("error");
  }
});

signUpRouter.get("/", async (req, res) => {
  try {
    const users = User.find({});
    res.status(200).json(users);
  } catch (error) {
    console.log(error);
  }
});

module.exports = signUpRouter;
