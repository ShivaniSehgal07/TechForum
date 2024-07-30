const {
  loginIndex,
  signupIndex,
  createUser,
  loginUser,
  logoutUser,
  profile,
} = require("./authController");
const {
  getHome,
  getAboutUs,
  getContactUs,
  getUnknownRoute,
} = require("./generalController");
const {
  addPost,
  addPostIndex,
  getAllPosts,
  getPostById,
  getAllUserPosts,
  editPostIndex,
  editPostById,
  deletePostById,
  searchByPost
} = require("./postController");

module.exports = {
  loginIndex,
  signupIndex,
  createUser,
  loginUser,
  logoutUser,
  profile,
  getHome,
  getAboutUs,
  getContactUs,
  getUnknownRoute,
  addPostIndex,
  addPost,
  getAllPosts,
  getAllUserPosts,
  getPostById,
  editPostIndex,
  editPostById,
  deletePostById,
  searchByPost
};
