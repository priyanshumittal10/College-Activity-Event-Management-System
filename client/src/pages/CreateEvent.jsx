import { useState } from "react";
import api from "../api/axios";

const CreateEvent = () => {
  const [form, setForm] = useState({
    title: "",
    date: "",
    venue: "",
    maxParticipants: "",
    eligibility: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      await api.post("/events", form);

      alert("Event created successfully 🎉");

      setForm({
        title: "",
        date: "",
        venue: "",
        maxParticipants: "",
        eligibility: "",
      });
    } catch (err) {
      console.log(err.response?.data || err.message);
      alert("Error creating event ❌");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-start p-10">

      <div className="bg-white w-full max-w-xl border border-gray-200 rounded-xl shadow-sm p-8">

        {/* Header */}
        <div className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-800">
            Create Event
          </h2>
          <p className="text-gray-500 text-sm">
            Fill the details to create a new college event
          </p>
        </div>

        {/* Form */}
        <div className="space-y-4">

          <input
            name="title"
            placeholder="Event Title"
            value={form.title}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md p-3 text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
          />

          <input
            name="date"
            placeholder="Event Date"
            value={form.date}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md p-3 text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
          />

          <input
            name="venue"
            placeholder="Event Venue"
            value={form.venue}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md p-3 text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
          />

          <input
            name="maxParticipants"
            placeholder="Max Participants"
            value={form.maxParticipants}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md p-3 text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
          />

          <input
            name="eligibility"
            placeholder="Eligibility"
            value={form.eligibility}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md p-3 text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
          />

          <button
            onClick={handleSubmit}
            className="w-full bg-indigo-600 text-white py-3 rounded-md text-sm font-medium hover:bg-indigo-700 transition"
          >
            Create Event
          </button>

        </div>

      </div>

    </div>
  );
};

export default CreateEvent;