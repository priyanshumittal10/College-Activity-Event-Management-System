import { useState } from "react";
import api from "../api/axios";

const CreateEvent = () => {
  const [form, setForm] = useState({
    title: "",
    date: "",
    venue: "",
    maxParticipants: "",
    eligibility: "",
    description: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    const { title, date, venue, maxParticipants, eligibility, description } = form;

    if (!title || !date || !venue || !maxParticipants || !eligibility || !description) {
      alert("All fields are required ❌");
      return false;
    }

    if (isNaN(maxParticipants) || maxParticipants <= 0) {
      alert("Max participants must be a positive number ❌");
      return false;
    }

    const selectedDate = new Date(date);
    const today = new Date();

    if (selectedDate < today.setHours(0,0,0,0)) {
      alert("Event date cannot be in the past ❌");
      return false;
    }

    return true;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    try {
      await api.post("/events", form);

      alert("Event created successfully 🎉");

      setForm({
        title: "",
        date: "",
        venue: "",
        maxParticipants: "",
        eligibility: "",
        description: "",
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

          {/* Title */}
          <input
            name="title"
            placeholder="Event Title"
            value={form.title}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md p-3 text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
          />

          {/* ✅ DATE PICKER */}
          <input
            type="date"
            name="date"
            value={form.date}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md p-3 text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
          />

          {/* Venue */}
          <input
            name="venue"
            placeholder="Event Venue"
            value={form.venue}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md p-3 text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
          />

          {/* Max Participants */}
          <input
            type="number"
            name="maxParticipants"
            placeholder="Max Participants"
            value={form.maxParticipants}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md p-3 text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
          />

          {/* Eligibility */}
          <input
            name="eligibility"
            placeholder="Eligibility (e.g. All Students / CSE Only)"
            value={form.eligibility}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md p-3 text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
          />

          {/* ✅ DESCRIPTION */}
          <textarea
            name="description"
            placeholder="Event Description"
            value={form.description}
            onChange={handleChange}
            rows="4"
            className="w-full border border-gray-300 rounded-md p-3 text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
          />

          {/* Submit */}
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