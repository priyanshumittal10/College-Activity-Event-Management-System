import { useEffect, useState } from "react";
import api from "../api/axios";

const Approvals = () => {
  const [events, setEvents] = useState([]);

  const fetchPending = async () => {
    const res = await api.get("/events/pending");
    setEvents(res.data);
  };

  useEffect(() => {
    fetchPending();
  }, []);

  const approveEvent = async (id) => {
    await api.put(
      `/events/approve/${id}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    fetchPending();
  };

  const rejectEvent = async (id) => {
    await api.put(
      `/events/reject/${id}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    fetchPending();
  };

  return (
    <div className="min-h-screen bg-gray-100 p-10">

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-gray-800 mb-1">
          Pending Approvals
        </h1>
        <p className="text-gray-600">
          Review and approve submitted events
        </p>
      </div>

      {events.length === 0 && (
        <p className="text-gray-500 text-center mt-10">
          No pending events
        </p>
      )}

      <div className="space-y-4 max-w-3xl">
        {events.map((event) => (
          <ApprovalCard
            key={event._id}
            event={event}
            approveEvent={approveEvent}
            rejectEvent={rejectEvent}
          />
        ))}
      </div>

    </div>
  );
};

const ApprovalCard = ({ event, approveEvent, rejectEvent }) => {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm hover:shadow-md transition flex justify-between items-center">

      <div>
        <h3 className="text-lg font-semibold text-gray-800">
          {event.title}
        </h3>

        <p className="text-sm text-gray-600">
          📅 {event.date}
        </p>

        <p className="text-sm text-gray-600">
          📍 {event.venue}
        </p>
      </div>

      <div className="flex gap-3">

        <button
          onClick={() => approveEvent(event._id)}
          className="bg-green-500 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-green-600 transition"
        >
          Approve
        </button>

        <button
          onClick={() => rejectEvent(event._id)}
          className="bg-red-500 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-red-600 transition"
        >
          Reject
        </button>

      </div>
    </div>
  );
};

export default Approvals;