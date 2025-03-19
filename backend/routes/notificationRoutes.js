const express = require("express");
const { postEventNotification, getEventNotifications } = require("../controllers/notificationController");
const authMiddleware = require("../middlewares/authmiddleware");


const router = express.Router();

router.post("/post",authMiddleware, postEventNotification); // Event organiser posts an event
router.get("/events", getEventNotifications); // Get all event notifications

module.exports = router;
