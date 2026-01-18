import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import AppLayout from "./components/AppLayout";
import JobsPage from "./pages/JobsPage";
import ProfilePage from "./pages/ProfilePage";
import SkillsPage from "./pages/SkillsPage";
import MockTestsPage from "./pages/MockTestsPage";
import NotificationsPage from "./pages/NotificationsPage";
import SettingsPage from "./pages/SettingsPage";
import AboutPage from "./pages/AboutPage";
import HowItWorksPage from "./pages/HowItWorksPage";
import HomePage from "./pages/HomePage";
import "./App.css";

// PUBLIC_INTERFACE
function App() {
  /** Talenvia application root: defines routes and primary shell layout. */
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/jobs" element={<JobsPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/skills" element={<SkillsPage />} />
        <Route path="/mock-tests" element={<MockTestsPage />} />
        <Route path="/notifications" element={<NotificationsPage />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/how-it-works" element={<HowItWorksPage />} />

        {/* Catch-all */}
        <Route path="*" element={<Navigate to="/jobs" replace />} />
      </Route>
    </Routes>
  );
}

export default App;
