const express = require("express");
const { createClass, addCourse } = require("../controllers/mentorController.js");
const authMiddleware = require("../middlewares/authmiddleware.js");
const router = express.Router();

// Mentor Routes
router.post("/class",authMiddleware, createClass); // Mentor creates a class
router.post("/course", addCourse); // Mentor adds a course

module.exports = router;
