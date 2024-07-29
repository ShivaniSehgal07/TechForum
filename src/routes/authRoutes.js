const express = require("express");
const userModel = require("../models/userModel");
const postModel = require("../models/postModel");
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

authRoutes.get("/auth/profile", async (req, res) => {
  try {
    //const db = await connectToDB();
    //const user = await db.collection('users').findOne({});
    //const userId = "66a00711baa41bb0c54f3faa";
    //const user = await userModel.findById(userId);
    console.log("Profile route accessed");
    
    const userName = "hulk"; // Replace this with the desired user_name or fetch it dynamically
    console.log("Searching for user with user_name:", userName);

    const user = await userModel.findOne({ user_name: userName });
    
    console.log("User found:", user);

    if (user) {
      // Count total posts by user
      const totalPosts = await postModel.countDocuments({ author: user.user_name });

      // Find the latest post by user
      const latestPost = await postModel.findOne({ author: user.user_name }).sort({ createdAt: -1 });

      console.log("Total Posts:", totalPosts);
      console.log("Latest Post:", latestPost);
      res.render('profile', { 
        title: "Profile", 
        user: user,
        totalPosts: totalPosts,
        latestPost: latestPost
      });
    } else {
      console.log("No user found");
      res.status(404).send('No user found');
    }
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = authRoutes;
