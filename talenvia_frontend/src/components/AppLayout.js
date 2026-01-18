import React from "react";
import { NavLink, Outlet, useLocation } from "react-router-dom";

const navLinkClass = ({ isActive }) => (isActive ? "NavLink NavLinkActive" : "NavLink");
const sideLinkClass = ({ isActive }) => (isActive ? "SideLink SideLinkActive" : "SideLink");

// PUBLIC_INTERFACE
export default function AppLayout() {
  /** Primary layout with top navigation and optional sidebar for dashboard pages. */
  const location = useLocation();
  const isInfoPage = location.pathname.startsWith("/about") || location.pathname.startsWith("/how-it-works");

  return (
    <div className="AppShell">
      <div className="TopNav" role="banner">
        <div className="TopNav-inner">
          <NavLink to="/" className="Brand" aria-label="Talenvia Home">
            <div className="BrandMark" aria-hidden="true" />
            <div className="BrandTitle">
              <strong>Talenvia</strong>
              <span>Career Hub</span>
            </div>
          </NavLink>

          <nav className="NavLinks" aria-label="Primary navigation">
            <NavLink to="/jobs" className={navLinkClass}>Jobs</NavLink>
            <NavLink to="/profile" className={navLinkClass}>Profile</NavLink>
            <NavLink to="/skills" className={navLinkClass}>Skills</NavLink>
            <NavLink to="/mock-tests" className={navLinkClass}>Mock Tests</NavLink>
            <NavLink to="/notifications" className={navLinkClass}>Notifications</NavLink>
            <NavLink to="/settings" className={navLinkClass}>Settings</NavLink>
            <NavLink to="/about" className={navLinkClass}>About</NavLink>
          </nav>

          <div className="NavRight">
            <NavLink to="/how-it-works" className="NavLink">How it Works</NavLink>
            <button
              className="IconBtn"
              type="button"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              aria-label="Scroll to top"
              title="Scroll to top"
            >
              ↑
            </button>
          </div>
        </div>
      </div>

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
