const mongoose = require("mongoose");

const allergySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  symptoms: [String],
  severity: {
    type: String,
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
