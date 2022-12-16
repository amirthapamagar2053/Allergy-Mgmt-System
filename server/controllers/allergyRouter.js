const allergyRouter = require("express").Router();
const Allergy = require("../models/allergy");

allergyRouter.get("/", async (req, res) => {
  console.log("the gety entered");
  console.log("the req.user", req.user);
  if (req.user) {
    const allergies = await Allergy.find({ user: req.user.id });
    console.log("the allergies", allergies);
    res.status(200).json(allergies);
  } else {
    const allergies = await Allergy.find({});
    res.status(200).json(allergies);
  }
});

allergyRouter.post("/", async (req, res) => {
  const { name, symptoms, severity } = req.body;

  if ((name || symptoms || severity) === undefined) {
    return res.status(400).json({ error: "content missing" });
  }

  const repeatedAllergy = await Allergy.findOne({ name });
  if (repeatedAllergy) {
    return res.status(400).json({ error: "The allergy exists" });
  }

  const newallergy = new Allergy({
    name,
    symptoms: [symptoms],
    severity,
    user: req.user.id,
  });

  await newallergy.save();
  res.status(201).json(newallergy);
});

allergyRouter.put("/:email", async (req, res) => {
  try {
    const { symptoms, severity } = req.body;
    const selectedAllegy = await Allergy.findOne(req.params.email);
    const needToChangeAllergy = {
      symptoms: [...selectedAllegy.symptoms, symptoms],
      severity,
    };

    const updatedAllergy = await Allergy.findByIdAndUpdate(
      req.params.email,
      needToChangeAllergy,
      {
        new: true,
      }
    );
    res.status.apply(203).json(updatedAllergy);
  } catch (error) {
    console.log(error);
  }
});

allergyRouter.delete("/:email", async (req, res) => {
  try {
    await Allergy.findByIdAndRemove(req.params.email);
    res.status(204).end();
  } catch (error) {
    console.log(error);
  }
});

module.exports = allergyRouter;
