const mongoose = require("mongoose");

const allergySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  allergyImg: {
    type: Object,
    required: false,
    default:
      "https://res.cloudinary.com/dqgzhdegr/image/upload/v1670768602/images_1_io352m.jpg",
  },
  symptoms: [String],
  severity: {
    type: String,
    required: true,
  },
  highRisk: {
    type: Boolean,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
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
