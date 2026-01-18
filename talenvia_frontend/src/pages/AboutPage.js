import React from "react";
import PageHeader from "../components/PageHeader";

// PUBLIC_INTERFACE
export default function AboutPage() {
  /** Informational "About Us" page. */
  return (
    <div>
      <PageHeader
        title="About Us"
        subtitle="Talenvia helps candidates discover opportunities, strengthen skills, and present their best professional story—beautifully."
      />

      <div className="Card">
        <div style={{ fontWeight: 800, fontSize: 16, marginBottom: 8 }}>Our mission</div>
        <div style={{ color: "var(--muted)", lineHeight: 1.8 }}>
          We aim to make job discovery calm, focused, and human. Talenvia brings together job search, profile clarity,
          skills tracking, and mock test practice in one place—so you spend less time juggling tools and more time
          preparing for the roles you want.
        </div>
      </div>

      <div className="Card">
        <div style={{ fontWeight: 800, fontSize: 16, marginBottom: 8 }}>What you can do here</div>
        <ul style={{ margin: 0, color: "var(--muted)", lineHeight: 1.8 }}>
          <li>Search roles with smart matching.</li>
          <li>Maintain a profile that reflects your strengths.</li>
          <li>Track skills and growth areas.</li>
          <li>Practice with mock tests and reminders.</li>
          <li>Stay informed via notifications and settings.</li>
        </ul>
      </div>
    </div>
  );
}
