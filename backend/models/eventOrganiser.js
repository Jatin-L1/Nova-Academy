const mongoose = require('mongoose');

const eventOrganiserSchema = new mongoose.Schema({
user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
name: { type: String, required: true },
club: { type: mongoose.Schema.Types.ObjectId, ref: "Club" ,required: true},
})

module.exports = mongoose.model("EventOrganiser", eventOrganiserSchema);
