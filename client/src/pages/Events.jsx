import { useEffect, useState } from "react";
import api from "../api/axios";

const Events = () => {
  const [events, setEvents] = useState([]);

  const role = localStorage.getItem("role");

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await api.get("/events");
        setEvents(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchEvents();
  }, []);

  const registerEvent = async (event) => {
    try {
      const userId = localStorage.getItem("userId");

      if (!userId) {
        alert("Please login first ❌");
        return;
      }

      await api.post("/registrations", {
        userId,
        eventId: event._id,
        eventTitle: event.title,
      });

      alert("Registered successfully 🎉");

    } catch (err) {
      console.log(err.response?.data || err.message);

      alert(
        err.response?.data?.message ||
        "Registration failed ❌"
      );
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 px-6 py-10">

      {/* Header */}
      <div className="mb-10">
        <h1 className="text-3xl font-semibold text-gray-800 mb-2">
          Explore Events
        </h1>
        <p className="text-gray-500">
          Discover and register for upcoming college activities
        </p>
      </div>

      {/* Empty State */}
      {events.length === 0 && (
        <p className="text-gray-500 text-center mt-10">
          No events available
        </p>
      )}

      {/* Events Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map((event) => (
          <EventCard
            key={event._id}
            event={event}
            registerEvent={registerEvent}
            role={role}
          />
        ))}
      </div>

    </div>
  );
};

const EventCard = ({ event, registerEvent, role }) => {

  const formattedDate = event.date
    ? new Date(event.date).toLocaleDateString("en-IN", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : "Date not available";

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-lg transition duration-300">

      {/* Title */}
      <h3 className="text-xl font-semibold text-indigo-700 mb-3">
        {event.title || "Untitled Event"}
      </h3>

      {/* Details */}
      <div className="space-y-2 text-sm text-gray-600 mb-5">
        <p>📅 {formattedDate}</p>
        <p>📍 {event.venue || "Venue not specified"}</p>
        <p>👥 Max: {event.maxParticipants || "N/A"}</p>
        <p>🎯 {event.eligibility || "All Students"}</p>

        {/* ✅ DESCRIPTION */}
        {event.description && (
          <p className="text-sm text-gray-500 mt-2">
            📝 {event.description}
          </p>
        )}
      </div>

      {/* ✅ REGISTER ONLY FOR STUDENT */}
      {role === "Student" && (
        <button
          onClick={() => registerEvent(event)}
          className="w-full bg-indigo-600 text-white py-2 rounded-md text-sm font-medium hover:bg-indigo-700 transition"
        >
          Register
        </button>
      )}

    </div>
  );
};

export default Events;