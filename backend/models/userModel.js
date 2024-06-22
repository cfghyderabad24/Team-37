//models/userModel.js
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: [true, "email is required"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "password is required"],
    },
    phone: {
      type: String,
      required: true,
    },
    isRC: {
      type: Boolean,
      default: false,
    },
    isHO: {
      type: Boolean,
      default: false,
    },
    isFD: {
      type: Boolean,
      default: false,
    },
    isf: {
      type: Boolean,
      default: false,
    },
    isTrustee: {
      type: Boolean,
      default: false,
    },
    status: {
      type: String,
      default: "pending",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema); // Use singular 'User' for model name
