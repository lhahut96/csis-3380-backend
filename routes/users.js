var express = require("express");
var router = express.Router();
const userModel = require("../models/user");

/* GET users listing. */
router.get("/", async (req, res, next) => {
  const users = await userModel.find({});
  res.send(users);
});

router.post("/login", async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const user = await userModel
      .findOne({
        username,
        password,
      })
      .exec();
    if (user) {
      res.send(user);
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.post("/register", async (req, res, next) => {
  try {
    const { username, password, role } = req.body;
    const hashedPassword = bcrypt.hashSync(password, 10);
    const newUser = new userModel({
      username,
      hashedPassword,
    });
    await newUser.save();
    res.send("User created");
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.get("/test", async (req, res, next) => {
  const newUser = new userModel({
    username: "test",
    password: "test",
  });
  newUser.save();
  res.send("User created");
});

module.exports = router;
