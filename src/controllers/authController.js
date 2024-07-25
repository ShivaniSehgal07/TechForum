const { APP_NAME } = require("../constants");
const { userModel } = require("../models");
const { hashPassword, comparePassword } = require("../utils");

const loginIndex = (req, res) => {
  const title = `${APP_NAME} - Login`;
  const alertMessages = req.flash("alert");
  const alert = alertMessages.length > 0 ? alertMessages[0] : null;

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
    req.flash("alert", `User ${user_name} successfully signed up.`);
    res.redirect("/auth/login");
  } catch (error) {
    req.flash("alert", error.message);
    res.redirect("/auth/signup");
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body || {};

  try {
    const user = await userModel.findOne({ email });

    if (user) {
      const { password: userPassword, user_name } = user;

      if (comparePassword(password, userPassword)) {
        req.session.userId = user_name;
        return res.redirect("/my-posts");
      } else {
        req.flash("alert", "Invalid username or password");
        return res.redirect("/auth/login");
      }
    } else {
      req.flash("alert", "User not found");
      return res.redirect("/auth/login");
    }
  } catch (error) {
    req.flash("alert", "An error occurred. Please try again.");
    return res.redirect("/auth/login");
  }
};

const logoutUser = (req, res) => {
  req.session.destroy((error) => {
    if (error) {
      return res.redirect("/");
    }

    req.flash("alert", "You are logged out");
    res.redirect("/auth/login");
  });
};

module.exports = {
  loginIndex,
  signupIndex,
  createUser,
  loginUser,
  logoutUser,
};
