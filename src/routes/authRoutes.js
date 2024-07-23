const express = require("express");
const userModel = require("../models");
const passport = require("passport");

const authRoutes = new express.Router();

authRoutes.get("/auth/login", (req, res) => {
  const flashMessage = req?.flash("error") || null;
  console.log(flashMessage);

  res.render("login", { title: "Login", message: req?.flash("error") });
});

authRoutes.get("/auth/signup", (req, res) => {
  res.render("signup", { title: "Sign Up" });
});

authRoutes.post("/auth/signup", async (req, res) => {
  console.log("Signup body: ", req.body);
  const { first_name, last_name, user_name, email, password } = req.body;
  const avatar = req.file ? req.file.buffer : null;

  try {
    const user = new userModel({
      first_name,
      last_name,
      user_name,
      email,
      password,
      avatar,
    });
    await user.save();
    req.flash("success_msg", "You are now registered and can log in");
    res.redirect("/auth/login");
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

authRoutes.post(
  "/auth/login",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/auth/login",
    failureFlash: true,
  })
);

authRoutes.get("/auth/logout", (req, res) => {
  req.logout();
  req.flash("success_msg", "You are logged out");
  res.redirect("/auth/login");
});

module.exports = authRoutes;
