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
        
        <SidebarItem icon={<FaThLarge />} label="Dashboard" active />
        <SidebarItem icon={<FaInfoCircle />} label="About Us" />
        <SidebarItem icon={<FaEnvelope />} label="Contact Us" />
        <SidebarItem icon={<FaChartBar />} label="Reports" />
        <SidebarItem icon={<FaCog />} label="Settings" />

      </nav>
    </aside>
  );
};

const SidebarItem = ({ icon, label, active }) => {
  return (
    <div
      className={`flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer transition
        ${active
          ? "bg-white/10 border border-white/20 text-white"
          : "hover:bg-white/10"
        }`}
    >
      {icon}
      <span>{label}</span>
    </div>
  );
};

export default Sidebar;
