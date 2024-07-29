const express = require("express");

const authRoutes = require("./authRoutes");
const postRoutes = require("./postRoutes");

const getHome = (req, res) => res.render("index", { title: "TechForum - Home" });
const homeRoute = new express.Router().get('/', getHome);

module.exports = {
  authRoutes,
  homeRoute,
  postRoutes,
}
