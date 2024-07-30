var express = require("express");
var router = express.Router();
const productModel = require("../models/product");
const upload = require("./upload");

const imageArray = [
  "https://images.pexels.com/photos/170811/pexels-photo-170811.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  "https://images.pexels.com/photos/210019/pexels-photo-210019.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  "https://images.pexels.com/photos/112460/pexels-photo-112460.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
];

const randomImage = () => {
  return imageArray[Math.floor(Math.random() * imageArray.length)];
};

router.get("/", async (req, res) => {
  const page = req.query.page || 1;
  const limit = req.query.limit || 10;
  const products = await productModel.paginate({}, { page, limit });
  res.json(products);
});

router.post("/", async (req, res) => {
  try {
    const { title, description, price } = req;
    const newProduct = new productModel({
      title,
      description,
      price,
      imageSrc: randomImage(),
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
