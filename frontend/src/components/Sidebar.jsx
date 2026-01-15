import {
  FaShieldAlt,
  FaThLarge,
  FaInfoCircle,
  FaEnvelope,
  FaChartBar,
  FaCog,
  FaSignOutAlt,
} from "react-icons/fa";
import { useNavigate, useLocation } from "react-router-dom";
import { auth } from "../firebase/firebase";
import { signOut } from "firebase/auth";

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      localStorage.clear();
      navigate("/login");
    } catch (err) {
      console.error("Logout error:", err);
    }
  };

  return (
    <aside className="hidden lg:flex flex-col w-64 bg-black/80 backdrop-blur-md text-white px-6 py-8">
      
      {/* Logo */}
      <div 
        className="flex items-center gap-3 mb-12 cursor-pointer" 
        onClick={() => navigate("/dashboard")}
      >
        <FaShieldAlt className="text-3xl text-blue-500" />
        <h1 className="text-xl font-bold">Shield AI</h1>
      </div>

      {/* Menu */}
      <nav className="flex-1 flex flex-col gap-4 text-gray-300">
        
        <SidebarItem 
          icon={<FaThLarge />} 
          label="Dashboard" 
          active={location.pathname === "/dashboard"} 
          onClick={() => navigate("/dashboard")}
        />
        <SidebarItem 
          icon={<FaInfoCircle />} 
          label="About Us" 
          active={location.pathname === "/about"}
          onClick={() => navigate("/about")}
        />
        <SidebarItem 
          icon={<FaEnvelope />} 
          label="Contact Us" 
          active={location.pathname === "/contact"}
          onClick={() => navigate("/contact")}
        />
        <SidebarItem 
          icon={<FaChartBar />} 
          label="Reports" 
          active={location.pathname === "/reports"}
          onClick={() => navigate("/reports")}
        />
        <SidebarItem 
          icon={<FaCog />} 
          label="Settings" 
          active={location.pathname === "/settings"}
          onClick={() => navigate("/settings")}
        />

      </nav>

      {/* Logout */}
      <div className="mt-auto pt-8">
        <SidebarItem 
          icon={<FaSignOutAlt />} 
          label="Logout" 
          onClick={handleLogout}
          className="text-red-400 hover:text-red-300 hover:bg-red-400/10"
        />
      </div>
    </aside>
  );
};

const SidebarItem = ({ icon, label, active, onClick, className }) => {
  return (
    <div
      onClick={onClick}
      className={`flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer transition
        ${active
          ? "bg-white/10 border border-white/20 text-white"
          : "hover:bg-white/10"
        } ${className || ""}`}
    >
      {icon}
      <span>{label}</span>
    </div>
  );
};

export default Sidebar;
