const express = require("express");
const { getPost, addPost } = require("../controllers");

const postRoutes = new express.Router();

// Views
postRoutes.get('/post', addPost);
postRoutes.get('/post/:id', getPost);

module.exports = postRoutes;
