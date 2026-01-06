import DashboardCard from "./DashboardCard";

const alerts = [
  "High Severity Accident",
  "Resolved Cases",
  "Minor Incident",
];

const AccidentAlerts = () => {
  return (
    <DashboardCard title="Accident Alerts" borderColor="#3b82f6">
      <ul className="space-y-4">
        {alerts.map((alert) => (
          <li key={alert} className="border-b border-white/10 pb-2">
            {alert}
          </li>
        ))}
      </ul>
    </DashboardCard>
  );
};

export default AccidentAlerts;
