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

function App() {
  return (
    <Routes>

      {/* Default Redirect */}
      <Route path="/" element={<Navigate to="/login" />} />

      {/* Dashboard Pages */}
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/reports" element={<Reports />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/notifications" element={<NotificationsPage />} />
      <Route path="/settings" element={<Setting />} />

      {/* Auth Pages */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />

      {/* 404 */}
      <Route
        path="*"
        element={
          <h1 className="text-white text-center mt-20">
            404 - Page Not Found
          </h1>
        }
      />

    </Routes>
  );
}

export default App;
