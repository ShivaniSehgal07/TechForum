const { getAllPosts } = require("../controllers");

const postsRoutes = (app) => {
  app.get('/', getAllPosts);
};

module.exports = postsRoutes;