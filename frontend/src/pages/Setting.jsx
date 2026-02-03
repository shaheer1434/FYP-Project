import React, { useState, useEffect } from "react";
import PageLayout from "../components/PageLayout";
import axios from "axios";
import { FaCog, FaBell, FaLock, FaUserAlt, FaAdjust, FaShieldAlt } from "react-icons/fa";
import { auth } from "../firebase/firebase";
import { updateProfile, sendPasswordResetEmail } from "firebase/auth";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Setting = () => {
  const [activeTab, setActiveTab] = useState("general");
  const [user, setUser] = useState(auth.currentUser);
  
  // Settings State
  const [displayName, setDisplayName] = useState(user?.displayName || "");

  const [sensitivity, setSensitivity] = useState(75);
  const [quality, setQuality] = useState("Full HD");
  const [autoSave, setAutoSave] = useState(true);
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    sound: true,
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((curr) => setUser(curr));
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((curr) => setUser(curr));
    fetchSettings();
    return () => unsubscribe();
  }, []);

  const fetchSettings = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/settings");
      if (res.data) {
        setSensitivity(res.data.sensitivity);
        setQuality(res.data.quality);
        setAutoSave(res.data.autoSave);
        setNotifications(res.data.notifications);
      }
    } catch (err) {
      console.error("Error loading settings:", err);
    }
  };

  const saveSettings = async (data) => {
    try {
      await axios.put("http://localhost:5000/api/settings", data);
      // toast.success("Settings saved"); // Optional: reduce noise
    } catch (err) {
      toast.error("Failed to save settings");
    }
  };

  // Handlers
  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await updateProfile(auth.currentUser, { displayName });
      // Update localStorage as well
      const localData = JSON.parse(localStorage.getItem("shieldai_user") || "{}");
      localData.displayName = displayName;
      localStorage.setItem("shieldai_user", JSON.stringify(localData));
      toast.success("Profile updated successfully!");
    } catch (err) {
      toast.error("Failed to update profile: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordReset = async () => {
    try {
      await sendPasswordResetEmail(auth, user.email);
      toast.info("Password reset link sent to your email!");
    } catch (err) {
      toast.error("Error: " + err.message);
    }
  };

  const toggleNotification = (key) => {
    const newVal = !notifications[key];
    const updatedNotify = { ...notifications, [key]: newVal };
    setNotifications(updatedNotify);
    saveSettings({ sensitivity, quality, autoSave, notifications: updatedNotify });
  };

  const toggleAutoSave = () => {
    const newVal = !autoSave;
    setAutoSave(newVal);
    saveSettings({ sensitivity, quality, autoSave: newVal, notifications });
  };

  const handleSensitivityChange = (val) => {
    setSensitivity(val);
  };
  
  const saveSensitivity = () => {
     saveSettings({ sensitivity, quality, autoSave, notifications });
  };

  const handleQualityChange = (val) => {
    setQuality(val);
    saveSettings({ sensitivity, quality: val, autoSave, notifications });
  };

  const sections = [
    { id: "general", label: "General", icon: <FaCog /> },
    { id: "account", label: "Account", icon: <FaUserAlt /> },
    { id: "notifications", label: "Notifications", icon: <FaBell /> },
    { id: "security", label: "Security", icon: <FaLock /> },
  ];

  return (
    <PageLayout>
      <ToastContainer position="top-right" theme="dark" />
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
          <FaCog className="text-blue-500" />
          System Settings
        </h1>
        <p className="text-gray-400 text-sm mb-8">Manage your camera preferences and account security</p>

        <div className="flex flex-col md:flex-row gap-8">
          <div className="md:w-64 space-y-2">
            {sections.map((s) => (
              <button
                key={s.id}
                onClick={() => setActiveTab(s.id)}
                className={`w-full flex items-center gap-3 px-5 py-4 rounded-2xl transition-all duration-300 ${
                  activeTab === s.id
                    ? "bg-blue-600 text-white shadow-lg shadow-blue-500/20"
                    : "text-gray-400 hover:bg-white/5 hover:text-white"
                }`}
              >
                {s.icon}
                <span className="font-medium">{s.label}</span>
              </button>
            ))}
          </div>

          <div className="flex-1 bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-xl shadow-2xl">
            {activeTab === "general" && (
              <div className="space-y-8 animate-fadeIn">
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                  <FaAdjust className="text-blue-400" /> System Preferences
                </h3>
                <div className="space-y-6">
                    <SettingItem 
                    title="Detection Sensitivity" 
                    desc={`Threshold: ${sensitivity}%`}
                    control={
                      <input 
                        type="range" 
                        value={sensitivity}
                        onChange={(e) => handleSensitivityChange(e.target.value)}
                        onMouseUp={saveSensitivity}
                        onTouchEnd={saveSensitivity}
                        className="w-full accent-blue-500" 
                      />
                    }
                  />
                  <SettingItem 
                    title="Video Feed Quality" 
                    desc="Select the streaming resolution for your cameras."
                    control={
                      <select 
                        value={quality}
                        onChange={(e) => handleQualityChange(e.target.value)}
                        className="bg-white/10 text-white border border-white/10 rounded-xl px-3 py-1.5 outline-none text-xs font-bold focus:border-blue-500"
                      >
                        <option value="4K">4K Ultra HD</option>
                        <option value="Full HD">Full HD (1080p)</option>
                        <option value="HD">HD (720p)</option>
                        <option value="SD">Standard (480p)</option>
                      </select>
                    }
                  />
                  <ToggleSetting 
                    title="Auto-Save Recordings" 
                    desc="Automatically save footage when an incident occurs." 
                    checked={autoSave} 
                    onClick={toggleAutoSave}
                  />
                </div>
              </div>
            )}

            {activeTab === "account" && (
              <form onSubmit={handleUpdateProfile} className="space-y-8">
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                  <FaUserAlt className="text-blue-400" /> Account Settings
                </h3>
                <div className="space-y-6">
                  <div>
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-widest block mb-2">Display Name</label>
                    <input 
                      type="text" 
                      value={displayName}
                      onChange={(e) => setDisplayName(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-blue-500 transition" 
                      placeholder="Your Name" 
                    />
                  </div>
                  <button 
                    type="submit"
                    disabled={loading}
                    className="bg-blue-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-blue-700 transition disabled:opacity-50"
                  >
                    {loading ? "Updating..." : "Save Changes"}
                  </button>
                </div>
              </form>
            )}

            {activeTab === "notifications" && (
              <div className="space-y-8">
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                  <FaBell className="text-blue-400" /> Notifications
                </h3>
                <div className="space-y-6">
                  <ToggleSetting 
                    title="Email Alerts" 
                    desc="Receive instant email reports." 
                    checked={notifications.email} 
                    onClick={() => toggleNotification("email")}
                  />
                  <ToggleSetting 
                    title="Push Notifications" 
                    desc="Get real-time browser alerts." 
                    checked={notifications.push} 
                    onClick={() => toggleNotification("push")}
                  />
                  <ToggleSetting 
                    title="Sound Alerts" 
                    desc="Play alarm sound on detection." 
                    checked={notifications.sound} 
                    onClick={() => toggleNotification("sound")}
                  />
                </div>
              </div>
            )}

            {activeTab === "security" && (
              <div className="space-y-8">
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                  <FaShieldAlt className="text-blue-400" /> Security & Privacy
                </h3>
                <div className="space-y-6">
                  <button 
                    onClick={handlePasswordReset}
                    className="w-full text-left p-5 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 transition"
                  >
                    <p className="font-bold">Reset Password</p>
                    <p className="text-xs text-gray-400 mt-1">Send a password reset link to {user?.email}.</p>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

const SettingItem = ({ title, desc, control }) => (
  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 bg-white/2 rounded-2xl border border-white/5">
    <div>
      <p className="font-bold text-white">{title}</p>
      <p className="text-xs text-gray-400 mt-0.5">{desc}</p>
    </div>
    <div className="min-w-[120px] flex justify-end">{control}</div>
  </div>
);

const ToggleSetting = ({ title, desc, checked, onClick }) => (
  <div onClick={onClick} className="flex items-center justify-between gap-4 p-4 bg-white/2 rounded-2xl border border-white/5 cursor-pointer hover:bg-white/5 transition">
    <div>
      <p className="font-bold text-white">{title}</p>
      <p className="text-xs text-gray-400 mt-0.5">{desc}</p>
    </div>
    <div className={`w-12 h-6 rounded-full p-1 transition-colors duration-300 ${checked ? 'bg-blue-600' : 'bg-gray-700'}`}>
      <div className={`w-4 h-4 bg-white rounded-full transition-transform duration-300 ${checked ? 'translate-x-6' : ''}`}></div>
    </div>
  </div>
);

export default Setting;
