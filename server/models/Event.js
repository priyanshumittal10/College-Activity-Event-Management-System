const mongoose = require("mongoose")

const eventSchema = new mongoose.Schema({
  title: String,
  date: String,
  venue: String,
  maxParticipants: Number,
  eligibility: String,
  status: {
    type: String,
    default: "Pending"
  }
})

module.exports = mongoose.model("Event", eventSchema)