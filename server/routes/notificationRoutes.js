const express = require("express")
const router = express.Router()

const {
  getNotifications,
  deleteNotification,
  clearNotifications
} = require("../controllers/notificationController")

router.get("/", getNotifications)
router.delete("/:id", deleteNotification)
router.delete("/", clearNotifications)

module.exports = router