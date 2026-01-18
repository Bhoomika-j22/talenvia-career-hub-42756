import React, { useEffect, useState } from "react";
import PageHeader from "../components/PageHeader";
import { apiGet, apiPost } from "../services/apiClient";
import { getEnv } from "../config/env";

function Toggle({ label, checked, onChange, description }) {
  return (
    <div className="Row" style={{ justifyContent: "space-between", alignItems: "flex-start" }}>
      <div style={{ minWidth: 0 }}>
        <div style={{ fontWeight: 700 }}>{label}</div>
        {description ? <div style={{ color: "var(--muted)", marginTop: 6, lineHeight: 1.5 }}>{description}</div> : null}
      </div>
      <label style={{ display: "inline-flex", alignItems: "center", gap: 10 }}>
        <span style={{ fontSize: 12, color: "var(--muted)" }}>{checked ? "On" : "Off"}</span>
        <input type="checkbox" checked={checked} onChange={(e) => onChange(e.target.checked)} aria-label={label} />
      </label>
    </div>
  );
}

// PUBLIC_INTERFACE
export default function SettingsPage() {
  /** Settings scaffold: preferences and debug info. */
  const env = getEnv();
  const [loading, setLoading] = useState(false);
  const [settings, setSettings] = useState(null);
  const [saved, setSaved] = useState(false);

  const load = async () => {
    setLoading(true);
    setSaved(false);
    try {
      const data = await apiGet("/settings");
      setSettings(data && typeof data === "object" ? data : null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const patch = (p) => {
    setSaved(false);
    setSettings((s) => ({ ...(s || {}), ...p }));
  };

  const save = async () => {
    setLoading(true);
    try {
      const data = await apiPost("/settings", settings || {});
      setSettings(data && typeof data === "object" ? data : settings);
      setSaved(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <PageHeader
        title="Settings"
        subtitle="Personalize your Talenvia experience. Values save to a mock API for now."
        right={
          <>
            {saved ? <span className="Badge BadgePrimary">Saved</span> : <span className="Badge">Not saved</span>}
            <button className="Btn" type="button" onClick={save} disabled={loading || !settings}>
              Save
            </button>
          </>
        }
      />

      <div className="Card">
        {loading && !settings ? (
          <div style={{ color: "var(--muted)" }}>Loading settings...</div>
        ) : !settings ? (
          <div style={{ color: "var(--muted)" }}>No settings found.</div>
        ) : (
          <div style={{ display: "grid", gap: 14 }}>
            <Toggle
              label="Email notifications"
              checked={!!settings.notificationsEmail}
              onChange={(v) => patch({ notificationsEmail: v })}
              description="Receive important job updates and reminders via email."
            />
            <Toggle
              label="Push notifications"
              checked={!!settings.notificationsPush}
              onChange={(v) => patch({ notificationsPush: v })}
              description="Enable browser push notifications (placeholder)."
            />
            <Toggle
              label="Job alerts"
              checked={!!settings.jobAlerts}
              onChange={(v) => patch({ jobAlerts: v })}
              description="Get alerts when new roles match your skills."
            />

            <div className="Row" style={{ justifyContent: "space-between" }}>
              <div>
                <div style={{ fontWeight: 700 }}>Privacy preset</div>
                <div style={{ color: "var(--muted)", marginTop: 6 }}>Controls how your profile is shared (mock).</div>
              </div>
              <select
                className="Select"
                value={settings.privacy || "Standard"}
                onChange={(e) => patch({ privacy: e.target.value })}
                aria-label="Privacy preset"
              >
                <option>Standard</option>
                <option>Private</option>
                <option>Public</option>
              </select>
            </div>
          </div>
        )}
      </div>

      <div className="Card">
        <div style={{ fontWeight: 700, marginBottom: 10 }}>Environment</div>
        <table className="Table" aria-label="Environment table">
          <thead>
            <tr>
              <th>Key</th>
              <th>Value</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>REACT_APP_API_BASE</td><td style={{ color: "var(--muted)" }}>{env.apiBase || "—"}</td></tr>
            <tr><td>REACT_APP_BACKEND_URL</td><td style={{ color: "var(--muted)" }}>{env.backendUrl || "—"}</td></tr>
            <tr><td>REACT_APP_WS_URL</td><td style={{ color: "var(--muted)" }}>{env.wsUrl || "—"}</td></tr>
            <tr><td>Environment</td><td style={{ color: "var(--muted)" }}>{env.nodeEnv}</td></tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
