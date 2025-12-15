import { FaBars, FaBell, FaStar, FaSearch } from "react-icons/fa";

const Header = () => {
  return (
    <header className="flex items-center justify-between px-6 py-4 bg-black/40 backdrop-blur-md rounded-2xl mb-6">
      
      {/* Left */}
      <div className="flex items-center gap-4">
        <FaBars className="text-xl text-gray-300 lg:hidden" />
        <h2 className="text-lg font-semibold">Dashboard</h2>
      </div>

      {/* Search */}
      <div className="hidden md:flex items-center bg-white/10 px-4 py-2 rounded-full">
        <input
          type="text"
          placeholder="Search here"
          className="bg-transparent outline-none text-sm text-white placeholder-gray-400"
        />
        <FaSearch className="ml-2 text-gray-400" />
      </div>

      {/* Right */}
      <div className="flex items-center gap-5">
        <FaStar />
        <FaBell />
        <div className="w-8 h-8 rounded-full bg-gray-400"></div>
      </div>

    </header>
  );
};

export default Header;
