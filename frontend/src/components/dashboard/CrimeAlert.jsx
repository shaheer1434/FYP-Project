import DashboardCard from "./DashboardCard";

const crimes = ["Snatching", "Suspicious Bag", "Fighting", "Harassment"];

const CrimeAlerts = () => {
  return (
    <DashboardCard title="Crime Alerts" borderColor="#ff2d2d">
      <ul className="space-y-4">
        {crimes.map((crime) => (
          <li
            key={crime}
            className="flex items-center justify-between border-b border-white/10 pb-2"
          >
            <span>{crime}</span>
            <span className="w-3 h-3 rounded-full border border-red-500"></span>
          </li>
        ))}
      </ul>
    </DashboardCard>
  );
};

export default CrimeAlerts;
