import { Navigate } from "react-router-dom"
import { useState, useEffect } from "react"

const ProtectedRoute = ({ children, allowedRoles }) => {

  const [loading, setLoading] = useState(true)
  const [authorized, setAuthorized] = useState(false)
  const [loggedIn, setLoggedIn] = useState(false)

  useEffect(() => {

    const token = localStorage.getItem("token")
    const role = localStorage.getItem("role")

    if (!token) {
      setLoggedIn(false)
      setAuthorized(false)
    } 
    else {
      setLoggedIn(true)

      if (allowedRoles && !allowedRoles.includes(role)) {
        setAuthorized(false)
      } else {
        setAuthorized(true)
      }
    }

    setLoading(false)

  }, [allowedRoles])


  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-indigo-900 via-purple-800 to-blue-700">
        <div className="text-white text-lg animate-pulse">
          Checking access...
        </div>
      </div>
    )
  }

  // Not logged in
  if (!loggedIn) {
    return <Navigate to="/login" replace />
  }

  // Logged in but wrong role
  if (!authorized) {
    return <Navigate to="/dashboard" replace />
  }

  return children
}

export default ProtectedRoute