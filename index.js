require("dotenv").config();
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const helmet = require("helmet");
const cors = require("cors");
const rateLimit = require("express-rate-limit");
const corsOptions = require("./middleware/corsOptions");
const logger = require("./middleware/logger");
const app = express();
const dbConnect = require("./models/db_connect");
const authRoutes = require("./routers/auth");
const journalRoutes = require("./routers/journal");
const registerRoutes = require("./routers/register");
const logoutRoutes = require("./routers/logout");
const verifyJWT = require("./middleware/verifyJWT");
// Configuration de base
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));

// Middleware de base
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// Middleware de logging
app.use(logger);

// Sécurité
app.use(helmet());
// Protection contre le clickjacking : interdit toute inclusion dans une iframe
app.use(helmet.frameguard({ action: "deny" }));
app.use(cors(corsOptions));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limite chaque IP à 100 requêtes par fenêtre
});
app.use(limiter);

// Connexion à la base de données
dbConnect();

// Middleware d'authentification
app.use(verifyJWT);

const verifyToken = (req, res, next) => {
  if (req.user) {
    next();
  } else {
    return res.redirect("/auth");
  }
}

// Routes
app.get("/", verifyToken, (req, res) => {
  return res.redirect("/journal");
});



// Routes spécifiques
app.use("/auth", authRoutes);
app.use("/journal", verifyToken, journalRoutes);
app.use("/register", registerRoutes);
app.use("/logout", verifyToken, logoutRoutes);

// Gestion des erreurs 404
app.use((req, res) => {
  return res.status(404).render("error", { message: "Page non trouvée" });
});

// Gestion des erreurs globales
app.use((err, req, res, next) => {



  console.error(err.stack);
  const status = err.status || 500;
  const message = err.message || "Une erreur est survenue";
  return res.status(status).render("error", {
    message,
    error: process.env.NODE_ENV === "development" ? err : {},
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
});
