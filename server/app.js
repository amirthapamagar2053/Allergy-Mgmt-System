const express = require("express");
const cors = require("cors");
const path = require("path");
// const logger = require("./utils/logger");
// const config = require("./utils/config");
// const mongoose = require("mongoose");

const app = express();

// mongoose
//   .connect(config.MONGODB_URI)
//   .then(() => {
//     logger.info("connected to MongoDB");
//   })
//   .catch((error) => {
//     logger.error("error connecting to MongoDB:", error.message);
//   });
app.use(cors());
app.use(express.json());
app.use(express.static("dist"));
// logger.info("connecting to", config.MONGODB_URI);

// sends index.html
app.use("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../dist/index.html"));
});
module.exports = app;
