const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const DB_NAME = "techforum";
const DB_PORT = 27017;
const MONGODB_URL =
  process.env.MONGODB_URI || `mongodb://127.0.0.1:${DB_PORT}/${DB_NAME}`;

mongoose
  .connect(MONGODB_URL)
  .then(() => console.log("Connected to database."))
  .catch((error) => console.log(`Error connecting to database: ${error}`));

module.exports = mongoose;
