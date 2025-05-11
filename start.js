const { spawn } = require("child_process");
const open = require("open").default;
const dotenv = require("dotenv");

dotenv.config();

// Démarrer le serveur avec npx
const server = spawn("npx", ["nodemon", "index.js"], {
  stdio: "inherit",
  shell: true, // Nécessaire pour Windows
});

// Attendre 2 secondes pour s'assurer que le serveur est démarré
setTimeout(() => {
  open(process.env.LOCALHOST || "http://localhost:3000");
}, 2000);

// Gérer l'arrêt du serveur
process.on("SIGINT", () => {
  server.kill();
  process.exit();
});
