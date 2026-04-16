import { useState } from "react"
import { useNavigate } from "react-router-dom"
import api from "../api/axios"

const Login = () => {
  const navigate = useNavigate()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false) // ✅ added

  const handleLogin = async () => {
    try {
      setLoading(true) // ✅ start loader

      const res = await api.post("/auth/login", {
        email,
        password,
      })

      localStorage.setItem("token", res.data.token)
      localStorage.setItem("role", res.data.user.role)
      localStorage.setItem("userId", res.data.user._id)
      localStorage.setItem("name", res.data.user.name)

      navigate("/dashboard")

    } catch (err) {
      console.log(err.response?.data || err.message)
      setError("Invalid email or password")
    } finally {
      setLoading(false) // ✅ stop loader
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleLogin()
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-900 via-purple-800 to-blue-700 relative">

      <button
        onClick={() => navigate("/")}
        className="absolute top-6 left-6 text-white text-sm font-medium hover:text-yellow-300 transition"
      >
        ← Home
      </button>

      <div className="bg-white p-10 rounded-xl shadow-lg w-full max-w-md border border-gray-200">

        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-2">
          Welcome Back
        </h2>

        <p className="text-sm text-gray-500 text-center mb-8">
          Login to continue to the Event Management System
        </p>

        <input
          className="w-full border border-gray-300 p-3 mb-4 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
          placeholder="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onKeyDown={handleKeyPress}
        />

        <input
          type="password"
          className="w-full border border-gray-300 p-3 mb-2 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onKeyDown={handleKeyPress}
        />

        {error && (
          <p className="text-red-500 text-sm mt-2 mb-3 text-center">
            {error}
          </p>
        )}

        {/* ✅ Updated Button */}
        <button
          onClick={handleLogin}
          disabled={loading}
          className="w-full mt-3 bg-indigo-600 text-white py-3 rounded-md font-medium hover:bg-indigo-700 transition flex items-center justify-center gap-2 disabled:opacity-70"
        >
          {loading ? (
            <>
              <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
              Signing in...
            </>
          ) : (
            "Sign In"
          )}
        </button>

        <p className="text-sm text-gray-500 text-center mt-6">
          Don't have an account?{" "}
          <span
            onClick={() => navigate("/register")}
            className="text-indigo-600 cursor-pointer hover:underline font-medium"
          >
            Create account
          </span>
        </p>

      </div>
    </div>
  )
}

export default Login