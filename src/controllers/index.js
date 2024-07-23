const { loginIndex, signupIndex, createUser, loginUser, logoutUser } = require("./authController");
const { getPost, addPost, getAllPosts } = require("./postController");

module.exports = {
  loginIndex,
  signupIndex,
  createUser,
  loginUser,
  logoutUser,
  addPost,
  getPost,
  getAllPosts,
}