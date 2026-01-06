import React from "react";
import {
  FaGoogle,
  FaFacebookF,
  FaUser,
  FaEnvelope,
  FaLock,
  FaShieldAlt,
} from "react-icons/fa";
import { Link } from "react-router";

export const SignupPage = () => {
  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-black text-white">

      {/* Left Section */}
{/* Left Section */}
<div
  className="hidden lg:block lg:w-1/2 h-screen bg-no-repeat bg-center bg-cover rounded-r-[80px]"
  style={{ backgroundImage: "url('/camera.png')" }}
/>

      {/* Right Section */}
      <div className="flex w-full lg:w-1/2 items-center justify-center bg-gradient-to-b from-[#131B42] to-[#0C112D] px-4">
        
        <div className="w-full max-w-md bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-8 shadow-xl">
          
          {/* Heading */}
          <h1 className="text-3xl font-extrabold tracking-wider text-center mb-2">
            Shield AI Signup
          </h1>
          {/* Full Name */}
          <div className="mb-4">
            <label className="block mb-2 text-sm">Full Name</label>
            <div className="flex items-center bg-white/10 border border-white/20 rounded-xl px-3">
              <FaUser className="text-gray-400 mr-2" />
              <input
                type="text"
                placeholder="Enter your full name"
                className="w-full bg-transparent py-3 focus:outline-none"
              />
            </div>
          </div>

          {/* Email */}
          <div className="mb-4">
            <label className="block mb-2 text-sm">Email</label>
            <div className="flex items-center bg-white/10 border border-white/20 rounded-xl px-3">
              <FaEnvelope className="text-gray-400 mr-2" />
              <input
                type="email"
                placeholder="e.g matthew.doe@example.com"
                className="w-full bg-transparent py-3 focus:outline-none"
              />
            </div>
          </div>

          {/* Password */}
          <div className="mb-4">
            <label className="block mb-2 text-sm">Password</label>
            <div className="flex items-center bg-white/10 border border-white/20 rounded-xl px-3">
              <FaLock className="text-gray-400 mr-2" />
              <input
                type="password"
                placeholder="Enter your password"
                className="w-full bg-transparent py-3 focus:outline-none"
              />
            </div>
          </div>

          {/* Confirm Password */}
          <div className="mb-6">
            <label className="block mb-2 text-sm">Confirm Password</label>
            <div className="flex items-center bg-white/10 border border-white/20 rounded-xl px-3">
              <FaLock className="text-gray-400 mr-2" />
              <input
                type="password"
                placeholder="Confirm your password"
                className="w-full bg-transparent py-3 focus:outline-none"
              />
            </div>
          </div>

          {/* Signup Button */}
          <button className="w-full py-3 rounded-xl bg-gradient-to-r from-[#091F4E] to-[#1547B4] font-bold text-lg hover:opacity-90 transition">
            Sign Up
          </button>

          {/* Login Redirect */}
          <p className="text-center text-sm mt-6">
            Already have an account?{" "}
            <span className="text-blue-500 cursor-pointer hover:underline">
          <Link to='/login'>
          Login
          </Link>    
            </span>
          </p>

          {/* Social Signup */}
          <div className="flex justify-center gap-6 mt-6">
            <button className="p-3 rounded-full bg-white/10 hover:bg-white/20 transition">
              <FaGoogle size={22} />
            </button>
            <button className="p-3 rounded-full bg-white/10 hover:bg-white/20 transition">
              <FaFacebookF size={22} />
            </button>
          </div>

          {/* Footer */}
          <p className="text-center text-xs text-gray-400 mt-8">
            © 2025 Shield AI — Secure Surveillance System
          </p>
        </div>
      </div>
    </div>
  );
};
