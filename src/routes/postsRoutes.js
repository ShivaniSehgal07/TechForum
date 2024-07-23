const express = require("express");
const { getAllPosts } = require("../controllers");

const postsRoutes = new express.Router();

// Views
postsRoutes.get('/posts', getAllPosts);

module.exports = postsRoutes;