import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import api from "../api/axios";

const Register = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "Student",
  });

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false); // ✅ added

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = async () => {
    try {
      setLoading(true); // ✅ start loader

      await api.post("/auth/register", form);

      setMessage("Account created successfully ✅");

      setTimeout(() => navigate("/login"), 1500);
    } catch {
      setMessage("Registration failed ❌");
    } finally {
      setLoading(false); // ✅ stop loader
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-900 via-purple-800 to-blue-700 relative">

      <button
        onClick={() => navigate("/")}
        className="absolute top-6 left-6 text-white text-sm font-medium hover:text-yellow-300 transition"
      >
        ← Home
      </button>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white p-10 rounded-xl shadow-lg w-full max-w-md border border-gray-200"
      >

        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-2">
          Create Account
        </h2>

        <p className="text-sm text-gray-500 text-center mb-8">
          Register to access the Event Management System
        </p>

        <div className="space-y-4">

          <motion.input
            whileFocus={{ scale: 1.02 }}
            name="name"
            placeholder="Full Name"
            className="w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            onChange={handleChange}
          />

          <motion.input
            whileFocus={{ scale: 1.02 }}
            name="email"
            placeholder="Email address"
            className="w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            onChange={handleChange}
          />

          <motion.input
            whileFocus={{ scale: 1.02 }}
            name="password"
            type="password"
            placeholder="Password"
            className="w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            onChange={handleChange}
          />

          <motion.select
            whileFocus={{ scale: 1.02 }}
            name="role"
            className="w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            onChange={handleChange}
          >
            <option>Student</option>
            <option>Admin</option>
            <option>Faculty Coordinator</option>
            <option>Club Head</option>
          </motion.select>

        </div>

        {message && (
          <p className="text-center text-sm mt-4 text-gray-600">
            {message}
          </p>
        )}

        {/* ✅ Updated Button */}
        <motion.button
          whileHover={{ scale: loading ? 1 : 1.04 }}
          whileTap={{ scale: loading ? 1 : 0.96 }}
          onClick={handleRegister}
          disabled={loading}
          className="w-full mt-6 bg-indigo-600 text-white py-3 rounded-md font-medium hover:bg-indigo-700 transition flex items-center justify-center gap-2 disabled:opacity-70"
        >
          {loading ? (
            <>
              <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
              Creating account...
            </>
          ) : (
            "Sign Up"
          )}
        </motion.button>

        <p className="text-sm text-gray-500 text-center mt-6">
          Already have an account?{" "}
          <span
            onClick={() => navigate("/login")}
            className="text-indigo-600 cursor-pointer hover:underline font-medium"
          >
            Login
          </span>
        </p>

      </motion.div>
    </div>
  );
};

export default Register;