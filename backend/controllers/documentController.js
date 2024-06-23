const multer = require("multer");
const path = require("path");
const Document = require("../models/documentModel");
const Approver = require("../models/approverModel");
const sendEmail = require("../mailer");
// const sendSMS = require("../smsSender"); // Assuming this is your SMS sending module

const storage = multer.diskStorage({
  destination: "./public/uploads",
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // limit file size to 10MB
  fileFilter: (req, file, cb) => {
    checkFileType(file, cb);
  },
}).single("pdfFile"); // 'pdfFile' is the name of the field in the form

function checkFileType(file, cb) {
  const filetypes = /pdf/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);
  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb("Error: PDFs Only!");
  }
}

const uploadFile = (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      console.error("Multer Error:", err);
      res.status(400).json({
        success: false,
        message: err,
      });
    } else {
      if (req.file == undefined) {
        console.error("No file selected");
        res.status(400).json({
          success: false,
          message: "No file selected!",
        });
      } else {
        try {
          const now = new Date();
          const uploadDeadline = new Date(req.body.uploadDeadline);
          const grant = req.body.grant;

          let levels;
          if (grant < 12) {
            levels = 1;
          } else if (grant > 12 && grant <= 18) {
            levels = 2;
          } else if (grant > 18 && grant < 25) {
            levels = 3;
          } else {
            levels = 4;
          }

          const document = new Document({
            title: req.body.title,
            content: req.body.content,
            uploadedBy: req.body.uploadedBy,
            uploadDeadline: uploadDeadline,
            approvals: [
              {
                approver: "M1",
                deadline: new Date(now.getTime() + 5 * 24 * 60 * 60 * 1000),
              },
              {
                approver: "M2",
                deadline: new Date(now.getTime() + 10 * 24 * 60 * 60 * 1000),
              },
              {
                approver: "M3",
                deadline: new Date(now.getTime() + 15 * 24 * 60 * 60 * 1000),
              },
              {
                approver: "M4",
                deadline: new Date(now.getTime() + 20 * 24 * 60 * 60 * 1000),
              },
            ],
            filePath: req.file.path,
            grant: grant,
            levels: levels,
            curlevel: 0,
          });

          await document.save();

          sendEmail(
            "adarshranjanar2@gmail.com", // Replace with M1's email
            "New Document for Approval",
            `A new document has been uploaded and requires your approval. You have 5 days to approve or reject it.`
          );

          // sendSMS(
          //   "+919502237652", // Replace with M1's phone number
          //   `A new document has been uploaded and requires your approval. You have 5 days to approve or reject it.`
          // );

          res.status(201).json({
            success: true,
            message: "File uploaded!",
            file: `uploads/${req.file.filename}`,
          });
        } catch (error) {
          console.error("Error saving document:", error);
          res.status(500).json({
            success: false,
            message: "Error uploading document",
            error,
          });
        }
      }
    }
  });
};

const getStatus = async (req, res) => {
  try {
    const document = await Document.findById(req.params.documentId);
    if (!document) {
      return res.status(404).send({ error: "Document not found" });
    }
    res.send(document);
  } catch (error) {
    res.status(500).send({ error: "Error retrieving document status" });
  }
};

const approveDocument = async (req, res) => {
  try {
    const { documentId, level } = req.params;
    console.log(`Approving document: ${documentId} at level: ${level}`);

    const document = await Document.findById(documentId);
    if (!document) {
      console.error("Document not found");
      return res.status(404).send({ error: "Document not found" });
    }

    if (document.curlevel >= document.levels) {
      return res.status(400).send({
        error: "Document has already reached the final approval level",
      });
    }

    const approval = document.approvals.find(
      (approval) => approval.approver === `M${document.curlevel + 1}`
    );
    if (!approval) {
      console.error("Invalid approval level");
      return res.status(400).send({ error: "Invalid approval level" });
    }

    approval.status = "Approved";
    document.status = `Approved by M${document.curlevel + 1}`;
    document.curlevel += 1;

    if (document.curlevel < document.levels) {
      const nextApprover = `M${document.curlevel + 1}`;
      console.log(`Next approver level: ${nextApprover}`);

      const nextApproverDetails = await Approver.findOne({
        level: nextApprover,
      });
      if (!nextApproverDetails) {
        console.error("Next approver not found");
        return res.status(404).send({ error: "Next approver not found" });
      }

      sendEmail(
        "ambatishivani24@gmail.com",
        "New Document for Approval",
        `A new document has been approved by M${document.curlevel} and requires your approval. You have 5 days to approve or reject it.`
      );

      // sendSMS(
      //   "+919502237652", // Replace with next approver's phone number
      //   `A new document has been approved by M${document.curlevel} and requires your approval. You have 5 days to approve or reject it.`
      // );
    } else {
      document.status = "Final Approval";
    }

    await document.save();
    res.send(document);
  } catch (error) {
    console.error("Error approving document:", error);
    res.status(500).send({ error: "Error approving document" });
  }
};

module.exports = {
  uploadFile,
  getStatus,
  approveDocument,
};
