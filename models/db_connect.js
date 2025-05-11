require("dotenv").config();
const mongoose = require("mongoose");
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true
};

const dbConnect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, options);
    console.log("Connexion à MongoDB réussie");
  } catch (error) {
    console.error("Erreur de connexion à MongoDB:", error);
    process.exit(1);
  }
};

module.exports = dbConnect;
