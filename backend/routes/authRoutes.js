const express = require("express");
const { signup, login } = require("../controllers/userController.js");

const router = express.Router();

// 🔹 User Signup
router.post("/signup", signup);

// 🔹 User Login
router.post("/login", login);

module.exports = router;
