import React, { useState } from "react";
import {
  FaGoogle,
  FaFacebookF,
  FaUser,
  FaEnvelope,
  FaLock,
} from "react-icons/fa";
<<<<<<< HEAD
import { Link } from "react-router";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/firebase";

const Signup = () => {
  const signup = async () => {
    await createUserWithEmailAndPassword(
      auth,
      "test@email.com",
      "password123"
    );
    alert("User Created");
  };

  return <button onClick={signup}>Sign Up</button>;
};

export default Signup;
=======
import { useNavigate, Link } from "react-router-dom";
>>>>>>> 794af7b01a3f7c8bc417e1d60d406945f700b0b0

export const SignupPage = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleSignup = () => {
    localStorage.setItem(
      "shieldai_user",
      JSON.stringify({
        name: formData.name,
        email: formData.email,
        password: formData.password,
        role: "Admin",
      })
    );

    navigate("/login");
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

          <h1 className="text-3xl font-extrabold text-center mb-6">
            Shield AI Signup
          </h1>

          {/* Name */}
          <div className="mb-4">
            <div className="flex items-center bg-white/10 rounded-xl px-3">
              <FaUser className="mr-2" />
              <input
                type="text"
                placeholder="Full Name"
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="w-full bg-transparent py-3 outline-none"
              />
            </div>
          </div>

          {/* Email */}
          <div className="mb-4">
            <div className="flex items-center bg-white/10 rounded-xl px-3">
              <FaEnvelope className="mr-2" />
              <input
                type="email"
                placeholder="Email"
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="w-full bg-transparent py-3 outline-none"
              />
            </div>
          </div>

          {/* Password */}
          <div className="mb-6">
            <div className="flex items-center bg-white/10 rounded-xl px-3">
              <FaLock className="mr-2" />
              <input
                type="password"
                placeholder="Password"
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                className="w-full bg-transparent py-3 outline-none"
              />
            </div>
          </div>

          <button
            onClick={handleSignup}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-[#091F4E] to-[#1547B4] font-bold text-lg"
          >
            Sign Up
          </button>

          <p className="text-center text-sm mt-6">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-500 hover:underline">
              Login
            </Link>
          </p>

          <div className="flex justify-center gap-6 mt-6">
            <FaGoogle size={22} />
            <FaFacebookF size={22} />
          </div>
        </div>
      </div>
    </div>
  );
};
