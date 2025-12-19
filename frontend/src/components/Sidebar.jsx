import { NavLink } from "react-router-dom";
import {
  FaShieldAlt,
  FaThLarge,
  FaInfoCircle,
  FaEnvelope,
  FaChartBar,
  FaCog,
} from "react-icons/fa";

const Sidebar = () => {
  return (
    <aside className="hidden lg:flex flex-col w-64 bg-black/80 backdrop-blur-md text-white px-6 py-8">
      
      {/* Logo */}
      <div className="flex items-center gap-3 mb-12">
        <FaShieldAlt className="text-3xl text-blue-500" />
        <h1 className="text-xl font-bold">Shield AI</h1>
      </div>

      {/* Menu */}
      <nav className="flex flex-col gap-4 text-gray-300">

        <SidebarItem to="/dashboard" icon={<FaThLarge />} label="Dashboard" />
        <SidebarItem to="/about" icon={<FaInfoCircle />} label="About Us" />
        <SidebarItem to="/contact" icon={<FaEnvelope />} label="Contact Us" />
        <SidebarItem to="/reports" icon={<FaChartBar />} label="Reports" />
        <SidebarItem to="/settings" icon={<FaCog />} label="Settings" />

      </nav>
    </aside>
  );
};

const SidebarItem = ({ icon, label, to }) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer transition
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
