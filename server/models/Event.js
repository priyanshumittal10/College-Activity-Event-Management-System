const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },

  // ✅ FIXED DATE TYPE
  date: {
    type: Date,
    required: true
  },

  venue: {
    type: String,
    required: true,
    trim: true
  },

  maxParticipants: {
    type: Number,
    required: true,
    min: 1
  },

  eligibility: {
    type: String,
    required: true,
    trim: true
  },

  // ✅ NEW FIELD
  description: {
    type: String,
    required: true,
    trim: true
  },

  status: {
    type: String,
    default: "Approved"
  }
}, { timestamps: true });

module.exports = mongoose.model("Event", eventSchema);