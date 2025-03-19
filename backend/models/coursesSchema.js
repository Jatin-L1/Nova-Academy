const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
    class: { type: mongoose.Schema.Types.ObjectId, ref: "Class", required: true },
    mentorId: { type: mongoose.Schema.Types.ObjectId, ref: "Mentor", required: true }, // Add mentorId
    name: { type: String, required: true },
    teacher: { type: String, required: true },
    totalClasses: { type: Number, required: true },
    attendedClasses: { type: Number, required: true },
    dutyLeave: { type: Number, required: true },
    medicalLeave: { type: Number, required: true },
    attendance: { type: Number, required: true },
});

// Ensure uniqueness of course name per class per mentor
courseSchema.index({ class: 1, name: 1, mentorId: 1 }, { unique: true });

module.exports = mongoose.model("Course", courseSchema);
