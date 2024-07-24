const express = require("express");
const { addPost, getAllPosts, getPostById } = require("../controllers");

const postRoutes = new express.Router();

// Views
postRoutes.get('/posts', getAllPosts);
postRoutes.get('/post', addPost);
postRoutes.get('/post/:id', getPostById);

module.exports = postRoutes;
