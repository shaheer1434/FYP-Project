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
    <DashboardLayout>
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
