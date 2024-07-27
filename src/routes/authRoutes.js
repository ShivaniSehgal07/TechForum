const express = require("express");
const { loginIndex, signupIndex, createUser, loginUser, logoutUser } = require("../controllers");
const { uploadMiddleware } = require("../middlewares");

const authRoutes = new express.Router();

authRoutes.get("/auth/login", loginIndex);
authRoutes.get("/auth/signup", signupIndex);
authRoutes.post("/auth/signup", uploadMiddleware, createUser);
authRoutes.post("/auth/login", loginUser);
authRoutes.get("/auth/logout", logoutUser);

module.exports = authRoutes;
