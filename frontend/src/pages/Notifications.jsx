import DashboardLayout from "../components/DashboardLayout";

const NotificationsPage = () => {
  return (
    <DashboardLayout showHeader={false}>
      <div className="bg-gray-900 border border-gray-700 rounded-xl p-6 max-w-3xl">
        <h1 className="text-2xl font-bold text-blue-500 mb-6">
          Notifications
        </h1>

        <div className="space-y-4">
          <div className="p-4 bg-black/40 border border-gray-700 rounded-lg">
            🚨 Accident detected at Shahrah-e-Faisal — Alert sent to Police
          </div>

          <div className="p-4 bg-black/40 border border-gray-700 rounded-lg">
            ⚠️ Crime incident pending review — Saddar Area
          </div>

          <div className="p-4 bg-black/40 border border-gray-700 rounded-lg">
            ✅ Incident resolved successfully — North Nazimabad
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default NotificationsPage;
