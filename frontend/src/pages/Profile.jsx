import React, { useEffect, useState } from "react";
import PageLayout from "../components/PageLayout";
import { auth } from "../firebase/firebase";
import { FaUserCircle, FaEnvelope, FaShieldAlt, FaCalendarAlt } from "react-icons/fa";

const Profile = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  return (
    <PageLayout>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-8 tracking-tight flex items-center gap-3">
          <FaUserCircle className="text-blue-500" />
          Admin Profile
        </h1>

        {user ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Profile Card */}
            <div className="md:col-span-1 bg-white/5 backdrop-blur-md border border-white/10 p-8 rounded-3xl flex flex-col items-center text-center shadow-2xl">
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-600 to-indigo-700 flex items-center justify-center border-4 border-white/10 mb-4 shadow-lg">
                <span className="text-3xl font-bold text-white uppercase">
                  {user.displayName ? user.displayName[0] : user.email[0]}
                </span>
              </div>
              <h2 className="text-xl font-bold text-white mb-1">{user.displayName || "Admin User"}</h2>
              <p className="text-sm text-blue-400 font-medium">System Administrator</p>
              
              <div className="mt-8 w-full space-y-3">
                <div className="flex items-center gap-3 bg-white/5 p-3 rounded-2xl border border-white/5">
                  <FaShieldAlt className="text-blue-400" />
                  <span className="text-xs font-semibold uppercase tracking-wider text-gray-400">Status: Active</span>
                </div>
              </div>
            </div>

            {/* Details Card */}
            <div className="md:col-span-2 bg-white/5 backdrop-blur-md border border-white/10 p-8 rounded-3xl shadow-2xl">
              <h3 className="text-lg font-bold text-white mb-6 border-b border-white/10 pb-4">Personal Information</h3>
              
              <div className="space-y-6">
                <div>
                  <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest block mb-2">Display Name</label>
                  <div className="flex items-center gap-4 text-gray-200 bg-white/5 p-4 rounded-2xl border border-white/5">
                    <FaUserCircle className="text-blue-400/50" />
                    <p className="font-medium">{user.displayName || "Not set"}</p>
                  </div>
                </div>

                <div>
                  <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest block mb-2">Email Address</label>
                  <div className="flex items-center gap-4 text-gray-200 bg-white/5 p-4 rounded-2xl border border-white/5">
                    <FaEnvelope className="text-blue-400/50" />
                    <p className="font-medium">{user.email}</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest block mb-2">Role</label>
                    <div className="flex items-center gap-4 text-gray-200 bg-white/5 p-4 rounded-2xl border border-white/5">
                      <FaShieldAlt className="text-blue-400/50" />
                      <p className="font-medium">Administrator</p>
                    </div>
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest block mb-2">Last Login</label>
                    <div className="flex items-center gap-4 text-gray-200 bg-white/5 p-4 rounded-2xl border border-white/5">
                      <FaCalendarAlt className="text-blue-400/50" />
                      <p className="font-medium">{user.metadata.lastSignInTime ? new Date(user.metadata.lastSignInTime).toLocaleDateString() : "Today"}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 bg-white/5 rounded-3xl border border-dashed border-white/10">
            <FaUserCircle size={48} className="text-gray-600 mb-4" />
            <p className="text-gray-400 font-medium">Loading user session...</p>
          </div>
        )}
      </div>
    </PageLayout>
  );
};

export default Profile;

