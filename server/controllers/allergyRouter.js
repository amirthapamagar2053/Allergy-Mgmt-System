const allergyRouter = require("express").Router();
const Allergy = require("../models/allergy");

allergyRouter.get("/", async (req, res) => {
  if (req.user) {
    console.log("the if entered");
    const allergies = await Allergy.find({ user: req.user.id });
    console.log("the allergies", allergies);
    res.status(200).json(allergies);
  } else {
    console.log("the else entered");
    const allergies = await Allergy.find({});
    res.status(200).json(allergies);
  }
});

allergyRouter.post("/", async (req, res) => {
  const { name, symptoms, severity, highRisk } = req.body;
  const repeatedAllergy = await Allergy.findOne({ name: req.body.name });

  if (repeatedAllergy) {
    return res.status(400).json({ error: "The allergy exists" });
  }

  if ((name || symptoms || severity) === undefined) {
    return res.status(400).json({ error: "content missing" });
  }

  const newallergy = new Allergy({
    name,
    symptoms: [...Array.from(symptoms.split(","))], //splits the symtomps in string and resolve it in array
    severity,
    highRisk,
    user: req.user.id,
  });

  await newallergy.save();
  res.status(201).json(newallergy);
});

allergyRouter.put("/:id", async (req, res) => {
  try {
    console.log("the try entered");
    const { name, symptoms, severity, highRisk } = req.body;
    console.log("the req.body", req.body);
    console.log("the req.params.id", req.params.id);

    const selectedAllegy = await Allergy.findOne({ id: req.params.id });
    const needToChangeAllergy = {
      name,
      symptoms: [...selectedAllegy.symptoms, symptoms],
      severity,
      highRisk,
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
