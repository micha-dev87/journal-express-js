const User = require("../models/User");
const signJWT = require("./signJWT");

const register = async (req, res) => {
  try {
    const { username, password, confirmPassword } = req.body;

    // Vérification des mots de passe
    if (password !== confirmPassword) {
      return res.render("register", {
        title: "Inscription",
        error: "Les mots de passe ne correspondent pas",
      });
    }

    // Vérification si l'utilisateur existe déjà
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.render("register", {
        title: "Inscription",
        error: "Ce nom d'utilisateur est déjà pris",
      });
    }

    // Création du nouvel utilisateur
    const user = new User({ username, password });
    await user.save();

    signJWT(req, res, next);

    return res.redirect("/journal");
  } catch (error) {
    return res.render("register", {
      title: "Inscription",
      error: "Une erreur est survenue lors de l'inscription",
    });
  }
};

module.exports = register;
