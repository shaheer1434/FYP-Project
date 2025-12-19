import AccidentAlerts from "../components/dashboard/AccidentalAlert";
import CrimeAlerts from "../components/dashboard/CrimeAlert";
import Notifications from "../components/dashboard/Notification";
import QuickStats from "../components/dashboard/QuickStats";
import RecentActivity from "../components/dashboard/RecentActivity";
import TrendChart from "../components/dashboard/TrendChart";
import DashboardLayout from "../components/DashboardLayout";

const Dashboard = () => {
  return (
    <DashboardLayout showHeader={true}>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <CrimeAlerts />
        <AccidentAlerts />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        <QuickStats />
        <TrendChart />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        <RecentActivity />
        <Notifications />
      </div>

    </DashboardLayout>
  );
};

export default Dashboard;
