import DashboardCard from "./DashboardCard";

const alerts = [
  {
    id: 1,
    title: "Possible Vehicle Collision",
    location: "Shahrah-e-Faisal, Karachi",
    action: "AI Voice Alert Triggered",
  },
];

const AccidentAlerts = () => {
  return (
    <DashboardCard title="Collision Warnings" borderColor="#3b82f6">
      <ul className="space-y-4">
        {alerts.map((a) => (
          <li key={a.id} className="border-b border-white/10 pb-2">
            <p className="font-semibold">{a.title}</p>
            <p className="text-xs text-gray-400">{a.location}</p>
            <p className="text-xs text-blue-400">{a.action}</p>
          </li>
        ))}
      </ul>
    </DashboardCard>
  );
};

export default AccidentAlerts;
