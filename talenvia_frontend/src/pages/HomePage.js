import React from "react";
import { Link } from "react-router-dom";
import PageHeader from "../components/PageHeader";

// PUBLIC_INTERFACE
export default function HomePage() {
  /** Lightweight landing page / dashboard entry. */
  return (
    <div>
      <PageHeader
        title="Welcome to Talenvia"
        subtitle="An elegant career hub to search jobs, manage your profile and skills, practice mock tests, and stay notified."
        right={
          <Link to="/jobs" className="Btn" role="button" aria-label="Go to Job Search">
            Explore Jobs
          </Link>
        }
      />

      <div className="Card">
        <div className="Row" style={{ gap: 10 }}>
          <span className="Badge BadgePrimary">Royal Purple</span>
          <span className="Badge">Elegant UI</span>
          <span className="Badge">Mock-data ready</span>
        </div>

        <div style={{ height: 12 }} />

        <div style={{ color: "var(--muted)", lineHeight: 1.8 }}>
          This preview uses mock data by default. If you configure <strong>REACT_APP_API_BASE</strong> (or{" "}
          <strong>REACT_APP_BACKEND_URL</strong>) to point to a backend, the app will automatically try real API calls and
          gracefully fall back to mocks when unavailable.
        </div>

        <div style={{ height: 14 }} />

        <div className="Row">
          <Link className="Btn BtnSecondary" to="/how-it-works" role="button">
            How it Works
          </Link>
          <Link className="Btn BtnSecondary" to="/about" role="button">
            About Us
          </Link>
        </div>
      </div>
    </div>
  );
}
