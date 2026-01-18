import React from "react";
import PageHeader from "../components/PageHeader";

function Step({ n, title, children }) {
  return (
    <div className="Card">
      <div className="Row" style={{ alignItems: "center", gap: 10, marginBottom: 8 }}>
        <span className="Badge BadgePrimary">Step {n}</span>
        <div style={{ fontWeight: 800, fontSize: 16 }}>{title}</div>
      </div>
      <div style={{ color: "var(--muted)", lineHeight: 1.8 }}>{children}</div>
    </div>
  );
}

// PUBLIC_INTERFACE
export default function HowItWorksPage() {
  /** Informational page describing platform flow. */
  return (
    <div>
      <PageHeader
        title="How Talenvia Works"
        subtitle="A simple flow: set your signal, discover jobs, practice, and iterate—while Talenvia keeps everything organized."
      />

      <Step n={1} title="Build your profile">
        Add a clear headline, location, and a concise “About” section. This becomes the foundation for job matching and
        recommendations.
      </Step>

      <Step n={2} title="Track your skills">
        Keep skills current with proficiency levels. Talenvia uses this to surface relevant roles and mock tests.
      </Step>

      <Step n={3} title="Search and shortlist roles">
        Use filters and explore matches. In a future backend integration, you’ll be able to save roles and track
        applications.
      </Step>

      <Step n={4} title="Practice with mock tests">
        Strengthen interview readiness. Tests are short by design, focused on consistent improvement.
      </Step>

      <Step n={5} title="Stay up-to-date">
        Notifications and settings help you stay informed without being overwhelmed.
      </Step>
    </div>
  );
}
