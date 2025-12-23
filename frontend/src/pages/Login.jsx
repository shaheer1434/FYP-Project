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
      localStorage.setItem("shieldai_user_loggedin", "true");
      navigate("/dashboard");
    } else {
      alert("Invalid email or password");
    }
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-black text-white">
      <div
        className="hidden lg:block lg:w-1/2 h-screen bg-no-repeat bg-center bg-cover rounded-r-[80px]"
        style={{ backgroundImage: "url('/camera.png')" }}
      />

      <div className="flex w-full lg:w-1/2 items-center justify-center bg-gradient-to-b from-[#131B42] to-[#0C112D] px-4">
        <div className="w-full max-w-md bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-8">

          <h1 className="text-3xl font-extrabold text-center mb-2">Shield AI Login</h1>
          <p className="text-center text-sm text-gray-300 mb-8">
            AI based safety & surveillance system
          </p>

          <input
            type="email"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            className="w-full mb-4 px-4 py-3 rounded-xl bg-white/10 border border-white/20"
          />

          <input
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            className="w-full mb-6 px-4 py-3 rounded-xl bg-white/10 border border-white/20"
          />

          <button
            onClick={handleLogin}
            className="w-full py-3 rounded-xl bg-blue-600 font-bold"
          >
            Log In
          </button>

          <p className="text-center text-sm mt-6">
            Don’t have an account? <Link to="/signup" className="text-blue-500">Sign Up</Link>
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
