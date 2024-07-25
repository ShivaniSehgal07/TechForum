const {
  loginIndex,
  signupIndex,
  createUser,
  loginUser,
  logoutUser,
} = require("./authController");
const {
  addPost,
  addPostIndex,
  getAllPosts,
  getPostById,
  getAllUserPosts,
  editPostIndex,
  editPostById,
} = require("./postController");

module.exports = {
  loginIndex,
  signupIndex,
  createUser,
  loginUser,
  logoutUser,
  addPostIndex,
  addPost,
  getAllPosts,
  getAllUserPosts,
  getPostById,
  editPostIndex,
  editPostById,
};
