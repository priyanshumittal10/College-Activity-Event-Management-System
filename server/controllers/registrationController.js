const mongoose = require("mongoose");
const Registration = require("../models/Registration");
const Notification = require("../models/Notification");

const registerEvent = async (req, res) => {
  try {
    const { userId, eventId, eventTitle } = req.body;

    // ✅ prevent duplicate registration
    const existing = await Registration.findOne({
      userId,
      eventId
    });

    if (existing) {
      return res.status(400).json({ message: "Already registered" });
    }

    const reg = new Registration({
      userId: new mongoose.Types.ObjectId(userId),   // ✅ FIX
      eventId: new mongoose.Types.ObjectId(eventId), // ✅ FIX
      eventTitle
    });

    await reg.save();

    await Notification.create({
      message: `Registered for ${eventTitle}`,
      role: "Student"
    });

    res.json({ message: "Registered successfully" });

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Registration failed" });
  }
};

const getAllRegistrations = async (req, res) => {
  try {
    const regs = await Registration.find()
      .populate("userId", "name")
      .populate("eventId", "title");

    res.json(regs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const cancelRegistration = async (req, res) => {
  await Registration.findByIdAndDelete(req.params.id);

  await Notification.create({
    message: "Registration cancelled",
    role: "Student"
  });

  res.json({ message: "Cancelled" });
};

const markAttendance = async (req, res) => {
  await Registration.findByIdAndUpdate(req.params.id, { attended: true });

  await Notification.create({
    message: "Attendance marked",
    role: "Admin"
  });

  res.json({ message: "Attendance marked" });
};

module.exports = {
  registerEvent,
  getAllRegistrations,
  cancelRegistration,
  markAttendance
};