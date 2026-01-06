import React from "react";
import { FaShieldAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#131B42] to-[#0C112D] text-white px-4">
      
      <div className="flex flex-col items-center text-center bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-10 shadow-2xl max-w-md w-full">
        
        {/* Shield Icon */}
        <div className="w-24 h-24 flex items-center justify-center rounded-full bg-gradient-to-br from-[#091F4E] to-[#1547B4] mb-6 shadow-lg">
          <FaShieldAlt className="text-5xl text-white" />
        </div>

        {/* 404 Text */}
        <h1 className="text-5xl font-extrabold tracking-wider mb-2">
          404
        </h1>

        <p className="text-xl text-gray-300 mb-6">
          Page Not Found
        </p>

        <p className="text-sm text-gray-400 mb-8">
          The page you are looking for doesn’t exist or has been moved.
        </p>

        {/* Button */}
        <button
          onClick={() => navigate("/")}
          className="px-8 py-3 rounded-xl bg-gradient-to-r from-[#091F4E] to-[#1547B4] font-semibold hover:opacity-90 transition"
        >
          Go Back Home
        </button>

      </div>
    </div>
  );
};

export default NotFound;
