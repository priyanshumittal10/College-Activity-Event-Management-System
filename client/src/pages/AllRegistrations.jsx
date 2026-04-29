import { useEffect, useState } from "react";
import api from "../api/axios";

const AllRegistrations = () => {
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

  // ✅ FILTER
  const filteredRegs = selectedEvent
    ? regs.filter((r) => r.eventId?._id === selectedEvent)
    : regs;

  return (
    <div className="min-h-screen bg-gray-100 px-6 py-10">

      {/* Header */}
      <div className="mb-10">
        <h1 className="text-3xl font-semibold text-gray-800 mb-2">
          All Registrations
        </h1>
        <p className="text-gray-500">
          View all student registrations event-wise
        </p>
      </div>

      {/* Dropdown + Count */}
      <div className="flex flex-wrap items-center justify-between mb-6 gap-4">

        <select
          value={selectedEvent}
          onChange={(e) => setSelectedEvent(e.target.value)}
          className="border border-gray-300 px-4 py-2 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500 outline-none"
        >
          <option value="">All Events</option>
          {events.map((event) => (
            <option key={event._id} value={event._id}>
              {event.title}
            </option>
          ))}
        </select>

        <span className="text-sm text-gray-600">
          Total: <span className="font-semibold">{filteredRegs.length}</span>
        </span>

      </div>

      {/* Empty */}
      {filteredRegs.length === 0 ? (
        <p className="text-gray-500 text-center mt-20">
          No registrations found
        </p>
      ) : (
        <div className="space-y-4 max-w-4xl">

          {filteredRegs.map((r) => (
            <div
              key={r._id}
              className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm hover:shadow-md transition flex justify-between items-center"
            >

              <div>
                <h3 className="text-lg font-semibold text-indigo-700">
                  {r.eventTitle}
                </h3>

                <p className="text-sm text-gray-600">
                  👤 Student: {r.userId?.name || "Unknown"}
                </p>

                <p className="text-sm mt-1">
                  Status:{" "}
                  <span
                    className={`font-semibold ${
                      r.attended
                        ? "text-green-600"
                        : "text-red-500"
                    }`}
                  >
                    {r.attended ? "Present" : "Absent"}
                  </span>
                </p>
              </div>

              {/* <div className="text-sm text-gray-500">
                ID: {r._id.slice(-5)}
              </div> */}

            </div>
          ))}

        </div>
      )}
    </div>
  );
};

export default AllRegistrations;