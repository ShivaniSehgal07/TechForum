const checkAuthMiddleware = (req, res, next) => {
  if (req.session?.userId) {
    return next();
  } else {
    req.flash("alert", "You need to be logged in to access this page.");
    res.redirect("/auth/login");
  }
};

module.exports = {
  checkAuthMiddleware,
};
