//controllers/uploadController.js
const path = require("path");
const multer = require("multer");

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
  upload(req, res, (err) => {
    if (err) {
      res.status(400).json({
        success: false,
        message: err,
      });
    } else {
      if (req.file == undefined) {
        res.status(400).json({
          success: false,
          message: "No file selected!",
        });
      } else {
        res.status(201).json({
          success: true,
          message: "File uploaded!",
          file: `uploads/${req.file.filename}`,
        });
      }
    }
  });
};

module.exports = {
  uploadFile,
};
