const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema({
  organiser: { type: mongoose.Schema.Types.ObjectId, ref: "EventOrganiser", required: true },
  eventTitle: { type: String, required: true },
  eventDescription: { type: String, required: true },
  eventDate: { type: Date, required: true },
  createdAt: { type: Date, default: Date.now },
  club: { type: mongoose.Schema.Types.ObjectId, ref: "Club", required: true },
  venue: { type: String, required: true },
});

module.exports = mongoose.model("Notification", notificationSchema);
