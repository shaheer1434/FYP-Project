import DashboardLayout from "../components/DashboardLayout";
import { useParams } from "react-router-dom";

const IncidentDetails = () => {
  const { id } = useParams();

  return (
    <DashboardLayout showHeader={false}>
      <div className="bg-gray-900 border border-gray-700 rounded-xl p-6 max-w-2xl">
        <h1 className="text-2xl font-bold text-blue-500 mb-4">
          AI Incident Details
        </h1>

        <p className="text-gray-300">Incident ID: {id}</p>
        <p className="text-gray-300">Type: Snatching</p>
        <p className="text-gray-300">Location: Gulshan-e-Iqbal, Karachi</p>
        <p className="text-gray-300">Time: 18 Nov 2025 | 10:32 PM</p>
        <p className="text-gray-300">AI Confidence: 87%</p>

        <img
          src="https://via.placeholder.com/500x300"
          alt="Evidence"
          className="mt-4 rounded-lg"
        />

        <a
          href="https://maps.google.com"
          target="_blank"
          className="block mt-4 text-blue-400 underline"
        >
          Open Location in Google Maps
        </a>

        <button className="mt-6 px-4 py-2 rounded-lg bg-red-600">
          Notify Authorities
        </button>
      </div>
    </DashboardLayout>
  );
};

export default IncidentDetails;
