const express = require("express");
const path = require("path");
const { postsRoutes } = require("./routes")

const app = express();
const viewsPath = path.join(__dirname, './templates/views');
const publicDirectoryPath = path.join(__dirname, "../public");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.set('view engine', 'html');
app.set('view engine', 'ejs');
app.set('views', viewsPath);
app.use(express.static(publicDirectoryPath));

postsRoutes(app);

module.exports = app;