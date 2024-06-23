// models/approverModel.js
const mongoose = require("mongoose");

const approverSchema = new mongoose.Schema({
  name: String,
  level: String,
  email: String,
});

module.exports = mongoose.model("approver", approverSchema);
