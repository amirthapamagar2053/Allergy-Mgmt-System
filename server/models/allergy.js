const mongoose = require("mongoose");

const symptomsSchema = new mongoose.Schema({
  symptom: String,
});

const allergySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  symptoms: { symptomsSchema },
  severity: {
    type: String,
    required: true,
  },
});

allergySchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model("Allergy", allergySchema);
