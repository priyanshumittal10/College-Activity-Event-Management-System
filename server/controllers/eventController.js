const Event = require("../models/Event")
const Notification = require("../models/Notification")

exports.createEvent = async (req, res) => {
  try {
    const event = new Event(req.body) // ❌ no status here

    await event.save()

    await Notification.create({
      message: `New event created: ${event.title}`
    })

    res.json(event)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

exports.getEvents = async (req, res) => {
  try {
    const events = await Event.find() // ❌ no filter
    res.json(events)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}