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
    symptoms: [...Array.from(symptoms.split(","))], //splits the symtomps in string and resolve it in array
    severity,
    user: req.user.id,
  });

  await newallergy.save();
  res.status(201).json(newallergy);
});

allergyRouter.put("/:id", async (req, res) => {
  try {
    console.log("the try entered");
    const { name, symptoms, severity } = req.body;
    console.log("the req.body", req.body);
    console.log("the req.params.id", req.params.id);

    const selectedAllegy = await Allergy.findOne({ id: req.params.id });
    const needToChangeAllergy = {
      name,
      symptoms: [...selectedAllegy.symptoms, symptoms],
      severity,
    };

    const updatedAllergy = await Allergy.findByIdAndUpdate(
      req.params.id,
      needToChangeAllergy,
      {
        new: true,
      }
    );
    res.status(203).json(updatedAllergy);
  } catch (error) {
    console.log(error);
  }
});

allergyRouter.delete("/:id", async (req, res) => {
  try {
    console.log("the delete req.params", req.params.id);
    await Allergy.findByIdAndRemove(req.params.id);
    res.status(204).end();
  } catch (error) {
    console.log(error);
  }
});

module.exports = allergyRouter;
