const express = require("express")
const router = express.Router()

const {
  registerEvent,
  getAllRegistrations,
  cancelRegistration,
  markAttendance
} = require("../controllers/registrationController")

router.post("/", registerEvent)
router.get("/", getAllRegistrations)
router.delete("/:id", cancelRegistration)
router.put("/attendance/:id", markAttendance)

module.exports = router