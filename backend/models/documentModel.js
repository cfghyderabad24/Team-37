// models/documentModel.js
const mongoose = require("mongoose");

const documentSchema = new mongoose.Schema({
  title: String,
  content: String,
  uploadedBy: String,
  uploadDeadline: Date,
  uploadReminderSent: { type: Boolean, default: false },
  uploadDate: Date,
  status: {
    type: String,
    enum: [
      "Pending",
      "Approved by M1",
      "Approved by M2",
      "Approved by M3",
      "Approved by M4",
      "Final Approval",
      "Escalated",
    ],
    default: "Pending",
  },
  approvals: [
    {
      approver: String,
      deadline: Date,
      reminderSent: { type: Boolean, default: false },
      alertSent: { type: Boolean, default: false },
      status: {
        type: String,
        enum: ["Pending", "Approved", "Rejected", "Escalated"],
        default: "Pending",
      },
    },
  ],
  filePath: String,
  grant: { type: Number, required: true },
  levels: { type: Number, required: true },
  curlevel: { type: Number, default: 0 },
});

module.exports = mongoose.model("Document", documentSchema);
