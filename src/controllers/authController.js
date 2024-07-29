const { APP_NAME } = require("../constants");
const { userModel } = require("../models");
const { hashPassword, comparePassword } = require("../utils");

const loginIndex = (req, res) => {
  const title = `${APP_NAME} - Login`;
  const alertMessages = req.flash("alert");
  const successMessages = req.flash("success");
  const alert = alertMessages.length > 0 ? alertMessages[0] : null;
  const success = successMessages.length > 0 ? successMessages[0] : null;

  res.render("login", { title, alert,success});
};

const signupIndex = (req, res) => {
  const title = `${APP_NAME} - Sign Up`;
  const alertMessages = req.flash("alert");
  const alert = alertMessages.length > 0 ? alertMessages[0] : null;

  res.render("signup", { title, alert });
};

const createUser = async (req, res) => {
  const { first_name, last_name, user_name, email, password } = req.body || {};
  const avatar = req?.file?.buffer;
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
    req.flash("success", `User ${user_name} successfully signed up.`);
    res.redirect("/auth/login");
  } catch (error) {
    if (error.code === 11000) {
      req.flash("alert", `Username "${user_name}" is already taken. Please choose another one.`); 
    } else {
    req.flash("alert", error.message);
    }
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
        return res.redirect("/posts");
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

const profile = async (req, res) => {
  try {
  
    const userName = req.session.userId;
    console.log("Profile route accessed");
  
    console.log("Searching for user with user_name:", userName);
    const user = await userModel.findOne({ user_name: userName });
    const profileImage = user.avatar
      ? `data:image/jpeg;base64,${user.avatar.toString("base64")}`
      : null;
    user.avatar = profileImage;
    console.log("User found:", user);

    if (user) {
      const postModel = require("../models/postModel");
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
};

module.exports = {
  loginIndex,
  signupIndex,
  createUser,
  loginUser,
  logoutUser,
  profile,
};
