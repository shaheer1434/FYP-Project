import { useState, useEffect, useRef } from "react";
import { FaBars, FaBell, FaStar, FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase/firebase";

const Header = () => {
  const [user, setUser] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [showResults, setShowResults] = useState(false);
  const navigate = useNavigate();
  const searchRef = useRef(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const getInitials = (name) => {
    if (!name) return "??";
    const parts = name.split(" ");
    if (parts.length >= 2) {
      return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return parts[0].slice(0, 2).toUpperCase();
  };

  const pages = [
    { name: "Dashboard", path: "/dashboard" },
    { name: "About Us", path: "/about" },
    { name: "Contact Us", path: "/contact" },
    { name: "Reports", path: "/reports" },
    { name: "Settings", path: "/settings" },
    { name: "Profile", path: "/profile" },
    { name: "Notifications", path: "/notifications" },
  ];

  const filteredPages = pages.filter((page) =>
    page.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setShowResults(true);
  };

  const handlePageClick = (path) => {
    navigate(path);
    setSearchQuery("");
    setShowResults(false);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowResults(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="flex items-center justify-between px-6 py-4 bg-black/40 backdrop-blur-md rounded-2xl mb-6 relative">
      
      {/* Left */}
      <div className="flex items-center gap-4">
        <FaBars className="text-xl text-gray-300 lg:hidden" />
        <h2 className="text-lg font-semibold">Shield AI</h2>
      </div>

      {/* Search */}
      <div className="hidden md:flex flex-col relative" ref={searchRef}>
        <div className="flex items-center bg-white/10 px-4 py-2 rounded-full min-w-[300px]">
          <input
            type="text"
            placeholder="Search here..."
            className="bg-transparent outline-none text-sm text-white placeholder-gray-400 w-full"
            value={searchQuery}
            onChange={handleSearchChange}
            onFocus={() => setShowResults(true)}
          />
          <FaSearch className="ml-2 text-gray-400" />
        </div>

        {/* Search Results Dropdown */}
        {showResults && searchQuery && (
          <div className="absolute top-full left-0 right-0 mt-2 bg-[#1a1c2e] border border-white/10 rounded-xl overflow-hidden shadow-2xl z-50">
            {filteredPages.length > 0 ? (
              filteredPages.map((page) => (
                <div
                  key={page.path}
                  className="px-4 py-2 hover:bg-white/10 cursor-pointer text-sm text-gray-300"
                  onClick={() => handlePageClick(page.path)}
                >
                  {page.name}
                </div>
              ))
            ) : (
              <div className="px-4 py-2 text-sm text-gray-500 italic">No pages found</div>
            )}
          </div>
        )}
      </div>

      {/* Right */}
      <div className="flex items-center gap-5">
        <FaStar className="cursor-pointer hover:text-yellow-400 transition" />
        <FaBell className="cursor-pointer hover:text-blue-400 transition" />
        
        <div className="flex items-center gap-3 bg-white/5 px-3 py-1.5 rounded-xl border border-white/10">
          <div className="text-right hidden sm:block">
            <p className="text-xs font-semibold text-white leading-tight">
              {user?.displayName || "User"}
            </p>
            <p className="text-[10px] text-gray-400 leading-tight">
              {user?.email ? user.email.split("@")[0] : "Guest"}
            </p>
          </div>
          <div 
            className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-600 to-indigo-700 flex items-center justify-center cursor-pointer border border-white/20 shadow-lg hover:scale-105 transition"
            onClick={() => navigate("/profile")}
          >
            <span className="text-sm font-bold text-white tracking-tighter">
              {getInitials(user?.displayName)}
            </span>
          </div>
        </div>
      </div>

    </header>
  );
};

export default Header;
