import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaBars,
  FaBell,
  FaSearch,
  FaUserCircle,
  FaSignOutAlt,
} from "react-icons/fa";

const Header = () => {
  const [openProfile, setOpenProfile] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/login");
  };

  return (
    <header className="flex items-center justify-between px-6 py-4 bg-black/40 backdrop-blur-md rounded-2xl mb-6 relative">
      {/* LEFT */}
      <div className="flex items-center gap-4">
        <FaBars className="text-xl text-gray-300 lg:hidden" />
        <h2 className="text-lg font-semibold">Dashboard</h2>
      </div>

      {/* SEARCH */}
      <div className="hidden md:flex items-center bg-white/10 px-4 py-2 rounded-full w-72">
        <FaSearch className="text-gray-400 mr-2" />
        <input
          type="text"
          placeholder="Search incidents..."
          className="bg-transparent outline-none text-sm text-white placeholder-gray-400 w-full"
        />
      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-6 relative">
        {/* Notification Bell */}
        <div
          className="relative cursor-pointer"
          onClick={() => navigate("/notifications")}
        >
          <FaBell className="text-xl hover:text-blue-400 transition" />
          <span className="absolute -top-2 -right-2 bg-red-600 text-xs px-1.5 rounded-full">
            3
          </span>
        </div>

        {/* User Profile */}
        <div className="relative">
          <FaUserCircle
            className="text-2xl cursor-pointer hover:text-blue-400 transition"
            onClick={() => setOpenProfile(!openProfile)}
          />

          {openProfile && (
            <div className="absolute right-0 mt-3 w-40 bg-gray-900 border border-gray-700 rounded-xl overflow-hidden z-50">
              <button
                onClick={() => navigate("/profile")}
                className="w-full px-4 py-2 text-left text-sm hover:bg-gray-800"
              >
                Profile
              </button>

              <button
                onClick={handleLogout}
                className="w-full px-4 py-2 text-left text-sm flex items-center gap-2 hover:bg-red-600"
              >
                <FaSignOutAlt /> Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
