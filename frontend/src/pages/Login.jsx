import React from "react";
import { FaGoogle, FaFacebookF, FaEnvelope, FaLock } from "react-icons/fa";
import { Link } from "react-router";

export const LoginPage = () => {
  return (
    <div className="relative min-h-screen flex items-center justify-center text-white px-4 overflow-hidden">

      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center scale-105 blur-lg"
        style={{ backgroundImage: "url('/camera.png')" }}
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0C112D]/90 via-[#131B42]/90 to-[#091F4E]/90" />

      {/* Glass Card */}
      <div
        className="relative w-full max-w-xl bg-white/10 backdrop-blur-xl
        border border-white/20 rounded-3xl p-7 shadow-2xl"
      >
        {/* Heading */}
        <h1 className="text-2xl font-bold text-center mb-2 tracking-wide">
          Shield AI Login
        </h1>
        <p className="text-center text-xs text-gray-300 mb-5">
          Welcome back! Please log in to your account
        </p>

        {/* Email */}
        <div className="mb-4">
          <label className="text-xs mb-1 block">Email</label>
          <div className="flex items-center gap-3 bg-white/10 border border-white/20 rounded-xl px-4 py-2.5 focus-within:border-blue-500 transition">
            <FaEnvelope className="text-gray-400" />
            <input
              type="email"
              placeholder="Email address"
              className="w-full bg-transparent outline-none text-sm"
            />
          </div>
        </div>

        {/* Password */}
        <div className="mb-3">
          <label className="text-xs mb-1 block">Password</label>
          <div className="flex items-center gap-3 bg-white/10 border border-white/20 rounded-xl px-4 py-2.5 focus-within:border-blue-500 transition">
            <FaLock className="text-gray-400" />
            <input
              type="password"
              placeholder="Password"
              className="w-full bg-transparent outline-none text-sm"
            />
          </div>
        </div>

        {/* Forgot Password */}
        <div className="text-right mb-4">
          <button className="text-xs text-blue-400 hover:underline">
            Forgot Password?
          </button>
        </div>

        {/* Login Button */}
        <button
          className="w-full py-2.5 rounded-xl text-base font-semibold
          bg-gradient-to-r from-[#091F4E] to-[#1547B4]
          hover:opacity-90 transition"
        >
          Log In
        </button>

        {/* Signup Redirect */}
        <p className="text-center text-xs mt-4">
          Don’t have an account?{" "}
          <Link
            to="/signup"
            className="text-blue-400 hover:underline font-medium"
          >
            Sign Up
          </Link>
        </p>

        {/* Social Login */}
        <div className="flex justify-center gap-4 mt-4">
          <button className="p-2.5 rounded-full bg-white/10 hover:bg-white/20 transition">
            <FaGoogle size={18} />
          </button>
          <button className="p-2.5 rounded-full bg-white/10 hover:bg-white/20 transition">
            <FaFacebookF size={18} />
          </button>
        </div>

        {/* Footer */}
        <p className="text-center text-[11px] text-gray-400 mt-5">
          © 2025 Shield AI — Secure Surveillance System
        </p>
      </div>
    </div>
  );
};