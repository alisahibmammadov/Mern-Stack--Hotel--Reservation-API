const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    res.status(500).json({ message: "Login deyilsin !!!" });
  }
  jwt.verify(token, "SECRET_KEY", (err, user) => {
    if (err) {
      res.status(500).json({ message: "Token gecersiz..." });
    }
    req.user = user;
    next();
  });
};

const verifyUser = (req, res, next) => {
  verifyToken(req, res, next, () => {
    if (req.user.id == req.params.id || req.user.isAdmin) {
      next();
    } else {
      res.status(500).json({ message: "Login degilsin..." });
    }
  });
};
const verifyAdmin = (req, res, next) => {
  verifyToken(req, res, next, () => {
    if (req.user.isAdmin) {
      next();
    } else {
      res.status(500).json({ message: "Admin degilsin..." });
    }
  });
};

module.exports = {
  verifyAdmin,
  verifyToken,
  verifyUser,
};
