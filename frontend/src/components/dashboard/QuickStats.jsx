import DashboardCard from "./DashboardCard";

const QuickStats = () => {
  return (
    <DashboardCard title="Quick Stats" borderColor="#22d3ee">
      <div className="flex justify-around">
        
        <div className="text-center">
          <div className="w-24 h-24 rounded-full border-8 border-red-500 flex items-center justify-center text-xl font-bold">
            30%
          </div>
          <p className="mt-2 text-sm text-gray-300">Open Cases</p>
        </div>

        <div className="text-center">
          <div className="w-24 h-24 rounded-full border-8 border-green-500 flex items-center justify-center text-xl font-bold">
            70%
          </div>
          <p className="mt-2 text-sm text-gray-300">Resolved</p>
        </div>

      </div>
    </DashboardCard>
  );
};

export default QuickStats;
