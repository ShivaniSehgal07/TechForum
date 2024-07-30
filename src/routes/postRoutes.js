const express = require("express");
const {
  addPostIndex,
  addPost,
  getAllPosts,
  getPostById,
  getAllUserPosts,
  editPostIndex,
  editPostById,
  deletePostById,
  searchByPost
} = require("../controllers");
const { checkAuthMiddleware } = require("../middlewares");

const postRoutes = new express.Router();

// Views
postRoutes.get("/add-post", checkAuthMiddleware, addPostIndex);
postRoutes.post("/add-post", addPost);
postRoutes.get("/posts", checkAuthMiddleware, getAllPosts);
postRoutes.get("/my-posts", checkAuthMiddleware, getAllUserPosts);
postRoutes.get("/post/:id", checkAuthMiddleware, getPostById);
postRoutes.get("/edit-post/:id", checkAuthMiddleware, editPostIndex);
postRoutes.post("/edit-post", editPostById);
postRoutes.get("/post", checkAuthMiddleware, addPost);
postRoutes.delete("/posts/:id", deletePostById);
postRoutes.get("/searchByPost", checkAuthMiddleware, searchByPost);

module.exports = postRoutes;
