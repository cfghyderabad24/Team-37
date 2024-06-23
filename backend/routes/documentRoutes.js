//documentRoutes.js
const express = require("express");
const {
  uploadFile,
  getStatus,
  approveDocument,
} = require("../controllers/documentController");

const router = express.Router();

router.post("/upload", uploadFile);
router.get("/status/:documentId", getStatus);
router.post("/approve/:documentId/:level", approveDocument);

module.exports = router;
