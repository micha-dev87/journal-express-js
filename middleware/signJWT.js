const jwt = require("jsonwebtoken");
require("dotenv").config();
const signJWT = async (req, res, next) => {
  // Génération du token
  const token = jwt.sign(
    { userId: req.user._id, username: req.user.username },
    process.env.JWT_SECRET,
    { expiresIn: "24h" }
  );

  // Stockage du token dans un cookie
  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 24 * 60 * 60 * 1000, // 24 heures
  });

  next();
};

module.exports = signJWT;
