const express = require("express")
const cors = require("cors")
require("dotenv").config()

const connectDB = require("./config/db")

const authRoutes = require("./routes/authRoutes")
const eventRoutes = require("./routes/eventRoutes")
const registrationRoutes = require("./routes/registrationRoutes")
const notificationRoutes = require("./routes/notificationRoutes")

connectDB()

const app = express()

app.use(cors())
app.use(express.json())

app.use("/api/auth", authRoutes)
app.use("/api/events", eventRoutes)
app.use("/api/registrations", registrationRoutes)
app.use("/api/notifications", notificationRoutes)

app.get("/", (req, res) => {
  res.send("Server running 🚀")
})

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})