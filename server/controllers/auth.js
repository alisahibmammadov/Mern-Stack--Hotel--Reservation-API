const User = require("../models/User.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const register = async (req, res, next) => {
  const { username, password, email } = req.body;
  try {
    const user = await User.findOne(email);
    if (user) res.status(500).json({ message: "Zaten boyle bir hesab var..." });

    if (password.length < 6)
      res.status(500).json({ message: "Parolaniz cok kisa..." });
    const passwordHash = await bcrypt.hash(password, 12);
    if (!isEmail(email))
      res.status(500).json({ message: "Email tipinde degil" });

    const newUser = await User.create({ ...req.body, password: passwordHash });

    const token = await jwt.sign(
      { id: newUser._id, idAdmin: newUser.isAdmin },
      "SECRET_KEY",
      { expiresIn: "1h" }
    );

    res.cookie("token", token, { httpOnly: true }).status(201).json({
      token,
      newUser,
    });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

function isEmail(emailAddress) {
  let regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  if (emailAddress.match(regex)) {
    return true;
  } else {
    return false;
  }
}

const login = async (req, res, next) => {
  const { password, email } = req.body;
  try {
    const user = await User.findOne(email);
    if (user)
      res.status(500).json({ message: "Boyle kullanici bulunmamakta..." });

    const passwordCompare = await bcrypt.compare(password, user.password);
    if (!passwordCompare) {
      return res.status(500).json({ message: "Parolalar eslesmemekte..." });
    }

    const token = await jwt.sign(
      { id: user._id, idAdmin: newUser.isAdmin },
      "SECRET_KEY",
      { expiresIn: "1h" }
    );

    res.cookie("token", token, { httpOnly: true }).status(200).json({
      token,
      user,
    });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

module.exports = {
    register,
    login
}