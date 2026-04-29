import { useEffect, useState } from "react";
import api from "../api/axios";

const Reports = () => {
  const [stats, setStats] = useState({
    events: 0,
    registrations: 0,
    certificates: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const eventsRes = await api.get("/events");
        const regsRes = await api.get("/registrations");

        const certificates = regsRes.data.filter(
          (r) => r.attended === true
        ).length;

        setStats({
          events: eventsRes.data.length,
          registrations: regsRes.data.length,
          certificates,
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
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-gray-800 mb-1">
          Reports
        </h1>
        <p className="text-gray-600">
          Overview of events, registrations and certificates
        </p>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card title="Total Events" value={stats.events} color="indigo" />
        <Card title="Registrations" value={stats.registrations} color="blue" />
        <Card title="Certificates Issued" value={stats.certificates} color="green" />
      </div>

    </div>
  );
};

const Card = ({ title, value, color }) => {
  const colors = {
    indigo: "bg-indigo-500",
    blue: "bg-blue-500",
    green: "bg-green-500",
  };

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition">

      <div className="flex items-center gap-4">

        <div className={`w-10 h-10 ${colors[color]} rounded-md`}></div>

        <div>
          <p className="text-sm text-gray-600">{title}</p>
          <p className="text-2xl font-semibold text-gray-800">{value}</p>
        </div>

      </div>

    </div>
  );
};

export default Reports;