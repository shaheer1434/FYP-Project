import DashboardCard from "./DashboardCard";

const notifications = [
  "New Report Submitted",
  "New Accident Alert",
  "System Notification",
];

const Notifications = () => {
  return (
    <DashboardCard title="Notifications" borderColor="#a855f7">
      <ul className="space-y-3 text-sm text-gray-300">
        {notifications.map((n) => (
          <li key={n}>{n}</li>
        ))}
      </ul>

      <button className="mt-4 w-full py-2 rounded-xl bg-gradient-to-r from-[#091F4E] to-[#1547B4] font-semibold">
        View All
      </button>
    </DashboardCard>
  );
};

export default Notifications;
