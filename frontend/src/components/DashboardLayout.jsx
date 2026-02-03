import Header from "./Header";
import Sidebar from "./Sidebar";
import "leaflet/dist/leaflet.css";


const DashboardLayout = ({ children }) => {
  return (
    <div className="min-h-screen flex bg-gradient-to-b from-[#131B42] to-[#0C112D] text-white">
      
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <main className="flex-1 p-6">
        <Header />
        {children}
      </main>

    </div>
  );
};

export default DashboardLayout;