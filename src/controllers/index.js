<<<<<<< Updated upstream
const { getPost, addPost } = require("./postController");
const { getAllPosts } = require("./postsController");

module.exports = {
=======
const {
  loginIndex,
  signupIndex,
  createUser,
  loginUser,
  logoutUser,
  profile,
} = require("./authController");
const {
  addPost,
  addPostIndex,
  getAllPosts,
  getPostById,
  getAllUserPosts,
  editPostIndex,
  editPostById,
  deletePostById,
} = require("./postController");

module.exports = {
  loginIndex,
  signupIndex,
  createUser,
  loginUser,
  logoutUser,
  profile,
  addPostIndex,
>>>>>>> Stashed changes
  addPost,
  getPost,
  getAllPosts,
}