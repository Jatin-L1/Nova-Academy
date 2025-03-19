const Notification = require("../models/notificationSchema.js");
const EventOrganiser = require("../models/eventOrganiser.js");

// 📌 Post an Event Notification
exports.postEventNotification = async (req, res) => {
    try {
      const { eventTitle, eventDescription, eventDate, venue } = req.body;
      const organiserId = req.user?.userId; // Extract userId from JWT
  
      // Find organiser by user field
      const organiser = await EventOrganiser.findOne({ user: organiserId }).populate("club");
      if (!organiser) {
        return res.status(404).json({ message: "Event organiser not found" });
      }
  
      if (!organiser.club) {
        return res.status(400).json({ message: "Organiser has no associated club" });
      }
  
      // Create Notification
      const newNotification = new Notification({
        organiser: organiser._id, // Use organiser._id instead of organiserId
        eventTitle,
        eventDescription,
        eventDate,
        club: organiser.club, // Use the organiser's club
        venue,
      });
  
      await newNotification.save();
  
      res.status(201).json({ message: "Event posted successfully", newNotification });
    } catch (error) {
      res.status(500).json({ message: "Server error", error: error.message });
    }
  };
  
  
  

// 📌 Get All Event Notifications
exports.getEventNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find()
      .populate("organiser", "name") // Get organiser name
      .sort({ createdAt: -1 }); // Sort by newest

    res.status(200).json(notifications);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
