const express = require("express");
const { loginIndex, signupIndex, createUser, loginUser, logoutUser } = require("../controllers");

const authRoutes = new express.Router();

authRoutes.get("/auth/login", loginIndex);
authRoutes.get("/auth/signup", signupIndex);
authRoutes.post("/auth/signup", createUser);
authRoutes.post("/auth/login", loginUser);
authRoutes.get("/auth/logout", logoutUser);

module.exports = authRoutes;
