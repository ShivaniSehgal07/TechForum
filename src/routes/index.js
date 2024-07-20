const postsRoutes = require("./postsRoutes");

const home = (app) => {
  app.get('/', (req, res) => res.render("index", { title: "Home" }));
};

module.exports = {
  home,
  postsRoutes
}