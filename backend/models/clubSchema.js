const mongoose = require('mongoose');

const clubSchema = new mongoose.Schema({
name: { type: String, required: true },
branch: { type: String, required: true },
owner: { type: mongoose.Schema.Types.ObjectId, ref: "EventOrganiser", required: true }, // ✅ Link to organiser
})

module.exports = mongoose.model("Club", clubSchema);
