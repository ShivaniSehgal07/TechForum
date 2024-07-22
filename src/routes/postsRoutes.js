const { getAllPosts } = require("../controllers");

const postsRoutes = (app) => {
  app.get('/posts', getAllPosts);
};

module.exports = postsRoutes;