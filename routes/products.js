var express = require("express");
var router = express.Router();
const productModel = require("../models/product");
const upload = require("./upload");

router.get("/", async (req, res) => {
  const page = req.query.page || 1;
  const limit = req.query.limit || 10;
  const products = await productModel.paginate({}, { page, limit });
  res.json(products);
});

router.post("/", upload.single("image"), async (req, res) => {
  try {
    const { title, description, price } = req;
    const protocol = req.protocol;
    const host = req.hostname;
    const newProduct = new productModel({
      title,
      description,
      price,
      imageSrc: `${protocol}://${host}/uploads/${req.file.filename}`,
    });
    await newProduct.save();
    res.json(newProduct);
    res.json();
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
});

module.exports = router;
