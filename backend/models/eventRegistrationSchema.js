const mongoose = require("mongoose");

const EventRegistrationSchema = new mongoose.Schema({
  student: { type: mongoose.Schema.Types.ObjectId, ref: "Student", required: true },
  studentName: { type: String, required: true },
  rollNo: { type: String, required: true },
  event: { type: mongoose.Schema.Types.ObjectId, ref: "Notification", required: true },
  registeredAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("EventRegistration", EventRegistrationSchema);
