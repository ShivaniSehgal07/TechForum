const express = require("express");
const {
  getHome,
  getAboutUs,
  getContactUs,
  getUnknownRoute,
} = require("../controllers");

const generalRoutes = new express.Router();

generalRoutes.get("/", getHome);
generalRoutes.get("/contact-us", getContactUs);
generalRoutes.get("/about-us", getAboutUs);
generalRoutes.get("*", getUnknownRoute);

module.exports = generalRoutes;
