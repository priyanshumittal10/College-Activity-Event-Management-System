const express = require("express")
const router = express.Router()

const {
  createEvent,
  getEvents
} = require("../controllers/eventController")

// ✅ Only needed routes
router.post("/", createEvent)
router.get("/", getEvents)

module.exports = router