const express = require("express");
const router = express.Router();
const JournalEntry = require("../models/JournalEntry");

// Route GET pour afficher le journal
router.get("/", async (req, res) => {
  try {
    const entries = await JournalEntry.find({ user: req.user._id }).sort({
      createdAt: -1, // Tri par date de création, du plus récent au plus ancien
    });

    res.render("journal", {
      title: "Mon Journal",
      user: req.user,
      entries,
    });
  } catch (error) {
    res.status(500).render("error", {
      message: "Une erreur est survenue lors du chargement du journal",
    });
  }
});

// Route POST pour ajouter une nouvelle entrée
router.post("/", async (req, res) => {
  try {
    const { content } = req.body;

    const entry = new JournalEntry({
      content,
      user: req.user._id,
    });

    await entry.save();
    res.redirect("/journal");
  } catch (error) {
    res.status(500).render("error", {
      message: "Une erreur est survenue lors de l'ajout de l'entrée",
    });
  }
});

module.exports = router;
