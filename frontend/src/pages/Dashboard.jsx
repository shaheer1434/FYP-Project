import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/firebase";

import DashboardLayout from "../components/DashboardLayout";
import AccidentAlerts from "../components/dashboard/AccidentalAlert";
import CrimeAlerts from "../components/dashboard/CrimeAlert";
import Notifications from "../components/dashboard/Notification";
import QuickStats from "../components/dashboard/QuickStats";
import RecentActivity from "../components/dashboard/RecentActivity";
import TrendChart from "../components/dashboard/TrendChart";
<<<<<<< HEAD
=======
import DashboardLayout from "../components/DashboardLayout";
import StatCard from "../components/dashboard/StatCard";
>>>>>>> 794af7b01a3f7c8bc417e1d60d406945f700b0b0

const Dashboard = () => {

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        window.location.href = "/login";
      }
    });

    return () => unsubscribe();
  }, []);

  return (
<<<<<<< HEAD
    <DashboardLayout>
=======
    <DashboardLayout showHeader={true}>

      {/* ADMIN STAT CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <StatCard title="Total Incidents Today" value="12" />
        <StatCard title="Accidents vs Crimes" value="5 / 7" />
        <StatCard title="Alerts Sent to Police" value="9" />
        <StatCard title="Pending Incidents" value="3" />
      </div>

>>>>>>> 794af7b01a3f7c8bc417e1d60d406945f700b0b0
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
