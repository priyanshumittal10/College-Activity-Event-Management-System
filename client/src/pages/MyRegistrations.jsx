import { useEffect, useState } from "react";
import api from "../api/axios";

const MyRegistrations = () => {
  const [registrations, setRegistrations] = useState([]);

  const userId = localStorage.getItem("userId");

  const fetchRegistrations = async () => {
    try {
      const res = await api.get("/registrations");

      // ✅ Correct filtering
      const myRegs = res.data.filter(
        (reg) => reg.userId?._id === userId
      );

      setRegistrations(myRegs);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchRegistrations();
  }, []);

  const cancelRegistration = async (id) => {
    try {
      await api.delete(`/registrations/${id}`);
      fetchRegistrations();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-10">

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-gray-800 mb-1">
          My Registrations
        </h1>
        <p className="text-gray-600">
          Events you have registered for
        </p>
      </div>

      {registrations.length === 0 ? (
        <p className="text-gray-500 text-center mt-10">
          No registrations found.
        </p>
      ) : (
        <div className="space-y-4 max-w-2xl">
          {registrations.map((reg) => (
            <RegistrationCard
              key={reg._id}
              reg={reg}
              cancelRegistration={cancelRegistration}
            />
          ))}
        </div>
      )}
    </div>
  );
};

const RegistrationCard = ({ reg, cancelRegistration }) => {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm hover:shadow-md transition flex items-center justify-between">

      {/* Left Content */}
      <div>
        <h2 className="text-lg font-semibold text-indigo-700">
          {reg.eventTitle}
        </h2>

        <p className="text-sm mt-1">
          Status:{" "}
          <span
            className={`font-semibold ${
              reg.attended ? "text-green-600" : "text-yellow-500"
            }`}
          >
            {reg.attended ? "Completed" : "Registered"}
          </span>
        </p>
      </div>

      {/* Right Action */}
      {!reg.attended ? (
        <button
          onClick={() => cancelRegistration(reg._id)}
          className="bg-red-500 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-red-600 transition"
        >
          Cancel
        </button>
      ) : (
        <span className="text-green-600 font-semibold text-sm">
          Completed ✔
        </span>
      )}

    </div>
  );
};

export default MyRegistrations;