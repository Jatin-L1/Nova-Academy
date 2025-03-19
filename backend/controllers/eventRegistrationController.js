const EventRegistration = require("../models/eventRegistrationSchema.js");
const Student = require("../models/studentSchema.js");
const Notification = require("../models/notificationSchema.js");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");


exports.registerForEvent = async (req, res) => {
    try {
      const { eventId } = req.body;
  
      console.log("Received eventId:", eventId);
  
      // Validate eventId format
      if (!mongoose.Types.ObjectId.isValid(eventId)) {
        return res.status(400).json({ message: "Invalid event ID format" });
      }
  
      // Extract studentId from token
      const token = req.headers.authorization?.split(" ")[1];
      if (!token) {
        return res.status(401).json({ message: "Unauthorized: No token provided" });
      }
  
      const decoded = jwt.verify(token, "idk"); // Replace "idk" with your secret key
      const studentId = decoded.userId;
  
      const student = await Student.findOne({ user: studentId });
      if (!student) {
        return res.status(404).json({ message: "Student not found" });
      }
  
      // Find event in Notification schema
      const event = await Notification.findById(eventId);
      if (!event) {
        return res.status(404).json({ message: "Event not found in Notification schema" });
      }
  
      // Check if already registered
      const alreadyRegistered = await EventRegistration.findOne({ student: student._id, event: eventId });
      if (alreadyRegistered) {
        return res.status(400).json({ message: "Already registered for this event" });
      }
  
      // Register Student for Event
      const registration = new EventRegistration({
        student: student._id,
        studentName: student.name,
        rollNo: student.rollNo,
        event: eventId,
        eventName: event.eventName, // Storing event name from Notification schema
      });
  
      await registration.save();
      res.status(201).json({ message: "Registration successful", registration });
  
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ message: "Server error", error: error.message });
    }
  };
  
  

// 📌 Get All Registrations for a Specific Event


exports.getEventRegistrations = async (req, res) => {
  try {
    let { eventId } = req.params;
    
    // Trim and validate eventId
    eventId = eventId.trim();
    if (!mongoose.Types.ObjectId.isValid(eventId)) {
      return res.status(400).json({ message: "Invalid event ID format" });
    }

    const registrations = await EventRegistration.find({ event: eventId })
      .populate("student", "name rollNo year group")
      .populate("event", "eventTitle eventDescription eventDate");

    if (!registrations.length) {
      return res.status(404).json({ message: "No registrations found for this event" });
    }

    res.status(200).json(registrations);
  } catch (error) {
    console.error("Error fetching registrations:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
