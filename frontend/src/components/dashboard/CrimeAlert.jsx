import DashboardCard from "./DashboardCard";

const crimes = [
  {
    id: 1,
    type: "Snatching",
    location: "Gulshan-e-Iqbal, Karachi",
    time: "2 mins ago",
    confidence: "89%",
  },
  {
    id: 2,
    type: "Harassment",
    location: "Saddar, Karachi",
    time: "6 mins ago",
    confidence: "82%",
  },
];

const CrimeAlerts = () => {
  return (
    <DashboardCard title="AI Crime Alerts" borderColor="#ff2d2d">
      <ul className="space-y-4">
        {crimes.map((c) => (
          <li
            key={c.id}
            className="border-b border-white/10 pb-2 cursor-pointer"
            onClick={() => window.location.href = `/incident/${c.id}`}
          >
            <p className="font-semibold">{c.type}</p>
            <p className="text-xs text-gray-400">{c.location}</p>
            <p className="text-xs text-gray-400">{c.time}</p>
            <p className="text-xs text-red-500">Confidence: {c.confidence}</p>
          </li>
        ))}
      </ul>
    </DashboardCard>
  );
};

export default CrimeAlerts;
