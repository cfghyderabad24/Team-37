const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const mongoose = require("mongoose");
const path = require("path");
const cron = require("node-cron");
const Document = require("./models/documentModel");
const Approver = require("./models/approverModel");
const sendEmail = require("./mailer");
const documentRoutes = require("./routes/documentRoutes");
const connectDB = require("./config/db");

// Load environment variables from .env file
dotenv.config();

connectDB();

// Initialize Express app
const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Define port
const PORT = process.env.PORT || 8000;

// Routes
app.use("/api/v1/auth", require("./routes/authRoutes"));
app.use("/documents", documentRoutes);

// Seed approvers if not already present
const seedApprovers = async () => {
  const approvers = [
    { approver: "M1", email: "adarshranjanar2@gmail.com" },
    { approver: "M2", email: "raunakkumarallen@gmail.com" },
    { approver: "M3", email: "bhaskarnagapuri5691@gmail.com" },
  ];

  for (const approver of approvers) {
    const exists = await Approver.findOne({ approver: approver.approver });
    if (!exists) {
      await new Approver(approver).save();
    }
  }
};

// Call seedApprovers and handle any errors
seedApprovers().catch((err) => console.error("Error seeding approvers:", err));

// Daily job to send reminders and escalate work
const checkDeadlines = async () => {
  const now = new Date();
  const documents = await Document.find({ status: { $ne: "Final Approval" } });

  for (const document of documents) {
    if (
      !document.uploadReminderSent &&
      new Date(document.uploadDeadline) - now <= 5 * 24 * 60 * 60 * 1000
    ) {
      document.uploadReminderSent = true;
      sendEmail(
        document.uploadedBy,
        "Upload Reminder",
        `Your document upload deadline is approaching. Please upload your document by ${document.uploadDeadline}.`
      );
    }

    if (!document.uploadDate && now > new Date(document.uploadDeadline)) {
      document.status = "Escalated";
      sendEmail(
        document.uploadedBy,
        "Upload Deadline Missed",
        `Your document upload deadline has passed. The document has been escalated.`
      );
    }

    for (const approval of document.approvals) {
      if (approval.status === "Pending" && now > approval.deadline) {
        if (
          !approval.reminderSent &&
          now <= new Date(approval.deadline.getTime() + 5 * 24 * 60 * 60 * 1000)
        ) {
          approval.reminderSent = true;
          sendEmail(
            approval.approver,
            "Approval Reminder",
            `You have pending approval for document ID: ${document._id}. Please complete the approval process.`
          );
        } else if (
          !approval.alertSent &&
          now > new Date(approval.deadline.getTime() + 5 * 24 * 60 * 60 * 1000)
        ) {
          approval.alertSent = true;
          approval.status = "Escalated";
          document.status = "Escalated";
          sendEmail(
            approval.approver,
            "Approval Escalated",
            `Your approval deadline has passed. The document has been escalated.`
          );
        }
      }
    }
    await document.save();
  }
};

// Schedule checkDeadlines to run daily
cron.schedule("0 0 * * *", checkDeadlines);

// Start server after successful connection to the database
mongoose.connection.once("open", () => {
  app.listen(PORT, () => {
    console.log(
      `Node server running in ${process.env.DEVMODE} on port ${PORT}`
    );
  });
});
