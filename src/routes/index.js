const postRoutes = require("./postRoutes");
const postsRoutes = require("./postsRoutes");

const home = (app) => {
  app.get('/', (req, res) => res.render("index", { title: "TechForum - Home" }));
};

module.exports = {
  home,
  postRoutes,
  postsRoutes,
}