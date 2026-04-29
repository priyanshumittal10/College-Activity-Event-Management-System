import { Routes, Route, useLocation } from "react-router-dom"

import Navbar from "./components/Navbar"
import ProtectedRoute from "./components/ProtectedRoute"
import AllRegistrations from "./pages/AllRegistrations"
import Landing from "./pages/Landing"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Dashboard from "./pages/Dashboard"
import Events from "./pages/Events"
import CreateEvent from "./pages/CreateEvent"
import MyRegistrations from "./pages/MyRegistrations"

import Attendance from "./pages/Attendance"
import Certificate from "./pages/Certificate"
import Reports from "./pages/Reports"

function App() {

  const location = useLocation()

  const hideNavbar = ["/", "/login", "/register"].includes(location.pathname)

  return (
    <>
      {!hideNavbar && <Navbar />}

      <Routes>

        <Route path="/" element={<Landing />} />

        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute allowedRoles={["Admin","Student","Faculty Coordinator","Club Head"]}>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/events"
          element={
            <ProtectedRoute allowedRoles={["Admin","Student","Faculty Coordinator","Club Head"]}>
              <Events />
            </ProtectedRoute>
          }
        />

        <Route
          path="/create-event"
          element={
            <ProtectedRoute allowedRoles={["Admin","Club Head","Faculty Coordinator"]}>
              <CreateEvent />
            </ProtectedRoute>
          }
        />

        <Route
          path="/my-registrations"
          element={
            <ProtectedRoute allowedRoles={["Student"]}>
              <MyRegistrations />
            </ProtectedRoute>
          }
        />
  <Route
          path="/attendance"
          element={
            <ProtectedRoute allowedRoles={["Admin","Faculty Coordinator"]}>
              <Attendance />
            </ProtectedRoute>
          }
        />

        <Route
          path="/certificate"
          element={
            <ProtectedRoute allowedRoles={["Admin","Student"]}>
              <Certificate />
            </ProtectedRoute>
          }
        />

        <Route
          path="/reports"
          element={
            <ProtectedRoute allowedRoles={["Admin"]}>
              <Reports />
            </ProtectedRoute>
          }
        />
        <Route path="/all-registrations" element={<AllRegistrations />} />


        {/* fallback route */}
        <Route path="*" element={<Landing />} />



      </Routes>
    </>
  )
}

export default App