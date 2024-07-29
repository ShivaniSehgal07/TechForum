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
  addPost,
  getAllPosts,
  getAllUserPosts,
  getPostById,
  editPostIndex,
  editPostById,
  deletePostById,
};
