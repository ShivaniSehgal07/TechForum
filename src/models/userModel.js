const { Buffer } = require("buffer");
const mongoose = require("mongoose");
const { type } = require("os");

// Define a schema
const userSchema = new mongoose.Schema(
  {
    first_name: { type: String, required: true, trim: true },
    last_name: { type: String, required: true, trim: true },
    user_name: { type: String, unique: true, required: true, trim: true },
    email: {
      type: String,
      unique: true,
      required: true,
      minlength: true,
      trim: true,
      lowwercase: true,
    },
    password: { type: String, required: true, trim: true },
    avatar: { type: Buffer, required: false },
    posts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Post" }],
  },
  { timestamps: true }
);

// Create a model from the schema
const userModel = mongoose.model("User", userSchema);

// Export the model
module.exports = userModel;
