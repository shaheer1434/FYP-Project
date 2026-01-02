import React from "react";
import { FaGoogle, FaFacebookF, FaShieldAlt } from "react-icons/fa";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../firebase/firebase";
const Login = () => {

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      console.log(result.user);
      alert("Login Successful");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h2>Login to ShieldAI</h2>
      <button onClick={handleGoogleLogin}>
        Login with Google
      </button>
    </div>
  );
};

export default Login;
export const LoginPage = () => {
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
              placeholder="e.g matthew.doe@example.com"
              className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Password */}
          <div className="mb-3">
            <label className="block mb-2 text-sm">Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Forgot Password */}
          <div className="text-right mb-6">
            <button className="text-sm text-gray-300 hover:text-white">
              Forgot Password?
            </button>
          </div>

          {/* Login Button */}
          <button className="w-full py-3 rounded-xl bg-gradient-to-r from-[#091F4E] to-[#1547B4] font-bold text-lg hover:opacity-90 transition">
            Log In
          </button>

          {/* Signup */}
          <p className="text-center text-sm mt-6">
            Don’t have an account?{" "}
            <span className="text-blue-500 cursor-pointer hover:underline">
              Sign Up
            </span>
          </p>

          {/* Social Login */}
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
