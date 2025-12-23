import Header from "./Header";
import Sidebar from "./Sidebar";

const DashboardLayout = ({ children, showHeader = false }) => {
  return (
    <div className="min-h-screen flex bg-gradient-to-b from-[#131B42] to-[#0C112D] text-white">
      
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <main className="flex-1 p-4">
        {showHeader && <Header />}
        {children}
      </main>

    </div>
  );
};

export default DashboardLayout;
