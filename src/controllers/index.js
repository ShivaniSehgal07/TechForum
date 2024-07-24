const { loginIndex, signupIndex, createUser, loginUser, logoutUser } = require("./authController");
const { addPost, getAllPosts, getPostById } = require("./postController");

module.exports = {
  loginIndex,
  signupIndex,
  createUser,
  loginUser,
  logoutUser,
  addPost,
  getPostById,
  getAllPosts,
}