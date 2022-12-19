const allergyRouter = require("express").Router();
const Allergy = require("../models/allergy");
const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: "dilyevrzy",
  api_key: "311774849752374",
  api_secret: "2atP418TqwMBD5PC9GcP8NHV0BI",
});

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
  console.log("the req.body is", req.body.allergyImg);
  const repeatedAllergy = await Allergy.findOne({ name: req.body.name });

  if (repeatedAllergy) {
    return res.status(400).json({ error: "The allergy exists" });
  }

  if ((name || symptoms || severity) === undefined) {
    return res.status(400).json({ error: "content missing" });
  }

  console.log("the req files", req.body.allergyImg);

  if (req.body.allergyImg) {
    const uploadedResponse = await cloudinary.uploader.upload(
      req.body.allergyImg,
      {
        width: 200,
        height: 200,
        crop: "fill",
      }
    );
    req.body.allergyImg = uploadedResponse.secure_url;
  }

  const newallergy = new Allergy({
    name,
    symptoms: [...Array.from(symptoms.split(","))], //splits the symtomps in string and resolve it in array
    severity,
    highRisk,
    user: req.user.id,
    allergyImg: req.body.allergyImg ? req.body.allergyImg : null,
  });

  // console.log("the else new allergy is", newallergy);

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
