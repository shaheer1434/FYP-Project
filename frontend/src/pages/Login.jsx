import React, { useState } from "react";
import { FaGoogle, FaFacebookF, FaEnvelope, FaLock } from "react-icons/fa";
import { Link, useNavigate } from "react-router";
import { auth } from "../firebase/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

export const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Please fill in all fields.");
      return;
    }

    setLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log("Logged in:", userCredential.user);
      
      localStorage.clear();
      
      // Store user info in localStorage
      const userData = {
        uid: userCredential.user.uid,
        email: userCredential.user.email,
        displayName: userCredential.user.displayName,
      };
      
      localStorage.setItem("shieldai_user", JSON.stringify(userData));
      localStorage.setItem("shieldai_user_loggedin", "true");
      
      navigate("/dashboard");
    } catch (err) {
      console.error("Login error:", err);
      setError("Invalid email or password.");
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
        <h1 className="text-2xl font-bold text-center mb-2 tracking-wide">
          Shield AI Login
        </h1>
        <p className="text-center text-xs text-gray-300 mb-5">
          Welcome back! Please log in to your account
        </p>

        <form onSubmit={handleLogin}>
          {/* Error Message */}
          {error && <p className="text-red-400 text-xs text-center mb-3">{error}</p>}

          {/* Email */}
          <div className="mb-4">
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

          {/* Forgot Password */}
          <div className="text-right mb-4">
            <button type="button" className="text-xs text-blue-400 hover:underline">
              Forgot Password?
            </button>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2.5 rounded-xl text-base font-semibold
            bg-gradient-to-r from-[#091F4E] to-[#1547B4] cursor-pointer
            hover:opacity-90 transition ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
          >
            {loading ? "Logging in..." : "Log In"}
          </button>
        </form>

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
