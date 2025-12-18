import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import { LoginPage } from "./pages/Login";
import { SignupPage } from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import Reports from "./pages/Reports";

function App() {
  return (
    <Routes>
      {/* Default Redirect */}
      {/* <Route path="/" element={<Navigate to="/login" replace />} /> */}
         <Route path="/dashboard" element={<Dashboard />} />
         <Route path="/reports" element={<Reports />} />
        
      {/* Auth Routes */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />

      {/* 404 Fallback */}
      <Route path="*" element={<h1 className="text-white text-center mt-20">404 - Page Not Found</h1>} />
    </Routes>
  );
}

export default App;
