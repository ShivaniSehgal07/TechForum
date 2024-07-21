const { getPost } = require("../controllers");

const postRoutes = (app) => {
  app.get('/post/:id', getPost);
};

module.exports = postRoutes;