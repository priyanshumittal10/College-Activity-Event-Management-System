const mongoose = require("mongoose")

const registrationSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  eventId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Event"
  },
  eventTitle: String,
  attended: {
    type: Boolean,
    default: false
  }
})

module.exports = mongoose.model("Registration", registrationSchema)