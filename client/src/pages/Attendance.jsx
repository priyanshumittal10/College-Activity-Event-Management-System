import { useEffect, useState } from "react";
import api from "../api/axios";

const Attendance = () => {
  const [regs, setRegs] = useState([]);
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState("");

  const fetchData = async () => {
    try {
      const regRes = await api.get("/registrations");
      const eventRes = await api.get("/events");

      setRegs(regRes.data);
      setEvents(eventRes.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const markPresent = async (id) => {
    try {
      await api.put(`/registrations/attendance/${id}`);
      fetchData();
      alert("Attendance marked ✅");
    } catch (err) {
      console.error(err);
      alert("Error marking attendance ❌");
    }
  };

  // ✅ FILTER LOGIC
  const filteredRegs = selectedEvent
    ? regs.filter((r) => r.eventId?._id === selectedEvent)
    : regs;

  return (
    <div className="min-h-screen bg-gray-100 px-6 py-10">

      {/* Header */}
      <div className="mb-10">
        <h1 className="text-3xl font-semibold text-gray-800 mb-2">
          Attendance Management
        </h1>
        <p className="text-gray-500">
          Mark attendance for registered students
        </p>
      </div>

      {/* ✅ EVENT DROPDOWN */}
      <div className="mb-6">
        <select
          value={selectedEvent}
          onChange={(e) => setSelectedEvent(e.target.value)}
          className="border border-gray-300 p-2 rounded-md"
        >
          <option value="">All Events</option>
          {events.map((event) => (
            <option key={event._id} value={event._id}>
              {event.title}
            </option>
          ))}
        </select>
      </div>

      {filteredRegs.length === 0 && (
        <p className="text-gray-500 text-center mt-10">
          No registrations found
        </p>
      )}

      <div className="space-y-4 max-w-3xl">
        {filteredRegs.map((r) => (
          <AttendanceCard key={r._id} reg={r} markPresent={markPresent} />
        ))}
      </div>

    </div>
  );
};

const AttendanceCard = ({ reg, markPresent }) => {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm hover:shadow-md transition flex justify-between items-center">

      <div>
        <h3 className="text-lg font-semibold text-indigo-700">
          {reg.eventTitle}
        </h3>

        <p className="text-sm text-gray-600">
          👤 Student: {reg.userId?.name || "Unknown"}
        </p>

        <p className="text-sm mt-1">
          Status:{" "}
          <span
            className={`font-semibold ${
              reg.attended ? "text-green-600" : "text-red-500"
            }`}
          >
            {reg.attended ? "Present" : "Absent"}
          </span>
        </p>
      </div>

      {!reg.attended ? (
        <button
          onClick={() => markPresent(reg._id)}
          className="bg-green-500 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-green-600 transition"
        >
          Mark Present
        </button>
      ) : (
        <span className="text-green-600 font-semibold text-sm">
          Done ✔
        </span>
      )}

    </div>
  );
};

export default Attendance;