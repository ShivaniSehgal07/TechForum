const express = require("express");
const { getPost, addPost, getAllPosts } = require("../controllers");

const postRoutes = new express.Router();

// Views
postRoutes.get('/posts', getAllPosts);
postRoutes.get('/post', addPost);
postRoutes.get('/post/:id', getPost);

module.exports = postRoutes;
