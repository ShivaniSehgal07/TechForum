const authRoutes = require("./authRoutes");
const postRoutes = require("./postRoutes");
const searchRoutes = require("../controllers/searchController");

const home = (app) => {
  app.get('/searchByPost', searchRoutes.searchByPost);
  
  app.get('/', (req, res) => res.render("index", { title: "TechForum - Home" }));
};

module.exports = {
  authRoutes,
  home,
  postRoutes,
}
