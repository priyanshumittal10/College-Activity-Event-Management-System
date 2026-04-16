import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import api from "../api/axios";

const Navbar = () => {
  const navigate = useNavigate();
  const role = localStorage.getItem("role");

  const [open, setOpen] = useState(false);
  const [notes, setNotes] = useState([]);

  const fetchNotes = async () => {
    try {
      const res = await api.get(`/notifications`);
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
    await api.delete(`/notifications`);
    fetchNotes();
  };

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div className="bg-white border-b border-gray-200 px-8 py-3 flex justify-between items-center shadow-sm">

      {/* Logo */}
      <h1
        onClick={() => navigate("/")}
        className="cursor-pointer text-xl font-semibold text-indigo-600"
      >
        College Events
      </h1>

      {/* Links */}
      <div className="flex gap-6 items-center text-sm text-gray-700 font-medium">

        <NavLink to="/" label="Home" />
        <NavLink to="/dashboard" label="Dashboard" />
        <NavLink to="/events" label="Events" />

        {role === "Student" && (
          <NavLink to="/my-registrations" label="My Registrations" />
        )}

        {(role === "Admin" || role === "Club Head" || role === "Faculty Coordinator") && (
          <NavLink to="/create-event" label="Create Event" />
        )}

        {(role === "Admin" || role === "Student") && (
          <NavLink to="/certificate" label="Certificates" />
        )}

        {/* ✅ Attendance for Admin + Faculty */}
        {(role === "Admin" || role === "Faculty Coordinator") && (
          <NavLink to="/attendance" label="Attendance" />
        )}

        {/* ✅ Reports only for Admin */}
        {role === "Admin" && (
          <NavLink to="/reports" label="Reports" />
        )}

        {/* 🔔 Notification Bell */}
        <div className="relative">

          <button
            onClick={() => setOpen(!open)}
            className="text-lg relative hover:text-indigo-600 transition"
          >
            🔔

            {notes.length > 0 && (
              <span className="absolute -top-1 -right-2 bg-red-500 text-white text-xs px-1 rounded-full">
                {notes.length}
              </span>
            )}
          </button>

          {open && (
            <div className="absolute right-0 mt-3 w-80 bg-white border border-gray-200 shadow-lg rounded-lg p-3 z-50">

              <div className="flex justify-between items-center mb-2">
                <span className="font-semibold text-gray-700">
                  Notifications
                </span>

                <button
                  onClick={clearAll}
                  className="text-xs text-red-500 hover:underline"
                >
                  Clear all
                </button>
              </div>

              {notes.length === 0 ? (
                <p className="text-gray-500 text-sm">
                  No notifications
                </p>
              ) : (
                notes.map((n) => (
                  <div
                    key={n._id}
                    className="flex justify-between items-center border-b py-2 text-sm hover:bg-gray-50 px-1 rounded"
                  >
                    <span className="text-gray-700">
                      {n.message}
                    </span>

                    <button
                      onClick={() => deleteNote(n._id)}
                      className="text-red-400 hover:text-red-600"
                    >
                      ✕
                    </button>
                  </div>
                ))
              )}

            </div>
          )}

        </div>

        {/* Logout */}
        <button
          onClick={logout}
          className="bg-red-500 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-red-600 transition"
        >
          Logout
        </button>

      </div>

    </div>
  );
};

const NavLink = ({ to, label }) => (
  <Link
    to={to}
    className="hover:text-indigo-600 transition"
  >
    {label}
  </Link>
);

export default Navbar;