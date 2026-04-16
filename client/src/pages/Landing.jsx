import { useNavigate } from "react-router-dom"
import { motion } from "framer-motion"

const Landing = () => {
  const navigate = useNavigate()

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const scrollToAbout = () => {
    const section = document.getElementById("about")
    if (section) {
      section.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-800 to-blue-700 text-white"
    >

      {/* Navbar */}
      <div className="flex justify-between items-center px-10 py-6 bg-black/20 backdrop-blur-md sticky top-0 z-50">

        <h1
          onClick={scrollToTop}
          className="text-2xl font-bold cursor-pointer"
        >
          JIMS - Event & Activity Management System
        </h1>

        <div className="flex gap-6 items-center">


          <button
            onClick={scrollToTop}
            className="hover:text-yellow-300"
          >
            Home
          </button>

          <button
            onClick={scrollToAbout}
            className="hover:text-yellow-300"
          >
            About
          </button>

          <button
            onClick={() => navigate("/login")}
            className="hover:text-yellow-300"
          >
            Login
          </button>

          <button
            onClick={() => navigate("/register")}
            className="bg-yellow-400 text-black px-4 py-2 rounded-lg font-semibold hover:bg-yellow-300"
          >
            Register
          </button>

        </div>
      </div>


      {/* Hero Section */}
      <div className="flex flex-col items-center justify-center text-center mt-24 px-6">

        <h1 className="text-5xl font-bold mb-6">
          College Event & Activity Management System
        </h1>

        <p className="max-w-2xl text-lg text-gray-200">
          A platform to create, manage and participate in college events.
          Students can register for events, faculty can approve them,
          and administrators can manage attendance and certificates.
        </p>

        <div className="mt-8 flex gap-6">

          <button
            onClick={() => navigate("/login")}
            className="bg-indigo-500 px-6 py-3 rounded-lg hover:bg-indigo-600"
          >
            Login
          </button>

          <button
            onClick={() => navigate("/register")}
            className="bg-white text-black px-6 py-3 rounded-lg hover:bg-gray-200"
          >
            Register
          </button>

        </div>

      </div>


      {/* Features Section */}
      <div className="mt-24 px-10">

        <h2 className="text-3xl font-bold text-center mb-12">
          Platform Features
        </h2>

        <div className="grid md:grid-cols-3 gap-10 text-center">

          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-white/10 backdrop-blur-md p-8 rounded-xl shadow-lg hover:shadow-2xl transition"
          >
            <h3 className="text-xl font-semibold mb-3">
              Event Management
            </h3>
            <p className="text-gray-200">
              Admins and club heads can create and manage events easily.
            </p>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-white/10 backdrop-blur-md p-8 rounded-xl shadow-lg hover:shadow-2xl transition"
          >
            <h3 className="text-xl font-semibold mb-3">
              Approval Workflow
            </h3>
            <p className="text-gray-200">
              Faculty coordinators review and approve events before publishing.
            </p>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-white/10 backdrop-blur-md p-8 rounded-xl shadow-lg hover:shadow-2xl transition"
          >
            <h3 className="text-xl font-semibold mb-3">
              Certificates & Attendance
            </h3>
            <p className="text-gray-200">
              Admins can mark attendance and students receive participation certificates.
            </p>
          </motion.div>

        </div>

      </div>


      {/* Stats Section */}
      <div className="mt-24 px-10">

        <h2 className="text-3xl font-bold text-center mb-12">
          Our Impact
        </h2>

        <div className="grid md:grid-cols-3 gap-10 text-center">

          <div className="bg-white/10 backdrop-blur-md p-8 rounded-xl">
            <h3 className="text-4xl font-bold text-yellow-300">15+</h3>
            <p className="mt-2 text-gray-200">Events Organized</p>
          </div>

          <div className="bg-white/10 backdrop-blur-md p-8 rounded-xl">
            <h3 className="text-4xl font-bold text-yellow-300">100+</h3>
            <p className="mt-2 text-gray-200">Student Registrations</p>
          </div>

          <div className="bg-white/10 backdrop-blur-md p-8 rounded-xl">
            <h3 className="text-4xl font-bold text-yellow-300">10+</h3>
            <p className="mt-2 text-gray-200">College Clubs</p>
          </div>

        </div>

      </div>


      {/* About Section */}
      <div
        id="about"
        className="mt-32 bg-white text-gray-800 py-16 px-10"
      >

        <h2 className="text-4xl font-extrabold text-center mb-10">
          About Our College
        </h2>

        <div className="max-w-4xl mx-auto text-center">

          {/* College Logo */}
          <img
            src="/college-logo.png"
            alt="college logo"
            className="mx-auto mb-8 w-40 drop-shadow-lg"
          />

          <p className="text-lg font-semibold leading-relaxed text-gray-700">
            Jagan Institute of Management Sciences (JIMS) is a leading
            educational institution known for excellence in management
            and technology education. The institute regularly organizes
            events, seminars, workshops and cultural activities to
            enhance student engagement and practical learning.
          </p>

        </div>

      </div>


      {/* Footer */}
      <div className="bg-black text-gray-300 py-6 text-center">

        <p>© 2026 College Activity & Event Management System</p>

        

      </div>

    </motion.div>
  )
}

export default Landing