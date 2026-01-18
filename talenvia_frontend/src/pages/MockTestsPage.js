import React, { useEffect, useState } from "react";
import PageHeader from "../components/PageHeader";
import { apiGet, apiPost } from "../services/apiClient";

function TestCard({ test, onStart, starting }) {
  return (
    <div className="Card">
      <div className="Row" style={{ justifyContent: "space-between" }}>
        <div>
          <div style={{ fontWeight: 800, fontSize: 16 }}>{test.name}</div>
          <div style={{ color: "var(--muted)", marginTop: 6, fontSize: 13 }}>
            {test.questions} questions • {test.durationMin} min • <span className="Badge BadgePrimary">{test.level}</span>
          </div>
        </div>
        <button className="Btn" type="button" onClick={() => onStart(test.id)} disabled={starting}>
          {starting ? "Starting..." : "Start"}
        </button>
      </div>
    </div>
  );
}

// PUBLIC_INTERFACE
export default function MockTestsPage() {
  /** Mock tests module scaffold: list available tests and allow "start" action. */
  const [tests, setTests] = useState([]);
  const [startingId, setStartingId] = useState("");
  const [toast, setToast] = useState("");
  const [loading, setLoading] = useState(false);

  const load = async () => {
    setLoading(true);
    try {
      const data = await apiGet("/tests");
      setTests(Array.isArray(data) ? data : []);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const start = async (testId) => {
    setStartingId(testId);
    setToast("");
    try {
      const res = await apiPost("/tests/start", { testId });
      setToast(res?.started ? `Started: ${res?.test?.name || "Test"}` : "Unable to start test");
    } finally {
      setStartingId("");
      setTimeout(() => setToast(""), 2500);
    }
  };

  return (
    <div>
      <PageHeader
        title="Mock Tests"
        subtitle="Practice with short assessments to sharpen skills and improve your job match signal."
        right={toast ? <span className="Badge BadgePrimary">{toast}</span> : <span className="Badge">{tests.length} available</span>}
      />

      {loading ? (
        <div className="Card" style={{ color: "var(--muted)" }}>Loading mock tests...</div>
      ) : (
        <div>
          {tests.map((t) => (
            <TestCard key={t.id} test={t} onStart={start} starting={startingId === t.id} />
          ))}
        </div>
      )}

      <div className="Card">
        <div style={{ fontWeight: 700, marginBottom: 8 }}>Coming next</div>
        <div style={{ color: "var(--muted)", lineHeight: 1.7 }}>
          Timed sessions, question review, score history, and role-based test recommendations.
        </div>
      </div>
    </div>
  );
}
