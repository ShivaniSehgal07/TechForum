const { getPost, addPost } = require("../controllers");

const postRoutes = (app) => {
  app.get('/post', addPost);
  app.get('/post/:id', getPost);
};

module.exports = postRoutes;