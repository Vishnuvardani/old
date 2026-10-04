import { createRoot } from "react-dom/client";
import { useEffect, useState } from "react";
import { DataProvider, useData } from "./context/DataContext";
import App, { renderPage } from "./app/App.jsx";
import { IntegratedDashboard } from "./app/AppIntegration.jsx";
import { installBilingualText } from "./utils/bilingualText";
import "./styles/index.css";

const ROLE_MAP = {
  farmer:       "Farmer",
  veterinarian: "Veterinarian",
  government:   "Government Officer",
  admin:        "Admin",
};

const ROLE_REVERSE = {
  "Farmer":             "farmer",
  "Veterinarian":       "veterinarian",
  "Government Officer": "government",
  "Admin":              "admin",
};

// ── Loading ───────────────────────────────────────────────────────────────
function LoadingScreen() {
  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", background: "linear-gradient(145deg,#1a2010,#2d3d1a,#808034)" }}>
      <img src="/picsvg_download.png" alt="BioSecure Farm" style={{ width: 56, height: 56, borderRadius: 14, objectFit: "cover", marginBottom: 20 }} />
      <p style={{ color: "#DBD4FF", fontFamily: "Poppins", fontSize: 16, fontWeight: 700, marginBottom: 6 }}>BioSecure Farm</p>
      <p style={{ color: "rgba(219,212,255,0.6)", fontSize: 12, marginBottom: 28 }}>Loading data from MongoDB...</p>
      <div style={{ width: 180, height: 3, background: "rgba(255,255,255,0.15)", borderRadius: 4, overflow: "hidden" }}>
        <div style={{ height: "100%", borderRadius: 4, background: "linear-gradient(90deg,#DBD4FF,#808034)", animation: "lb 1.4s ease-in-out infinite", width: "55%" }} />
      </div>
      <style>{`@keyframes lb{0%{transform:translateX(-120%)}100%{transform:translateX(320%)}}`}</style>
    </div>
  );
}

// ── Error ─────────────────────────────────────────────────────────────────
function ErrorScreen({ error, onRetry }) {
  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#FFFFE3", fontFamily: "Inter" }}>
      <div style={{ background: "#fff", borderRadius: 20, padding: 36, maxWidth: 400, boxShadow: "0 4px 32px rgba(128,128,52,0.12)", textAlign: "center", border: "1px solid rgba(128,128,52,0.1)" }}>
        <div style={{ width: 52, height: 52, borderRadius: 14, background: "#fef2f2", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 14px" }}>
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#C62828" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
        </div>
        <h2 style={{ fontFamily: "Poppins", color: "#1a1a0e", marginBottom: 8, fontSize: 17 }}>MongoDB Not Connected</h2>
        <div style={{ background: "#f8f8f0", borderRadius: 10, padding: "10px 14px", textAlign: "left", marginBottom: 18, fontSize: 11, color: "#6b6b4a" }}>
          <p style={{ margin: "3px 0" }}>1. MongoDB running on <code>localhost:27017</code></p>
          <p style={{ margin: "3px 0" }}>2. Run: <code>node server/index.js</code></p>
          <p style={{ margin: "3px 0" }}>3. Run: <code>node data/seed.js</code></p>
        </div>
        <p style={{ color: "#C62828", fontSize: 10, marginBottom: 18, fontFamily: "monospace" }}>{error}</p>
        <button onClick={onRetry} style={{ background: "linear-gradient(135deg,#808034,#5c5c24)", color: "#fff", border: "none", borderRadius: 12, padding: "11px 28px", fontWeight: 600, cursor: "pointer", fontSize: 13 }}>
          Retry Connection
        </button>
      </div>
    </div>
  );
}

// ── DataConsumer ──────────────────────────────────────────────────────────
const SESSION_KEY = "biosecure-session";
const SESSION_TTL = 24 * 60 * 60 * 1000;

function DataConsumer({ mongoRole, onLogout, language }) {
  const { user, farms, livestock, vaccinations, diseases, biosecurity,
          vetReports, alerts, gisLocations, notifications, analytics,
          allUsers, loading, error, reload } = useData();

  const shortRole = ROLE_REVERSE[mongoRole] || "farmer";

  if (loading) return <LoadingScreen />;
  if (error)   return <ErrorScreen error={error} onRetry={reload} />;

  // renderLegacyPage delegates to App's renderPage function
  const renderLegacyPage = (role, page) =>
    renderPage(role, page, user, { farms, livestock, vaccinations, alerts, biosecurity }, language);

  return (
    <IntegratedDashboard
      role={shortRole}
      user={user}
      farms={farms}
      onLogout={onLogout}
      renderLegacyPage={renderLegacyPage}
      language={language}
    />
  );
}

// ── Root ──────────────────────────────────────────────────────────────────
function Root() {
  const [session, setSession] = useState(() => {
    try {
      const stored = JSON.parse(window.localStorage.getItem(SESSION_KEY) || "null");
      const token = window.localStorage.getItem("biosecure-token");
      if (stored && token && stored.expiresAt > Date.now()) return stored;
      window.localStorage.removeItem(SESSION_KEY);
      window.localStorage.removeItem("biosecure-token");
      return null;
    } catch { return null; }
  });
  const [language, setLanguage] = useState(() => window.localStorage.getItem("biosecure-language") || "en");

  useEffect(() => {
    const handleLanguageChange = event => setLanguage(event.detail === "ta" ? "ta" : "en");
    window.addEventListener("biosecure-language-change", handleLanguageChange);
    return () => window.removeEventListener("biosecure-language-change", handleLanguageChange);
  }, []);

  useEffect(() => installBilingualText(language), [language]);

  useEffect(() => {
    if (!session) return undefined;
    const remaining = Math.max(0, session.expiresAt - Date.now());
    const timer = window.setTimeout(() => {
      window.localStorage.removeItem(SESSION_KEY);
      setSession(null);
    }, remaining);
    return () => window.clearTimeout(timer);
  }, [session]);

  if (!session) {
    return (
      <App
        onMongoLogin={(role, user, token) => {
          const nextSession = {
            role: ROLE_MAP[role] || "Farmer",
            user: user || null,
            createdAt: Date.now(),
            expiresAt: Date.now() + SESSION_TTL,
          };
          if (token) window.localStorage.setItem("biosecure-token", token);
          window.localStorage.setItem(SESSION_KEY, JSON.stringify(nextSession));
          setSession(nextSession);
        }}
        language={language}
      />
    );
  }

  return (
    <DataProvider role={session.role} user={session.user}>
      <DataConsumer
        mongoRole={session.role}
        onLogout={() => {
          window.localStorage.removeItem(SESSION_KEY);
          window.localStorage.removeItem("biosecure-token");
          setSession(null);
        }}
        language={language}
      />
    </DataProvider>
  );
}

createRoot(document.getElementById("root")).render(<Root />);
