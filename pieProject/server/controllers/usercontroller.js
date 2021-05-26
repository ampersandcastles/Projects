const router = require("express").Router();
const { UserModel } = require("../models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

router.post("/register", async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  try {
    const newUser = await UserModel.create({
      firstName,
      lastName,
      email,
      password: bcrypt.hashSync(password, 13),
    });

    const token = jwt.sign(
      { id: newUser.id },
      process.env.JWT_SECRET, {expiresIn 60 * 60 * 24}
    )
  } catch (error) {}
});

module.exports = router;
