const User = require("../models/User");
const signJWT = require("./signJWT");
require("dotenv").config();

const auth = async (req, res, next) => {
  // Si le token est valide on redirige vers la page de journal

  try {
    const { username, password } = req.body;



    // Recherche de l'utilisateur
    const user = await User.findOne({ username });
    if (!user) {
      return res.render("login", {
        title: "Connexion",
        error: "Nom d'utilisateur ou mot de passe incorrect",
      });
    }

    // Vérification du mot de passe
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.render("login", {
        title: "Connexion",
        error: "Nom d'utilisateur ou mot de passe incorrect",
      });
    }

    req.user = user;
  

    signJWT(req, res, next);

    res.redirect("/journal");
  } catch (error) {
    res.render("login", {
      title: "Connexion",
      error: "Une erreur est survenue lors de la connexion",
    });
  }
};

module.exports = auth;
