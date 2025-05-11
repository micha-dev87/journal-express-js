const logout = (req, res, next) => {
  try {
    res.clearCookie("token");
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = logout;
