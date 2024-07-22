var express = require("express");
var multer = require("multer");
var router = express.Router();
const path = require("path");

// Set up multer storage
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../public/uploads"));
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

// Create multer upload instance
var upload = multer({ storage: storage });

// Handle file upload route
router.post("/", upload.single("file"), function (req, res) {
  console.log("testing");
  // File has been uploaded successfully
  res.send("File uploaded!");
});

module.exports = router;
