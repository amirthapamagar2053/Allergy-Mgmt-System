const mongoose = require("mongoose");
const config = require("../utils/config");
const logger = require("../utils/logger");

const connectToDatabase = async () => {
  try {
    await mongoose.connect(config.MONGODB_URI);
    logger.info("connected to MongoDB");
  } catch (error) {
    logger.error("error connecting to MongoDB:", error.message);
    return process.exit(1);
  }

  return null;
};

module.exports = { connectToDatabase };
