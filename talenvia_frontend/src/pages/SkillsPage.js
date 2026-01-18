import React, { useEffect, useState } from "react";
import PageHeader from "../components/PageHeader";
import { apiGet, apiPost } from "../services/apiClient";

// PUBLIC_INTERFACE
export default function SkillsPage() {
  /** Skills management: view and add skills (mock API). */
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [level, setLevel] = useState("Intermediate");

  const load = async () => {
    setLoading(true);
    try {
      const data = await apiGet("/skills");
      setSkills(Array.isArray(data) ? data : []);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const add = async () => {
    if (!name.trim()) return;
    setLoading(true);
    try {
      const data = await apiPost("/skills", { name: name.trim(), level });
      setSkills(Array.isArray(data) ? data : skills);
      setName("");
      setLevel("Intermediate");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <PageHeader
        title="Skills"
        subtitle="Track your skills and proficiency so Talenvia can tailor job matches and mock tests."
        right={<span className="Badge">{skills.length} skill{skills.length === 1 ? "" : "s"}</span>}
      />

      <div className="Card">
        <div className="Row" style={{ justifyContent: "space-between", gap: 12 }}>
          <div className="Row" style={{ flex: 1 }}>
            <label style={{ display: "flex", flexDirection: "column", gap: 6, flex: 1, minWidth: 240 }}>
              <span style={{ fontSize: 12, color: "var(--muted)" }}>Skill</span>
              <input
                className="Input"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g., React, SQL, Communication"
              />
            </label>

            <label style={{ display: "flex", flexDirection: "column", gap: 6, minWidth: 220 }}>
              <span style={{ fontSize: 12, color: "var(--muted)" }}>Level</span>
              <select className="Select" value={level} onChange={(e) => setLevel(e.target.value)}>
                <option>Beginner</option>
                <option>Intermediate</option>
                <option>Advanced</option>
              </select>
            </label>
          </div>

          <button className="Btn" type="button" onClick={add} disabled={loading || !name.trim()}>
            Add Skill
          </button>
        </div>
      </div>

      <div className="Card">
        {loading ? (
          <div style={{ color: "var(--muted)" }}>Loading...</div>
        ) : (
          <table className="Table" aria-label="Skills table">
            <thead>
              <tr>
                <th>Skill</th>
                <th>Level</th>
              </tr>
            </thead>
            <tbody>
              {skills.map((s) => (
                <tr key={s.id}>
                  <td style={{ fontWeight: 700 }}>{s.name}</td>
                  <td>
                    <span className="Badge BadgePrimary">{s.level}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
