const express = require("express");
const path = require("path");
const flash = require("connect-flash");
const session = require("express-session");
const passport = require("passport");
require("./db/mongoose");
const { authRoutes, home, postRoutes } = require("./routes");

require("./utils/passport")(passport);

const app = express();
const viewsPath = path.join(__dirname, "./templates/views");
const publicDirectoryPath = path.join(__dirname, "../public");

app.set("view engine", "ejs");
app.set("views", viewsPath);
app.use(express.static(publicDirectoryPath));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Express session
app.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: true,
  })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Connect flash
app.use(flash());

// Global variables
app.use((req, res, next) => {
  res.locals.success_msg = req.flash("success_msg");
  res.locals.error_msg = req.flash("error_msg");
  res.locals.error = req.flash("error");
  next();
});

home(app);
app.use(postRoutes);
app.use(authRoutes);

module.exports = app;
