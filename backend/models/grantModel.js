//models/grantModel.js
const mongoose = require("mongoose");

const grantSchema = new mongoose.Schema(
  {
    NGO: {
      type: String,
      required: true,
    },
    Grant: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("grants", grantSchema);
