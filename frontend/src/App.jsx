import { Routes, Route, Navigate } from "react-router-dom";
import { LoginPage } from "./pages/Login";
import { SignupPage } from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import Reports from "./pages/Reports";
import About from "./pages/About";
import Contact from "./pages/Contact";
import NotificationsPage from "./pages/Notifications";
import Setting from "./pages/Setting";
import IncidentDetails from "./pages/IncidentDetails";

const isLoggedIn = () => {
  return localStorage.getItem("shieldai_user_loggedin") === "true";
};

const PrivateRoute = ({ children }) => {
  return isLoggedIn() ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <Routes>

      {/* Default Redirect */}
      <Route path="/" element={<Navigate to="/login" />} />

      {/* Protected Dashboard Pages */}
      <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
      <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
      <Route path="/reports" element={<PrivateRoute><Reports /></PrivateRoute>} />
      <Route path="/notifications" element={<PrivateRoute><NotificationsPage /></PrivateRoute>} />
      <Route path="/settings" element={<PrivateRoute><Setting /></PrivateRoute>} />
      <Route path="/incident/:id" element={<PrivateRoute><IncidentDetails /></PrivateRoute>} />

      {/* Public Pages */}
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />

      {/* Auth Pages */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />

      {/* 404 */}
      <Route
        path="*"
        element={<h1 className="text-white text-center mt-20">404 - Page Not Found</h1>}
      />

    </Routes>
  );
}

export default App;
