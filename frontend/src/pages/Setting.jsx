import DashboardLayout from "../components/DashboardLayout";

const Setting = () => {
  return (
    <DashboardLayout>
      <h1 className="text-3xl font-bold text-blue-500 mb-6">
        Settings
      </h1>

      <div className="space-y-4 max-w-xl">
        
        <div className="bg-gray-900 border border-gray-700 rounded-xl p-4">
          <h2 className="font-semibold">Notification Settings</h2>
          <p className="text-gray-400 text-sm">
            Enable or disable alert notifications.
          </p>
        </div>

        <div className="bg-gray-900 border border-gray-700 rounded-xl p-4">
          <h2 className="font-semibold">System Preferences</h2>
          <p className="text-gray-400 text-sm">
            Configure system behavior and alerts.
          </p>
        </div>

      </div>
    </DashboardLayout>
  );
};

export default Setting;
