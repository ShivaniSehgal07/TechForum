const express = require("express");
const path = require("path");
const flash = require("connect-flash");
const session = require("express-session");
const cookieParser = require("cookie-parser");
require("./db/mongoose");
const { authRoutes, generalRoutes, postRoutes } = require("./routes");

const app = express();
const viewsPath = path.join(__dirname, "./templates/views");
const publicDirectoryPath = path.join(__dirname, "../public");
const router = express.Router();

app.set("view engine", "ejs");
app.set("views", viewsPath);
app.use(express.static(publicDirectoryPath));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(
  session({
    secret: "techforum-secret",
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 24 * 60 * 60 * 1000 },
  })
);

app.use(flash());

app.use((req, res, next) => {
  if (req.cookies.flashMessage) {
    req.flash('success', req.cookies.flashMessage);
    res.clearCookie('flashMessage');
  }
  next();
});

app.use((req, res, next) => {
  res.locals.userId = req.session.userId;
  next();
});

app.get("/show-flash", (req, res) => {
  const successMessages = req.flash("success");
  res.send(`Success Messages: ${successMessages}`);
});

app.use(authRoutes);
app.use(postRoutes);
app.use(generalRoutes);

module.exports = app;
