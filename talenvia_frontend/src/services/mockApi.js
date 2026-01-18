/**
 * In-memory mock API layer used when backend isn't available.
 * Keep endpoints stable so switching to real backend later is simple.
 */

const mock = {
  me: {
    fullName: "Aarav Mehta",
    headline: "Frontend Engineer • React • UI/UX",
    location: "Bengaluru, IN",
    email: "aarav@example.com",
    about:
      "Building elegant interfaces with accessibility and performance in mind. Exploring career growth with Talenvia.",
  },
  skills: [
    { id: "s1", name: "React", level: "Advanced" },
    { id: "s2", name: "TypeScript", level: "Intermediate" },
    { id: "s3", name: "CSS", level: "Advanced" },
    { id: "s4", name: "System Design", level: "Intermediate" },
  ],
  jobs: [
    {
      id: "j1",
      title: "Frontend Engineer",
      company: "PurpleLabs",
      location: "Remote",
      type: "Full-time",
      posted: "2 days ago",
      tags: ["React", "Design Systems"],
      match: 88,
    },
    {
      id: "j2",
      title: "UI Engineer",
      company: "Silverline Tech",
      location: "Hyderabad, IN",
      type: "Hybrid",
      posted: "5 days ago",
      tags: ["CSS", "Accessibility"],
      match: 79,
    },
    {
      id: "j3",
      title: "Product Frontend Developer",
      company: "Talenvia Partners",
      location: "Bengaluru, IN",
      type: "On-site",
      posted: "1 week ago",
      tags: ["React", "Testing"],
      match: 73,
    },
  ],
  tests: [
    { id: "t1", name: "React Fundamentals", durationMin: 25, questions: 18, level: "Beginner" },
    { id: "t2", name: "JavaScript Advanced", durationMin: 35, questions: 22, level: "Advanced" },
    { id: "t3", name: "CSS & Layout", durationMin: 20, questions: 15, level: "Intermediate" },
  ],
  notifications: [
    { id: "n1", type: "job", title: "New job matches available", detail: "3 roles match your React profile.", time: "Today • 9:10 AM", unread: true },
    { id: "n2", type: "test", title: "Mock test reminder", detail: "Try 'JavaScript Advanced' to boost visibility.", time: "Yesterday • 6:05 PM", unread: false },
    { id: "n3", type: "info", title: "Welcome to Talenvia", detail: "Complete your profile to get tailored recommendations.", time: "2 days ago", unread: false },
  ],
  settings: {
    theme: "Elegant Purple",
    notificationsEmail: true,
    notificationsPush: false,
    jobAlerts: true,
    privacy: "Standard",
  },
};

const ok = (data) => Promise.resolve({ ok: true, data });
const notFound = () => Promise.resolve({ ok: false, error: "Not found" });

const route = (method, path) => {
  const p = path.split("?")[0];
  return `${method.toUpperCase()} ${p}`;
};

// PUBLIC_INTERFACE
export async function mockFetch(method, path, body) {
  /** Simulates an HTTP call and returns data based on the endpoint path. */
  const key = route(method, path);

  switch (key) {
    case "GET /me":
      return (await ok(mock.me)).data;

    case "GET /skills":
      return (await ok(mock.skills)).data;

    case "POST /skills": {
      const name = (body?.name || "").trim();
      const level = (body?.level || "Beginner").trim();
      if (!name) return (await ok({ error: "Skill name required" })).data;
      const newSkill = { id: `s${Date.now()}`, name, level };
      mock.skills = [newSkill, ...mock.skills];
      return (await ok(mock.skills)).data;
    }

    case "GET /jobs": {
      // Basic query filtering on ?q= and ?location=
      const url = new URL(`http://mock${path.startsWith("/") ? "" : "/"}${path}`);
      const q = (url.searchParams.get("q") || "").toLowerCase();
      const location = (url.searchParams.get("location") || "").toLowerCase();

      const filtered = mock.jobs.filter((j) => {
        const hay = `${j.title} ${j.company} ${j.tags.join(" ")}`.toLowerCase();
        const okQ = q ? hay.includes(q) : true;
        const okLoc = location ? j.location.toLowerCase().includes(location) : true;
        return okQ && okLoc;
      });

      return (await ok(filtered)).data;
    }

    case "GET /tests":
      return (await ok(mock.tests)).data;

    case "POST /tests/start": {
      const testId = body?.testId;
      const t = mock.tests.find((x) => x.id === testId);
      return (await ok({ started: true, test: t || null, startedAt: new Date().toISOString() })).data;
    }

    case "GET /notifications":
      return (await ok(mock.notifications)).data;

    case "POST /notifications/mark-all-read":
      mock.notifications = mock.notifications.map((n) => ({ ...n, unread: false }));
      return (await ok(mock.notifications)).data;

    case "GET /settings":
      return (await ok(mock.settings)).data;

    case "POST /settings":
      mock.settings = { ...mock.settings, ...(body || {}) };
      return (await ok(mock.settings)).data;

    default:
      return (await notFound()).error;
  }
}
