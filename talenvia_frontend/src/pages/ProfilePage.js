import React, { useEffect, useState } from "react";
import PageHeader from "../components/PageHeader";
import { apiGet } from "../services/apiClient";

// PUBLIC_INTERFACE
export default function ProfilePage() {
  /** Profile view/editor. Saves locally for now; ready to connect to backend later. */
  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState(null);
  const [saved, setSaved] = useState(false);

  const load = async () => {
    setLoading(true);
    setSaved(false);
    try {
      const data = await apiGet("/me");
      setProfile(data && typeof data === "object" ? data : null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const update = (patch) => {
    setSaved(false);
    setProfile((p) => ({ ...(p || {}), ...patch }));
  };

  return (
    <div>
      <PageHeader
        title="Profile"
        subtitle="Manage your Talenvia profile. This is a frontend scaffold with mock data until the backend is connected."
        right={
          <>
            {saved ? <span className="Badge BadgePrimary">Saved</span> : <span className="Badge">Draft</span>}
            <button
              className="Btn"
              type="button"
              onClick={() => {
                // Placeholder: would POST to /me in a real backend
                setSaved(true);
              }}
              disabled={!profile || loading}
            >
              Save Changes
            </button>
          </>
        }
      />

      <div className="Card">
        {loading ? (
          <div style={{ color: "var(--muted)" }}>Loading profile...</div>
        ) : !profile ? (
          <div style={{ color: "var(--muted)" }}>No profile data available.</div>
        ) : (
          <div className="Row" style={{ alignItems: "stretch" }}>
            <div style={{ flex: 1, minWidth: 260 }}>
              <div style={{ fontSize: 12, color: "var(--muted)", marginBottom: 6 }}>Full Name</div>
              <input
                className="Input"
                value={profile.fullName || ""}
                onChange={(e) => update({ fullName: e.target.value })}
              />

              <div style={{ height: 12 }} />

              <div style={{ fontSize: 12, color: "var(--muted)", marginBottom: 6 }}>Headline</div>
              <input
                className="Input"
                value={profile.headline || ""}
                onChange={(e) => update({ headline: e.target.value })}
              />

              <div style={{ height: 12 }} />

              <div style={{ fontSize: 12, color: "var(--muted)", marginBottom: 6 }}>Location</div>
              <input
                className="Input"
                value={profile.location || ""}
                onChange={(e) => update({ location: e.target.value })}
              />
            </div>

            <div style={{ flex: 1, minWidth: 260 }}>
              <div style={{ fontSize: 12, color: "var(--muted)", marginBottom: 6 }}>Email</div>
              <input
                className="Input"
                value={profile.email || ""}
                onChange={(e) => update({ email: e.target.value })}
              />

              <div style={{ height: 12 }} />

              <div style={{ fontSize: 12, color: "var(--muted)", marginBottom: 6 }}>About</div>
              <textarea
                className="Input"
                style={{ minHeight: 132, resize: "vertical" }}
                value={profile.about || ""}
                onChange={(e) => update({ about: e.target.value })}
              />
            </div>
          </div>
        )}
      </div>

      <div className="Card">
        <div style={{ fontWeight: 700, marginBottom: 8 }}>Tips</div>
        <ul style={{ margin: 0, color: "var(--muted)", lineHeight: 1.7 }}>
          <li>Keep your headline concise: role + key skills + domain interest.</li>
          <li>List measurable outcomes in your About section (impact, scale, ownership).</li>
          <li>Complete Skills to improve job match scores.</li>
        </ul>
      </div>
    </div>
  );
}
