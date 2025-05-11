const express = require("express");
const router = express.Router();
const register = require("../middleware/register");

// Route GET pour afficher le formulaire d'inscription
router.get("/", (req, res) => {
  res.render("register", { title: "Inscription" });
});

// Route POST pour traiter l'inscription
router.post("/", register);

module.exports = router;
