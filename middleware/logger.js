const fs = require("fs").promises;
const path = require("path");

// Création du dossier logs s'il n'existe pas
const logsDir = path.join(__dirname, "../logs");
fs.mkdir(logsDir, { recursive: true }).catch(console.error);

const logger = async (req, res, next) => {
  const timestamp = new Date().toISOString();
  const logEntry = `
    Timestamp: ${timestamp}
    Méthode: ${req.method}
    URL: ${req.url}
    IP: ${req.ip}
    User-Agent: ${req.get("user-agent")}
    Statut: ${res.statusCode}
  `;

  const logFileName = `${new Date().toISOString().split("T")[0]}.log`;
  const logFilePath = path.join(logsDir, logFileName);

  try {
    await fs.appendFile(logFilePath, JSON.stringify(logEntry) + "\n", "utf8");
  } catch (error) {
    console.error("Erreur lors de l'écriture du log:", error);
  }

  next();
};

module.exports = logger;
