import React, { useEffect, useMemo, useState } from "react";
import PageHeader from "../components/PageHeader";
import { apiGet, apiPost } from "../services/apiClient";

function NotificationItem({ n }) {
  return (
    <div
      className="Card"
      style={{
        borderColor: n.unread ? "rgba(139, 92, 246, 0.25)" : "var(--border)",
        background: n.unread ? "rgba(255, 255, 255, 0.92)" : "rgba(255, 255, 255, 0.8)",
      }}
    >
      <div className="Row" style={{ justifyContent: "space-between", alignItems: "flex-start" }}>
        <div style={{ minWidth: 0 }}>
          <div className="Row" style={{ gap: 8 }}>
            <div style={{ fontWeight: 800 }}>{n.title}</div>
            {n.unread ? <span className="Badge BadgePrimary">New</span> : <span className="Badge">Read</span>}
          </div>
          <div style={{ color: "var(--muted)", marginTop: 8, lineHeight: 1.5 }}>{n.detail}</div>
        </div>
        <div style={{ color: "var(--muted)", fontSize: 12, whiteSpace: "nowrap" }}>{n.time}</div>
      </div>
    </div>
  );
}

// PUBLIC_INTERFACE
export default function NotificationsPage() {
  /** Notifications center scaffold (works with mock API). */
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);

  const load = async () => {
    setLoading(true);
    try {
      const data = await apiGet("/notifications");
      setItems(Array.isArray(data) ? data : []);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const unreadCount = useMemo(() => items.filter((x) => x.unread).length, [items]);

  const markAllRead = async () => {
    setLoading(true);
    try {
      const data = await apiPost("/notifications/mark-all-read", {});
      setItems(Array.isArray(data) ? data : items);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <PageHeader
        title="Notifications"
        subtitle="Job updates, test reminders, and important platform announcements."
        right={
          <>
            <span className="Badge">{unreadCount} unread</span>
            <button className="Btn" type="button" onClick={markAllRead} disabled={loading || unreadCount === 0}>
              Mark all read
            </button>
          </>
        }
      />

      {loading ? (
        <div className="Card" style={{ color: "var(--muted)" }}>Loading notifications...</div>
      ) : items.length ? (
        <div>
          {items.map((n) => (
            <NotificationItem key={n.id} n={n} />
          ))}
        </div>
      ) : (
        <div className="Card" style={{ color: "var(--muted)" }}>No notifications.</div>
      )}
    </div>
  );
}
