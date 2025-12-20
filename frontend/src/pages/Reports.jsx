import React, { useState } from "react";
import DashboardLayout from "../components/DashboardLayout";
import { useNavigate } from "react-router-dom";

const Reports = () => {
  const [activeTab, setActiveTab] = useState("accident");
  const navigate = useNavigate();

  // Dummy Data
  const reports = [
    {
      id: 1,
      type: "Accident",
      location: "Shahrah-e-Faisal, Karachi",
      time: "18 Nov 2025 | 10:32 PM",
      status: "Alert Sent",
    },
    {
      id: 2,
      type: "Snatching",
      location: "Saddar, Karachi",
      time: "18 Nov 2025 | 9:15 PM",
      status: "Pending",
    },
    {
      id: 3,
      type: "Fighting",
      location: "North Nazimabad, Karachi",
      time: "17 Nov 2025 | 8:40 PM",
      status: "Resolved",
    },
  ];

  return (
    <DashboardLayout showHeader={false}>
      <div className="min-h-screen bg-black text-white p-6">
        <h1 className="text-3xl font-bold text-blue-500 mb-6">
          ShieldAI Reports
        </h1>

        <div className="flex gap-4 mb-6">
          <button
            onClick={() => setActiveTab("accident")}
            className={`px-4 py-2 rounded-lg ${
              activeTab === "accident" ? "bg-blue-600" : "bg-gray-800"
            }`}
          >
            Accident Reports
          </button>

          <button
            onClick={() => setActiveTab("crime")}
            className={`px-4 py-2 rounded-lg ${
              activeTab === "crime" ? "bg-red-600" : "bg-gray-800"
            }`}
          >
            Crime Reports
          </button>
        </div>

        <div className="grid gap-4">
          {reports
            .filter((r) =>
              activeTab === "accident"
                ? r.type === "Accident"
                : r.type !== "Accident"
            )
            .map((report) => (
              <div
                key={report.id}
                onClick={() => navigate(`/incident/${report.id}`)}
                className="bg-gray-900 border border-gray-700 rounded-xl p-4 flex justify-between items-center cursor-pointer hover:bg-gray-800 transition"
              >
                <div>
                  <h2 className="text-xl font-semibold">{report.type}</h2>
                  <p className="text-gray-400 mt-1">📍 {report.location}</p>
                  <p className="text-gray-400">🕒 {report.time}</p>
                </div>

                <div
                  className={`px-4 py-2 rounded-lg text-sm font-medium ${
                    report.status === "Pending"
                      ? "bg-yellow-600"
                      : report.status === "Alert Sent"
                      ? "bg-red-600"
                      : "bg-green-600"
                  }`}
                >
                  {report.status}
                </div>
              </div>
            ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Reports;
