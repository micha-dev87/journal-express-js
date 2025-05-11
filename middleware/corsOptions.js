const corsOptions = {
  origin:
    process.env.NODE_ENV === "production"
      ? process.env.MONSITE
      : process.env.LOCALHOST,
  credentials: true,
};

module.exports = corsOptions;
