import React, { useEffect, useMemo, useRef, useState } from "react";
import { NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";

const sideLinkClass = ({ isActive }) => (isActive ? "SideLink SideLinkActive" : "SideLink");

// Simple inline icons (no extra deps)
function BellIcon({ className }) {
  return (
    <svg
      className={className}
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M12 22a2.25 2.25 0 0 0 2.2-1.8H9.8A2.25 2.25 0 0 0 12 22Z"
        fill="currentColor"
        opacity="0.9"
      />
      <path
        d="M18 10.5c0-3.02-1.5-5.48-4.5-6.25V3.5a1.5 1.5 0 1 0-3 0v.75C7.5 5.02 6 7.48 6 10.5v3.45c0 .42-.17.82-.47 1.12L4.6 16a1 1 0 0 0 .71 1.7h13.38a1 1 0 0 0 .71-1.7l-.93-.93c-.3-.3-.47-.7-.47-1.12V10.5Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ChevronDownIcon({ className }) {
  return (
    <svg className={className} width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M6.5 9.5 12 15l5.5-5.5"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// PUBLIC_INTERFACE
export default function AppLayout() {
  /** Primary layout with redesigned top header; sidebar and content remain unchanged. */
  const location = useLocation();
  const navigate = useNavigate();
  const isInfoPage = location.pathname.startsWith("/about") || location.pathname.startsWith("/how-it-works");

  // Mock user data (UI only; no backend/auth)
  const user = useMemo(
    () => ({
      name: "Aarav Mehta",
      initials: "AM",
      unreadNotifications: 3,
    }),
    []
  );

  const [search, setSearch] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const menuWrapRef = useRef(null);

  useEffect(() => {
    const onDocDown = (e) => {
      if (!menuOpen) return;
      if (!menuWrapRef.current) return;
      if (menuWrapRef.current.contains(e.target)) return;
      setMenuOpen(false);
    };
    document.addEventListener("mousedown", onDocDown);
    return () => document.removeEventListener("mousedown", onDocDown);
  }, [menuOpen]);

  const onSubmitSearch = (e) => {
    e.preventDefault();
    // UI-only: keep a gentle UX. For now, route to Jobs and let user use page filters.
    navigate("/jobs");
  };

  const onLogout = () => {
    // UI-only logout: close menu and navigate to home. No auth logic.
    setMenuOpen(false);
    navigate("/");
  };

  return (
    <div className="AppShell">
      {/* Redesigned Header */}
      <header className="TopNav" role="banner">
        <div className="TopNav-inner">
          <div className="w-full flex items-center gap-4">
            {/* Left: Brand */}
            <NavLink
              to="/"
              className="flex items-center gap-3 min-w-[200px]"
              aria-label="Talenvia Home"
            >
              <div
                className="h-9 w-9 rounded-xl bg-gradient-to-br from-purple-500 to-purple-700 shadow-sm"
                aria-hidden="true"
              />
              <div className="leading-tight">
                <div className="font-semibold text-gray-900 tracking-tight">TALENVIA</div>
                <div className="text-xs text-gray-500">Career Hub</div>
              </div>
            </NavLink>

            {/* Center: Global Search */}
            <div className="flex-1 flex justify-center">
              <form
                onSubmit={onSubmitSearch}
                className="w-full max-w-[560px]"
                role="search"
                aria-label="Global search"
              >
                <div className="relative">
                  <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                      <path
                        d="M10.5 18a7.5 7.5 0 1 1 0-15 7.5 7.5 0 0 1 0 15Z"
                        stroke="currentColor"
                        strokeWidth="1.7"
                      />
                      <path
                        d="M16.2 16.2 21 21"
                        stroke="currentColor"
                        strokeWidth="1.7"
                        strokeLinecap="round"
                      />
                    </svg>
                  </span>
                  <input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder='Search jobs, skills, companies'
                    className="w-full rounded-xl border border-gray-200 bg-white/90 py-2.5 pl-10 pr-3 text-sm text-gray-900 placeholder:text-gray-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-200"
                    aria-label="Search jobs, skills, companies"
                  />
                </div>
              </form>
            </div>

            {/* Right: Notifications + User */}
            <div className="flex items-center gap-3 justify-end min-w-[260px]">
              <button
                type="button"
                className="relative inline-flex h-10 w-10 items-center justify-center rounded-xl border border-gray-200 bg-white/90 text-gray-700 shadow-sm hover:bg-white focus:outline-none focus:ring-2 focus:ring-purple-200"
                aria-label="Notifications"
                title="Notifications"
                onClick={() => navigate("/notifications")}
              >
                <BellIcon className="text-gray-700" />
                {user.unreadNotifications > 0 ? (
                  <span
                    className="absolute -right-1 -top-1 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-purple-600 px-1.5 text-[11px] font-semibold text-white"
                    aria-label={`${user.unreadNotifications} unread notifications`}
                  >
                    {user.unreadNotifications}
                  </span>
                ) : null}
              </button>

              <div className="relative" ref={menuWrapRef}>
                <button
                  type="button"
                  className="inline-flex items-center gap-3 rounded-xl border border-gray-200 bg-white/90 px-3 py-2 shadow-sm hover:bg-white focus:outline-none focus:ring-2 focus:ring-purple-200"
                  aria-haspopup="menu"
                  aria-expanded={menuOpen ? "true" : "false"}
                  onClick={() => setMenuOpen((v) => !v)}
                >
                  <div
                    className="h-9 w-9 rounded-full bg-gradient-to-br from-purple-500 to-purple-700 text-white flex items-center justify-center text-sm font-semibold"
                    aria-hidden="true"
                  >
                    {user.initials}
                  </div>
                  <div className="hidden sm:block text-left">
                    <div className="text-sm font-semibold text-gray-900 leading-tight">{user.name}</div>
                    <div className="text-xs text-gray-500 leading-tight">Candidate</div>
                  </div>
                  <ChevronDownIcon className="text-gray-500" />
                </button>

                {menuOpen ? (
                  <div
                    role="menu"
                    aria-label="Profile menu"
                    className="absolute right-0 mt-2 w-44 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-lg"
                  >
                    <button
                      type="button"
                      role="menuitem"
                      className="w-full px-3 py-2.5 text-left text-sm text-gray-800 hover:bg-purple-50"
                      onClick={() => {
                        setMenuOpen(false);
                        navigate("/profile");
                      }}
                    >
                      Profile
                    </button>
                    <button
                      type="button"
                      role="menuitem"
                      className="w-full px-3 py-2.5 text-left text-sm text-gray-800 hover:bg-purple-50"
                      onClick={onLogout}
                    >
                      Logout
                    </button>
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="Main" role="main">
        {!isInfoPage && (
          <aside className="Sidebar" aria-label="Sidebar">
            <div className="SidebarTitle">Dashboard</div>
            <NavLink to="/jobs" className={sideLinkClass}>🔎 Job Search</NavLink>
            <NavLink to="/profile" className={sideLinkClass}>👤 Profile</NavLink>
            <NavLink to="/skills" className={sideLinkClass}>✨ Skills</NavLink>
            <NavLink to="/mock-tests" className={sideLinkClass}>🧪 Mock Tests</NavLink>
            <NavLink to="/notifications" className={sideLinkClass}>🔔 Notifications</NavLink>
            <NavLink to="/settings" className={sideLinkClass}>⚙️ Settings</NavLink>

            <div style={{ height: 12 }} />

            <div className="SidebarTitle">Learn</div>
            <NavLink to="/about" className={sideLinkClass}>ℹ️ About Us</NavLink>
            <NavLink to="/how-it-works" className={sideLinkClass}>🧭 How Talenvia Works</NavLink>
          </aside>
        )}

        <section className="Content">
          <Outlet />
        </section>
      </div>
    </div>
  );
}
