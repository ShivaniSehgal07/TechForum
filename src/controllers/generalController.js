const { APP_NAME } = require("../constants");

const getHome = (req, res) =>
  res.render("index", { title: `${APP_NAME} - Home` });

const getAboutUs = (req, res) =>
  res.render("about-us", { title: `${APP_NAME} - About Us` });

const getContactUs = (req, res) =>
  res.render("contact-us", { title: `${APP_NAME} - Contact Us` });

const getUnknownRoute = (req, res) =>
  res.render("index", { title: `${APP_NAME} - Home` });

module.exports = {
  getHome,
  getAboutUs,
  getContactUs,
  getUnknownRoute,
};
