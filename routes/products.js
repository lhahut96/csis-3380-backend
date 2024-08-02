var express = require("express");
var router = express.Router();
const productModel = require("../models/product");

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

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const product = await productModel.findOne({ id: id });
    res.json(product);
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
});

router.post("/", async (req, res) => {
  try {
    const { title, description, price } = req.body;
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

router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, price } = req.body;
    const product = await productModel.findByIdAndUpdate(
      id,
      { title, description, price },
      { new: true }
    );
    res.json(product);
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);
    const removeProduct = await productModel.findOneAndDelete({ id: id });
    res.json(removeProduct);
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
});

module.exports = router;
