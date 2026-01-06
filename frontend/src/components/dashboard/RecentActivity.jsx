import DashboardCard from "./DashboardCard";

const activities = [
  "User Alex logged in",
  "Minor Incident reported",
  "System backup completed",
];

const RecentActivity = () => {
  return (
    <DashboardCard title="Recent Activity" borderColor="#22d3ee">
      <ul className="space-y-3 text-sm text-gray-300">
        {activities.map((a) => (
          <li key={a}>• {a}</li>
        ))}
      </ul>
    </DashboardCard>
  );
};

export default RecentActivity;
