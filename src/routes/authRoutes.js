const express = require("express");
const { loginIndex, signupIndex, createUser, loginUser, logoutUser, profile } = require("../controllers");
const { uploadMiddleware, checkAuthMiddleware } = require("../middlewares");

const authRoutes = new express.Router();

authRoutes.get("/auth/login", loginIndex);
authRoutes.get("/auth/signup", signupIndex);
authRoutes.post("/auth/signup", uploadMiddleware, createUser);
authRoutes.post("/auth/login", loginUser);
authRoutes.get("/auth/logout", logoutUser);
authRoutes.get("/auth/profile", checkAuthMiddleware, profile);

module.exports = authRoutes;
