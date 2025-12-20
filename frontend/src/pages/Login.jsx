import React, { useState } from "react";
import { FaGoogle, FaFacebookF } from "react-icons/fa";
import { useNavigate, Link } from "react-router-dom";

export const LoginPage = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    const user = JSON.parse(localStorage.getItem("shieldai_user"));

    if (!user) {
      alert("No account found. Please signup first.");
      navigate("/signup");
      return;
    }

    if (user.email === email && user.password === password) {
      navigate("/dashboard");
    } else {
      alert("Invalid email or password");
    }
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-black text-white">
      {/* Left */}
      <div
        className="hidden lg:block lg:w-1/2 h-screen bg-no-repeat bg-center bg-cover rounded-r-[80px]"
        style={{ backgroundImage: "url('/camera.png')" }}
      />

      {/* Right */}
      <div className="flex w-full lg:w-1/2 items-center justify-center bg-gradient-to-b from-[#131B42] to-[#0C112D] px-4">
        <div className="w-full max-w-md bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-8 shadow-xl">

          <h1 className="text-3xl font-extrabold text-center mb-2">
            Shield AI Login
          </h1>
          <p className="text-center text-sm text-gray-300 mb-8">
            Welcome back! Please log in to your account
          </p>

          {/* Email */}
          <div className="mb-5">
            <label className="block mb-2 text-sm">Email</label>
            <input
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20"
            />
          </div>

          {/* Password */}
          <div className="mb-6">
            <label className="block mb-2 text-sm">Password</label>
            <input
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20"
            />
          </div>

          {/* Login Button */}
          <button
            onClick={handleLogin}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-[#091F4E] to-[#1547B4] font-bold text-lg"
          >
            Log In
          </button>

          {/* Signup */}
          <p className="text-center text-sm mt-6">
            Don’t have an account?{" "}
            <Link to="/signup" className="text-blue-500 hover:underline">
              Sign Up
            </Link>
          </p>

          {/* Social */}
          <div className="flex justify-center gap-6 mt-6">
            <FaGoogle size={22} />
            <FaFacebookF size={22} />
          </div>

          <p className="text-center text-xs text-gray-400 mt-8">
            © 2025 Shield AI
          </p>
        </div>
      </div>
    </div>
  );
};
