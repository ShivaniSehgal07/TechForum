const express = require("express");
const path = require("path");
const flash = require("connect-flash");
const session = require("express-session");
require("./db/mongoose");
const { authRoutes, home, postRoutes } = require("./routes");

const app = express();
const viewsPath = path.join(__dirname, "./templates/views");
const publicDirectoryPath = path.join(__dirname, "../public");

app.set("view engine", "ejs");
app.set("views", viewsPath);
app.use(express.static(publicDirectoryPath));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    secret: "techforum-secret",
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 24 * 60 * 60 * 1000 },
  })
);

// Make the user session available to all templates
app.use((req, res, next) => {
  res.locals.userId = req.session.userId;
  next();
});

app.use(flash());

home(app);
app.use(postRoutes);
app.use(authRoutes);

module.exports = app;
