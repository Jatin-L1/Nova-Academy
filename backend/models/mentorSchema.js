const mongoose = require('mongoose');

const mentorSchema = new mongoose.Schema({
user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
name: { type: String, required: true },
group: {type: Number, required: true},
})

const Mentor = mongoose.models.Mentor || mongoose.model("Mentor", mentorSchema);

module.exports = Mentor;
