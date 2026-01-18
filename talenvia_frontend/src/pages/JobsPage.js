import React, { useEffect, useMemo, useState } from "react";
import PageHeader from "../components/PageHeader";
import { apiGet } from "../services/apiClient";

function JobRow({ job }) {
  return (
    <tr>
      <td>
        <div style={{ fontWeight: 700 }}>{job.title}</div>
        <div style={{ color: "var(--muted)", fontSize: 13 }}>
          {job.company} • {job.type}
        </div>
      </td>
      <td>{job.location}</td>
      <td>
        <span className="Badge BadgePrimary">{job.match}% match</span>
      </td>
      <td style={{ color: "var(--muted)" }}>{job.posted}</td>
    </tr>
  );
}

// PUBLIC_INTERFACE
export default function JobsPage() {
  /** Job search experience with query filters and a results table. */
  const [q, setQ] = useState("");
  const [location, setLocation] = useState("");
  const [loading, setLoading] = useState(false);
  const [jobs, setJobs] = useState([]);

  const fetchJobs = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (q.trim()) params.set("q", q.trim());
      if (location.trim()) params.set("location", location.trim());
      const data = await apiGet(`/jobs${params.toString() ? `?${params.toString()}` : ""}`);
      setJobs(Array.isArray(data) ? data : []);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const summary = useMemo(() => {
    if (loading) return "Searching roles...";
    if (!jobs.length) return "No matches found. Try adjusting filters.";
    return `${jobs.length} role${jobs.length === 1 ? "" : "s"} found`;
  }, [jobs.length, loading]);

  return (
    <div>
      <PageHeader
        title="Job Search"
        subtitle="Find roles that match your profile and skills. Uses API when configured; otherwise falls back to curated mock results."
        right={
          <>
            <span className="Badge">{summary}</span>
            <button className="Btn BtnSecondary" type="button" onClick={() => { setQ(""); setLocation(""); }}>
              Reset
            </button>
          </>
        }
      />

      <div className="Card">
        <div className="Row" style={{ justifyContent: "space-between", gap: 12 }}>
          <div className="Row" style={{ flex: 1 }}>
            <label style={{ display: "flex", flexDirection: "column", gap: 6, flex: 1, minWidth: 240 }}>
              <span style={{ fontSize: 12, color: "var(--muted)" }}>Keyword</span>
              <input
                className="Input"
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="e.g., React, UI Engineer, Design Systems"
                aria-label="Job keyword"
              />
            </label>

            <label style={{ display: "flex", flexDirection: "column", gap: 6, flex: 1, minWidth: 220 }}>
              <span style={{ fontSize: 12, color: "var(--muted)" }}>Location</span>
              <input
                className="Input"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="e.g., Remote, Bengaluru"
                aria-label="Location"
              />
            </label>
          </div>

          <button className="Btn" type="button" onClick={fetchJobs} disabled={loading}>
            {loading ? "Searching..." : "Search"}
          </button>
        </div>
      </div>

      <div className="Card">
        <table className="Table" aria-label="Job results">
          <thead>
            <tr>
              <th>Role</th>
              <th>Location</th>
              <th>Match</th>
              <th>Posted</th>
            </tr>
          </thead>
          <tbody>
            {jobs.map((j) => (
              <JobRow key={j.id} job={j} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
