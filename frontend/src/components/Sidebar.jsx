import { NavLink, useNavigate } from "react-router-dom";
import {
  FaShieldAlt,
  FaThLarge,
  FaInfoCircle,
  FaEnvelope,
  FaChartBar,
  FaBell,
  FaUser,
  FaCog,
  FaSignOutAlt,
} from "react-icons/fa";

const Sidebar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <aside className="hidden lg:flex flex-col w-64 bg-black/80 backdrop-blur-md text-white px-6 py-8">
      <div className="flex items-center gap-3 mb-12">
        <FaShieldAlt className="text-3xl text-blue-500" />
        <h1 className="text-xl font-bold">Shield AI</h1>
      </div>

      <nav className="flex flex-col gap-4 text-gray-300 flex-1">
        <SidebarItem to="/dashboard" icon={<FaThLarge />} label="Dashboard" />
        <SidebarItem to="/profile" icon={<FaUser />} label="Profile" />
        <SidebarItem to="/reports" icon={<FaChartBar />} label="Reports" />
        <SidebarItem to="/about" icon={<FaInfoCircle />} label="About Us" />
        <SidebarItem to="/contact" icon={<FaEnvelope />} label="Contact Us" />
        <SidebarItem
          to="/notifications"
          icon={<FaBell />}
          label="Notifications"
        />
        <SidebarItem to="/settings" icon={<FaCog />} label="Settings" />
      </nav>

      <button
        onClick={handleLogout}
        className="flex items-center gap-3 px-4 py-3 rounded-xl text-red-400 hover:bg-red-500/10 transition"
      >
        <FaSignOutAlt />
        Logout
      </button>
    </aside>
  );
};

const SidebarItem = ({ icon, label, to }) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex items-center gap-3 px-4 py-3 rounded-xl transition
        ${
          isActive
            ? "bg-white/10 border border-white/20 text-white"
            : "hover:bg-white/10 text-gray-300"
        }`
      }
    >
      {icon}
      <span>{label}</span>
    </NavLink>
  );
};

export default Sidebar;
