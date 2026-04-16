const Notification = require("../models/Notification")

const getNotifications = async (req, res) => {
  try {
    const notes = await Notification.find().sort({ createdAt: -1 })
    res.json(notes)
  } catch {
    res.status(500).json({ message: "Error fetching notifications" })
  }
}

const deleteNotification = async (req, res) => {
  await Notification.findByIdAndDelete(req.params.id)
  res.json({ message: "Deleted" })
}

const clearNotifications = async (req, res) => {
  await Notification.deleteMany({})
  res.json({ message: "Cleared" })
}

module.exports = {
  getNotifications,
  deleteNotification,
  clearNotifications
}