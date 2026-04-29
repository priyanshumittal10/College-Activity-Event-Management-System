import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

const Dashboard = () => {
  const role = localStorage.getItem("role");
  const userId = localStorage.getItem("userId");

  const [stats, setStats] = useState({
    events: 0,
    registrations: 0,
    myRegistrations: 0,
    certificates: 0,
  });

  const navigate = useNavigate();

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const eventsRes = await api.get("/events");
        const regsRes = await api.get("/registrations");

        const myRegs = regsRes.data.filter(
          (r) => r.userId?._id === userId
        );

        const certificatesCount = regsRes.data.filter(
          (r) => r.userId?._id === userId && r.attended === true
        ).length;

        setStats({
          events: eventsRes.data.length,
          registrations: regsRes.data.length,
          myRegistrations: myRegs.length,
          certificates: certificatesCount,
        });

      } catch (err) {
        console.log(err);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-10">

      {/* Header */}
      <div className="bg-white rounded-xl shadow-md p-6 mb-8 border border-gray-200">
        <h1 className="text-2xl font-semibold text-gray-800 mb-1">
          Dashboard
        </h1>

        <p className="text-gray-600">
          Logged in as{" "}
          <span className="font-semibold text-indigo-600">{role}</span>
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

        <StatCard
          title="Total Events"
          value={stats.events}
          color="bg-indigo-500"
          onClick={() => navigate("/events")}
        />

        {/* ❌ REMOVE for Student */}
        {(role === "Admin" || role === "Faculty Coordinator") && (
          <StatCard
            title="All Registrations"
            value={stats.registrations}
            color="bg-blue-500"
            onClick={() => navigate("/all-registrations")}
          />
        )}

        {/* ✅ ONLY STUDENT */}
        {role === "Student" && (
          <StatCard
            title="My Registrations"
            value={stats.myRegistrations}
            color="bg-yellow-500"
            onClick={() => navigate("/my-registrations")}
          />
        )}

        {/* ✅ ONLY STUDENT */}
        {role === "Student" && (
          <StatCard
            title="My Certificates"
            value={stats.certificates}
            color="bg-green-500"
            onClick={() => navigate("/certificate")}
          />
        )}

      </div>
    </div>
  );
};

const StatCard = ({ title, value, color, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm 
                 hover:shadow-xl hover:scale-105 transition duration-300 cursor-pointer"
    >
      <div className="flex items-center justify-between mb-4">
        <div className={`w-10 h-10 ${color} rounded-md`}></div>

        <span className="text-2xl font-bold text-gray-800">
          {value}
        </span>
      </div>

      <h3 className="text-gray-600 text-sm font-medium">
        {title}
      </h3>
    </div>
  );
};

export default Dashboard;