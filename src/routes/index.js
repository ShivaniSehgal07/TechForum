const express = require("express");

const authRoutes = require("./authRoutes");
const postRoutes = require("./postRoutes");

const homeRoutes = new express.Router()

const getHome = (req, res) => res.render("index", { title: "TechForum - Home" });
homeRoutes.get('/', getHome);

const getContactUs = (req, res) => res.render("contact-us", { title: "TechForum - Contact Us" });
homeRoutes.get('/contact-us', getContactUs);

const getAboutUs = (req, res) => res.render("about-us", { title: "TechForum - About Us" });
homeRoutes.get('/about-us', getAboutUs);

module.exports = {
  authRoutes,
  homeRoutes,
  postRoutes,
}
