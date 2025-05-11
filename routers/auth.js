const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");

// Route GET pour afficher le formulaire de connexion
router.get("/", (req, res) => {
  return res.render("login", { title: "Connexion" });
});

// Route POST pour traiter la connexion
router.post("/", auth);

module.exports = router;
