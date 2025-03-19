const express = require("express");
const { registerForEvent, getEventRegistrations } = require("../controllers/eventRegistrationController.js");

const router = express.Router();

router.post("/register", registerForEvent); // Student registers for an event
router.get("/event/:eventId", getEventRegistrations); // Get all students registered for an event

module.exports = router;

