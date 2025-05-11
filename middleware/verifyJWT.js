const jwt = require("jsonwebtoken");
const User = require("../models/User");
require("dotenv").config();

const verifyJWT = async (req, res, next) => {
  try {
    const token = req.cookies.token;

    // Si le token n'est pas présent, on redirige vers la page de connexion
    if (!token) {
      req.user = null;
      return next();
    }

    // On vérifie si le token est valide
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId);

    // Si l'utilisateur n'existe pas, on redirige vers la page de connexion
    if (!user) {
      res.redirect("/auth");
    }

    // On ajoute l'utilisateur et le token à la requête
    req.user = user;
    req.token = token;

    next();
  } catch (error) {
    // Si une erreur survient, on vide le cookie et on redirige vers la page de connexion
    res.clearCookie("token");
    req.user = null;
    next();
  }
};

module.exports = verifyJWT;
