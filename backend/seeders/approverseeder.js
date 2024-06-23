// seeders/approverSeeder.js
const mongoose = require("mongoose");
const Approver = require("../models/approverModel");

const seedApprovers = async () => {
  await Approver.deleteMany({});

  const approvers = [
    { name: "Approver 1", level: "M1", email: "adarshranjanar2@gmail.com" },
    { name: "Approver 2", level: "M2", email: "raunakkumarallen@gmail.com" },
    { name: "Approver 3", level: "M3", email: "adarshranjanar2@gmail.com" },
    { name: "Approver 4", level: "M4", email: "raunakkumarallen@gmail.com" },
  ];

  await Approver.insertMany(approvers);
  console.log("Approvers seeded");
  mongoose.disconnect();
};

seedApprovers();
