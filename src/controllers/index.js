const { getPost, addPost } = require("./postController");
const { getAllPosts } = require("./postsController");

module.exports = {
  addPost,
  getPost,
  getAllPosts,
}