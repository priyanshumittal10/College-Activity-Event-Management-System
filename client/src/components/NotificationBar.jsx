import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion"; // 👈 animations
import api from "../api/axios";

const Navbar = () => {
  const navigate = useNavigate();
  const role = localStorage.getItem("role");

  const [open, setOpen] = useState(false);
  const [notes, setNotes] = useState([]);
  const [menuOpen, setMenuOpen] = useState(false);

  const fetchNotes = async () => {
    try {
      const res = await api.get(`/notifications?role=${role}`);
      setNotes(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  const deleteNote = async (id) => {
    await api.delete(`/notifications/${id}`);
    fetchNotes();
  };

  const clearAll = async () => {
    await api.delete(`/notifications?role=${role}`);
    fetchNotes();
  };

  const logout = () => {
    localStorage.clear();
    navigate("/");
    window.location.reload();
  };

  return (
    <motion.div
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="bg-white border-b shadow-md px-6 py-4 flex justify-between items-center"
    >
      {/* Logo */}
      <h1 className="text-2xl font-extrabold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent cursor-pointer">
        College Events
      </h1>

      {/* Desktop Links */}
      <div className="hidden md:flex gap-6 items-center text-gray-700 font-medium">
        <NavLink to="/dashboard" label="Dashboard" />
        <NavLink to="/events" label="Events" />

        {/* Notifications */}
        <div className="relative">
          <motion.button
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setOpen(!open)}
            className="text-2xl relative"
          >
            🔔
            {notes.length > 0 && (
              <span className="absolute -top-1 -right-2 bg-red-500 text-white text-xs px-1 rounded-full">
                {notes.length}
              </span>
            )}
          </motion.button>

          <AnimatePresence>
            {open && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="absolute right-0 mt-2 w-80 bg-white shadow-xl rounded-lg p-3 z-50"
              >
                <div className="flex justify-between mb-2">
                  <span className="font-semibold text-indigo-700">Notifications</span>
                  <button onClick={clearAll} className="text-sm text-red-500 hover:underline">
                    Clear all
                  </button>
                </div>

                {notes.length === 0 ? (
                  <p className="text-gray-500">No notifications</p>
                ) : (
                  notes.map((n) => (
                    <div
                      key={n._id}
                      className="flex justify-between border-b py-2 text-sm hover:bg-gray-50 rounded"
                    >
                      <span>{n.message}</span>
                      <button
                        onClick={() => deleteNote(n._id)}
                        className="text-red-400 hover:text-red-600"
                      >
                        ✕
                      </button>
                    </div>
                  ))
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Logout */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={logout}
          className="bg-gradient-to-r from-red-500 to-red-600 text-white px-4 py-2 rounded-lg font-semibold shadow-md hover:from-red-600 hover:to-red-700 transition"
        >
          Logout
        </motion.button>
      </div>

      {/* Mobile Hamburger */}
      <button
        className="md:hidden text-2xl"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        ☰
      </button>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="absolute top-16 left-0 w-full bg-white shadow-lg rounded-b-lg p-6 flex flex-col gap-4 md:hidden"
          >
            <NavLink to="/dashboard" label="Dashboard" />
            <NavLink to="/events" label="Events" />
            <button
              onClick={logout}
              className="bg-gradient-to-r from-red-500 to-red-600 text-white px-4 py-2 rounded-lg font-semibold shadow-md hover:from-red-600 hover:to-red-700 transition"
            >
              Logout
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const NavLink = ({ to, label }) => (
  <Link
    to={to}
    className="hover:text-indigo-600 transition-colors duration-200 relative group"
  >
    {label}
    <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-indigo-600 transition-all group-hover:w-full"></span>
  </Link>
);

export default Navbar;
