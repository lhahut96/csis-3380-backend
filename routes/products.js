var express = require("express");
var router = express.Router();
const productModel = require("../models/product");

router.get("/", async (req, res) => {
  const page = req.query.page || 1;
  const limit = req.query.limit || 10;
  const products = await productModel.paginate({}, { page, limit });
  res.json(products);
});

router.post("/", async (req, res) => {
  try {
    const { title, description, price, imageSrc } = req.body;
    const newProduct = new productModel({
      title,
      description,
      price,
      imageSrc,
    });
    await newProduct.save();
    res.json(newProduct);
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
});

module.exports = router;
