const jwt = require("jsonwebtoken");
const User = require("../models/User");
require("dotenv").config();

const verifyJWT = async (req, res, next) => {
  try {
    const token = req.cookies.token;

    // Si le token n'est pas présent, on continue sans authentification
    if (!token) {
      return next();
    }

    // On vérifie si le token est valide
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId);

    // Si l'utilisateur n'existe pas, on vide le cookie et on redirige
    if (!user) {
      res.clearCookie("token");
      return res.redirect("/auth");
    }

    // On ajoute l'utilisateur et le token à la requête
    req.user = user;
    req.token = token;

    return next();
  } catch (error) {
    // Si une erreur survient, on vide le cookie et on redirige
    res.clearCookie("token");
    req.user = null;
    return res.redirect("/auth");
  }
};

module.exports = verifyJWT;
