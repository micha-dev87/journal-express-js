const express = require("express");
const router = express.Router();
const logout = require("../middleware/logout");

// Route GET pour la déconnexion
router.get("/", logout, (req, res, next) => {
  if (next.error) {
    res.render("error ", {
      message: "Une erreur est survenue lors de la déconnexion",
    });
  } else {
    res.redirect("/auth");
  }
});

module.exports = router;
