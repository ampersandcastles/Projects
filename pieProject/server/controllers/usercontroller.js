const router = require("express").Router();
const { UserModel } = require("../models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { UniqueConstraintError } = require("sequelize");
const User = require("../models/user");

// let b0ne = bcrypt.hashSync("password123", 13);
// let bTwo = bcrypt.hashSync("abc123", 13);
// console.log("B-One: ", bOne);
// console.log("B-Two: ", bTwo);

router.post("/register", async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  try {
    const newUser = await UserModel.create({
      firstName,
      lastName,
      email,
      password: bcrypt.hashSync(password, 13),
    });

    const token = jwt.sign({ id: newUser.id }, process.env.JWT_SECRET, {
      expiresIn: 60 * 60 * 12,
    });

    res.status(201).json({
      msg: "User Registered",
      user: newUser,
      token,
    });
  } catch (error) {
    if (error instanceof UniqueConstraintError) {
      res.status(409).json({
        msg: `Email already in use`,
      });
    } else {
      res.status(500).json({
        error: `Failed to register user ${error}`,
      });
    }
  }
});

router.post("/login", async (req, res) => {
  let { email, password } = req.body;

  try {
    let loginUser = await User.findOne({
      where: { email: email },
    });
  } catch (error) {}
});

module.exports = router;
