const mongoose = require("mongoose");

const journalEntrySchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: [true, "Le contenu est obligatoire"],
      trim: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "L'utilisateur est obligatoire"],
    },
  },
  {
    timestamps: true,
  }
);

const JournalEntry = mongoose.model("JournalEntry", journalEntrySchema);

module.exports = JournalEntry;
