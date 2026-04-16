const mongoose = require("mongoose")

const registrationSchema = new mongoose.Schema({
  userId: String,
  eventId: String,
  eventTitle: String,
  attended: { type: Boolean, default: false }
})

module.exports = mongoose.model("Registration", registrationSchema)