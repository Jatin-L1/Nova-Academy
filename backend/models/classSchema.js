const mongoose = require('mongoose');

const classSchema = new mongoose.Schema({
    branch: { type: String, required: true },
    year: { type: Number, required: true },
    group: { type: Number, required: true },
    mentorId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }
});

// Ensure `year` and `group` are unique **per mentor**
classSchema.index({ mentorId: 1, year: 1, group: 1 }, { unique: true });

module.exports = mongoose.model("Class", classSchema);
