const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
name: { type: String, required: true },
rollNo: {type: Number, required: true, unique: true},
mentor: { type: mongoose.Schema.Types.ObjectId, ref: "Mentor", required: true },
year: {type: Number, required: true},
group: {type: Number, required: true},
})

module.exports =mongoose.model("Student", studentSchema);
