const { APP_NAME } = require("../constants");
const { userModel } = require("../models");
const passport = require("../utils/passport");
const { hashPassword } = require("../utils");

const loginIndex = (req, res) => {
  const title = `${APP_NAME} - Login`;
  const flashMessage = req?.flash("error") || null;

  const alert = req.flash("alert");
  res.render("login", { title, alert });
};

const signupIndex = (req, res) => {
  const title = `${APP_NAME} - Sign Up`;
  res.render("signup", { title });
};

const createUser = async (req, res) => {
  const { first_name, last_name, user_name, email, password } = req.body || {};
  const avatar = req.file ? req.file.buffer : null;
  const hashedPassword = hashPassword(password);

  try {
    const user = new userModel({
      first_name,
      last_name,
      user_name,
      email,
      password: hashedPassword,
      avatar,
    });

    await user.save();
    req.flash("alert", "User %s successfully signed up.", user_name);
    res.redirect("/auth/login");
  } catch (error) {
    req.flash("alert", error.message);
    res.redirect("/auth/signup");
  }
};

const loginUser = (req, res) => {
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/auth/login",
    failureFlash: true,
  });
};

const logoutUser = (req, res) => {
  req.logout();
  req.flash("success_msg", "You are logged out");
  res.redirect("/auth/login");
};

// const authenticateUser =

module.exports = {
  loginIndex,
  signupIndex,
  createUser,
  loginUser,
  logoutUser,
};
