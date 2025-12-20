import DashboardLayout from "../components/DashboardLayout";
import { useParams } from "react-router-dom";

const IncidentDetails = () => {
  const { id } = useParams();

  return (
    <DashboardLayout showHeader={false}>
      <div className="bg-gray-900 border border-gray-700 rounded-xl p-6 max-w-2xl">
        <h1 className="text-2xl font-bold text-blue-500 mb-4">
          Incident Details
        </h1>

        <p className="text-gray-300">Incident ID: {id}</p>
        <p className="text-gray-300">Type: Accident</p>
        <p className="text-gray-300">Location: Karachi</p>
        <p className="text-gray-300">Status: Alert Sent</p>

        <button
          disabled
          className="mt-6 px-4 py-2 rounded-lg bg-gray-700 cursor-not-allowed"
        >
          Forward to Authority (Future Scope)
        </button>
      </div>
    </DashboardLayout>
  );
};

export default IncidentDetails;
