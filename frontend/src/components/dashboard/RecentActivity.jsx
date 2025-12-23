import DashboardCard from "./DashboardCard";

const activities = [
  "AI detected snatching at Gulshan-e-Iqbal",
  "Collision risk detected near Korangi",
  "Alert forwarded to Police Control Room",
];

const RecentActivity = () => {
  return (
    <DashboardCard title="Recent AI Activity" borderColor="#22d3ee">
      <ul className="space-y-3 text-sm text-gray-300">
        {activities.map((a, i) => (
          <li key={i}>• {a}</li>
        ))}
      </ul>
    </DashboardCard>
  );
};

export default RecentActivity;
