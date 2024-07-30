var express = require("express");
var router = express.Router();

router.use("/users", require("./users"));
router.use("/products", require("./products"));

module.exports = router;
