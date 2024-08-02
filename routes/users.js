var express = require("express");
var router = express.Router();
const userModel = require("../models/user");
const { hashPassword, comparePassword } = require("../helper/bcrypt");
const jwt = require("jsonwebtoken");

/* GET users listing. */

router.get("/test", async (req, res, next) => {
  const newUser = new userModel({
    username: "test",
    password: "test",
  });
  newUser.save();
  res.send("User created");
});

router.get("/", async (req, res, next) => {
  const users = await userModel.find({});
  res.send(users);
});

router.post("/login", async (req, res, next) => {
  try {
    const { username, password } = req.body;
    console.log(username, password);
    const user = await userModel.findOne({
      username,
    });
    if (user) {
      const isMatch = comparePassword(password, user.password);
      if (isMatch) {
        const token = jwt.sign(
          {
            id: user._id,
            email: user.email,
          },
          "lucas-moon-daniel",
          {
            expiresIn: "12h", // token expires in 1 hour
          }
        );
        res.json({
          token,
          username: user.username,
        });
      } else {
        res.status(400).json({
          message: "Invalid password",
        });
      }
    } else {
      res.status(400).json("Invalid username");
    }
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
});

router.post("/register", async (req, res, next) => {
  try {
    const { username, password, role } = req.body;
    const user = await userModel.findOne({ username }).exec();

    if (user) {
      return res.status(400).send("User already exists");
    }

    const hashedPassword = hashPassword(password);
    const newUser = new userModel({
      username,
      password: hashedPassword,
      role,
    });
    console.log(newUser);
    await newUser.save();
    res.send({
      username: newUser.username,
      role: newUser.role,
      createdAt: newUser.createdAt,
    });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
