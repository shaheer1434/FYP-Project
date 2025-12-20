import AccidentAlerts from "../components/dashboard/AccidentalAlert";
import CrimeAlerts from "../components/dashboard/CrimeAlert";
import Notifications from "../components/dashboard/Notification";
import QuickStats from "../components/dashboard/QuickStats";
import RecentActivity from "../components/dashboard/RecentActivity";
import TrendChart from "../components/dashboard/TrendChart";
import DashboardLayout from "../components/DashboardLayout";
import StatCard from "../components/dashboard/StatCard";

const Dashboard = () => {
  return (
    <DashboardLayout showHeader={true}>

      {/* ADMIN STAT CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <StatCard title="Total Incidents Today" value="12" />
        <StatCard title="Accidents vs Crimes" value="5 / 7" />
        <StatCard title="Alerts Sent to Police" value="9" />
        <StatCard title="Pending Incidents" value="3" />
      </div>

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
