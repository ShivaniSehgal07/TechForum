const authRoutes = require("./authRoutes");
const postRoutes = require("./postRoutes");
const postsRoutes = require("./postsRoutes");

const home = (app) => {
  app.get('/', (req, res) => res.render("index", { title: "TechForum - Home" }));
};

module.exports = {
  authRoutes,
  home,
  postRoutes,
  postsRoutes,
}