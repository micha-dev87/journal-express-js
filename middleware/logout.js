const logout = (req, res, next) => {
  try {
    res.clearCookie("token");
    return res.redirect("/auth");
  } catch (error) {
    next(error);
  }
};

module.exports = logout;
