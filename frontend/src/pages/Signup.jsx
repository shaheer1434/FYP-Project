import React, { useState } from "react";
import {
  FaGoogle,
  FaFacebookF,
  FaUser,
  FaEnvelope,
  FaLock,
} from "react-icons/fa";
import { Link, useNavigate } from "react-router";
import { auth } from "../firebase/firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";

export const SignupPage = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");

    if (!fullName || !email || !password || !confirmPassword) {
      setError("Please fill in all fields.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      
      // Update profile with full name
      await updateProfile(user, {
        displayName: fullName
      });

      console.log("User registered:", user);
      localStorage.clear(); // Clear any old data (Saad etc.)
      navigate("/login");
    } catch (err) {
      console.error("Signup error:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

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
        <h1 className="text-2xl font-bold text-center mb-5 tracking-wide">
          Shield AI Signup
        </h1>

        <form onSubmit={handleSignup}>
          {/* Error Message */}
          {error && <p className="text-red-400 text-xs text-center mb-3">{error}</p>}

          {/* Full Name */}
          <div className="mb-3">
            <label className="text-xs mb-1 block">Full Name</label>
            <div className="flex items-center gap-3 bg-white/10 border border-white/20 rounded-xl px-4 py-2.5 focus-within:border-blue-500 transition">
              <FaUser className="text-gray-400" />
              <input
                type="text"
                placeholder="Full name"
                className="w-full bg-transparent outline-none text-sm"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
            </div>
          </div>

          {/* Email */}
          <div className="mb-3">
            <label className="text-xs mb-1 block">Email</label>
            <div className="flex items-center gap-3 bg-white/10 border border-white/20 rounded-xl px-4 py-2.5 focus-within:border-blue-500 transition">
              <FaEnvelope className="text-gray-400" />
              <input
                type="email"
                placeholder="Email address"
                className="w-full bg-transparent outline-none text-sm"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          {/* Confirm Password */}
          <div className="mb-4">
            <label className="text-xs mb-1 block">Confirm Password</label>
            <div className="flex items-center gap-3 bg-white/10 border border-white/20 rounded-xl px-4 py-2.5 focus-within:border-blue-500 transition">
              <FaLock className="text-gray-400" />
              <input
                type="password"
                placeholder="Confirm"
                className="w-full bg-transparent outline-none text-sm"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
          </div>

          {/* Signup Button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2.5 rounded-xl text-base font-semibold
            bg-gradient-to-r from-[#091F4E] to-[#1547B4] cursor-pointer
            hover:opacity-90 transition ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
          >
            {loading ? "Signing up..." : "Sign Up"}
          </button>
        </form>

        {/* Login Redirect */}
        <p className="text-center text-xs mt-4">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-blue-400 hover:underline font-medium"
          >
            Login
          </Link>
        </p>

        {/* Social Buttons */}
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
