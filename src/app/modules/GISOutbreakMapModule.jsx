import { useState, useEffect, useCallback } from "react";
import { MapPin, AlertTriangle, RefreshCw, Layers, Info, Brain, ExternalLink, Shield, Activity, Filter, ChevronDown } from "lucide-react";
import { getGISFarms, getGISOutbreaks, getNearbyFarms } from "../../api/mongoService";

const POWERBI_URL = "https://app.powerbi.com/reportEmbed";

const C = {
  red: "#C62828", redL: "#ffebee", redM: "#ef9a9a",
  orange: "#E65100", orangeL: "#fff3e0", orangeM: "#ffcc80",
  yellow: "#F9A825", yellowL: "#fffde7",
  green: "#2E7D32", greenL: "#e8f5e9", greenM: "#a5d6a7",
  blue: "#1565C0", blueL: "#e3f2fd",
  purple: "#6A1B9A", purpleL: "#f3e5f5",
  gray: "#6b7280", gray2: "#9ca3af", gray3: "#e5e7eb", gray4: "#f9fafb",
  dark: "#111827", white: "#ffffff",
  mapBg: "#0f1f0a", mapGrid: "#1a3310", mapBorder: "#2d5a1a",
};

// District centroid coordinates for South India (fallback when disease_reports have no GPS)
const DISTRICT_COORDS = {
  "Hyderabad":         { lat: 17.3850, lon: 78.4867 },
  "Nizamabad":         { lat: 18.6725, lon: 78.0941 },
  "Karimnagar":        { lat: 18.4386, lon: 79.1288 },
  "Warangal":          { lat: 17.9784, lon: 79.5941 },
  "Visakhapatnam":     { lat: 17.6868, lon: 83.2185 },
  "Vijayawada":        { lat: 16.5062, lon: 80.6480 },
  "Guntur":            { lat: 16.3067, lon: 80.4365 },
  "Tirupati":          { lat: 13.6288, lon: 79.4192 },
  "Chennai":           { lat: 13.0827, lon: 80.2707 },
  "Madurai":           { lat: 9.9252,  lon: 78.1198 },
  "Coimbatore":        { lat: 11.0168, lon: 76.9558 },
  "Salem":             { lat: 11.6643, lon: 78.1460 },
  "Trichy":            { lat: 10.7905, lon: 78.7047 },
  "Erode":             { lat: 11.3410, lon: 77.7172 },
  "Bengaluru":         { lat: 12.9716, lon: 77.5946 },
  "Mysuru":            { lat: 12.2958, lon: 76.6394 },
  "Hubli":             { lat: 15.3647, lon: 75.1240 },
  "Mangaluru":         { lat: 12.9141, lon: 74.8560 },
  "Kochi":             { lat: 9.9312,  lon: 76.2673 },
  "Thiruvananthapuram":{ lat: 8.5241,  lon: 76.9366 },
  "Thrissur":          { lat: 10.5276, lon: 76.2144 },
  "Kozhikode":         { lat: 11.2588, lon: 75.7804 },
};

// Disease → farm type susceptibility map
const DISEASE_SUSCEPTIBILITY = {
  "Bird Flu":           ["Poultry"],
  "Newcastle Disease":  ["Poultry"],
  "Swine Influenza":    ["Pig"],
  "African Swine Fever":["Pig"],
  "Foot and Mouth Disease": ["Cattle", "Pig", "Goat", "Sheep", "Mixed"],
};

function haversineKm(lat1, lon1, lat2, lon2) {
  const R = 6371;
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = Math.sin(dLat / 2) ** 2 + Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * Math.sin(dLon / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

// Enrich outbreaks: attach GPS from district centroids if missing/zero
function enrichOutbreaks(outbreaks) {
  return outbreaks.map(o => {
    let lat = Number(o.latitude);
    let lon = Number(o.longitude);
    if (!lat || !lon || (lat === 0 && lon === 0)) {
      const c = DISTRICT_COORDS[o.district];
      if (c) { lat = c.lat + (Math.random() - 0.5) * 0.04; lon = c.lon + (Math.random() - 0.5) * 0.04; }
    }
    return { ...o, latitude: lat, longitude: lon };
  }).filter(o => o.latitude && o.longitude);
}

function getBounds(farms, outbreaks) {
  const all = [...farms, ...outbreaks].filter(f => f.latitude && f.longitude);
  if (!all.length) return { minLat: 8, maxLat: 20, minLon: 74, maxLon: 85 };
  const lats = all.map(f => f.latitude);
  const lons = all.map(f => f.longitude);
  const pad = 0.5;
  return {
    minLat: Math.min(...lats) - pad, maxLat: Math.max(...lats) + pad,
    minLon: Math.min(...lons) - pad, maxLon: Math.max(...lons) + pad,
  };
}

function latLonToXY(lat, lon, bounds, W, H) {
  const x = ((lon - bounds.minLon) / (bounds.maxLon - bounds.minLon)) * W;
  const y = H - ((lat - bounds.minLat) / (bounds.maxLat - bounds.minLat)) * H;
  return { x: Math.max(8, Math.min(W - 8, x)), y: Math.max(8, Math.min(H - 8, y)) };
}

// Convert km radius to SVG pixels using the actual geographic scale
function kmToPixels(km, bounds, H) {
  const degPerKm = 1 / 111;
  return (km * degPerKm / (bounds.maxLat - bounds.minLat)) * H;
}

// ── AI Risk Engine ─────────────────────────────────────────────────────────
function calcAIRisk(farm, outbreaks) {
  if (!farm.latitude || !farm.longitude) return null;

  let totalScore = 0;
  const factors = [];

  outbreaks.forEach(o => {
    if (!o.latitude || !o.longitude) return;
    const dist = haversineKm(farm.latitude, farm.longitude, o.latitude, o.longitude);
    if (dist > 50) return;

    // Distance decay score
    let distScore = 0;
    if (dist <= 2)       distScore = 45;
    else if (dist <= 5)  distScore = 32;
    else if (dist <= 10) distScore = 20;
    else if (dist <= 20) distScore = 10;
    else if (dist <= 50) distScore = 4;

    // Severity multiplier
    const sev = (o.severity || o.riskLevel || "").toLowerCase();
    const sevMult = sev === "high" || sev === "critical" ? 1.6 : sev === "moderate" ? 1.0 : 0.5;

    // Disease-to-farm-type susceptibility
    const susceptible = DISEASE_SUSCEPTIBILITY[o.suspectedDisease || o.diseaseName] || [];
    const typeMult = susceptible.length === 0 ? 1.0
      : susceptible.some(t => (farm.farmType || "").toLowerCase().includes(t.toLowerCase())) ? 1.4 : 0.3;

    // Affected animal count bonus (capped)
    const animalBonus = Math.min((o.affectedAnimals || 0) / 200, 8);
    const deathBonus  = Math.min((o.deaths || 0) * 3, 12);

    const score = (distScore * sevMult * typeMult) + animalBonus + deathBonus;
    totalScore += score;

    if (distScore > 0) {
      factors.push({
        disease: o.suspectedDisease || o.diseaseName,
        dist: dist.toFixed(1),
        severity: sev,
        score: Math.round(score),
        farmName: o.farmName || o.district,
        susceptible: typeMult > 1,
      });
    }
  });

  factors.sort((a, b) => b.score - a.score);
  const score = Math.min(Math.round(totalScore), 100);
  const level = score >= 61 ? "HIGH" : score >= 31 ? "MODERATE" : "LOW";
  const color = score >= 61 ? C.red : score >= 31 ? C.yellow : C.green;
  const levelBg = score >= 61 ? C.redL : score >= 31 ? C.yellowL : C.greenL;

  // Risk factor summary tags (simple English)
  const riskTags = [];
  if (factors.length > 0) riskTags.push({ label: "Nearby outbreak detected", status: "warn" });
  if (factors.some(f => f.susceptible)) riskTags.push({ label: "Your animals are susceptible", status: "warn" });
  if (factors.length === 0) riskTags.push({ label: "No nearby outbreaks", status: "ok" });
  if (score >= 61) riskTags.push({ label: "Biosecurity needs attention", status: "warn" });
  else if (score >= 31) riskTags.push({ label: "Biosecurity assessment advised", status: "info" });
  else riskTags.push({ label: "Biosecurity looks adequate", status: "ok" });
  riskTags.push({ label: score >= 61 ? "Vaccination review needed" : "Check vaccination records", status: score >= 61 ? "warn" : "ok" });

  const recommendations = score >= 61 ? [
    "Increase animal health monitoring — check animals morning and evening",
    "Strengthen cleaning and disinfection of sheds and equipment",
    "Restrict unnecessary visitors from entering the farm",
    "Review vaccination status with your veterinarian",
    "Monitor animals for unusual symptoms like fever, loss of appetite, or sudden deaths",
    "Contact your assigned veterinarian if you notice any symptoms",
  ] : score >= 31 ? [
    "Increase routine monitoring of your animals",
    "Review your biosecurity practices and fix any gaps",
    "Check that vaccination records are up to date",
    "Maintain regular disinfection of entry points",
    "Keep track of nearby outbreak updates",
  ] : [
    "Continue your current biosecurity practices",
    "Maintain your vaccination schedule",
    "Continue regular health monitoring of animals",
    "Stay updated on outbreak notifications in your area",
  ];

  return { score, level, color, levelBg, factors, riskTags, recommendations };
}

// ── GIS Map SVG ────────────────────────────────────────────────────────────
// Returns zone for a farm based on its closest outbreak distance
function getFarmZoneMap(farms, outbreaks) {
  const map = {};
  farms.forEach(f => {
    if (!f.latitude || !f.longitude) return;
    let minDist = Infinity;
    outbreaks.forEach(o => {
      if (!o.latitude || !o.longitude) return;
      const d = haversineKm(f.latitude, f.longitude, o.latitude, o.longitude);
      if (d < minDist) minDist = d;
    });
    if      (minDist <= 3)  map[f.farmId] = "red";
    else if (minDist <= 8)  map[f.farmId] = "yellow";
    else if (minDist <= 15) map[f.farmId] = "green";
    else                    map[f.farmId] = "safe";
  });
  return map;
}

function GISMapSVG({ farms, outbreaks, selectedOutbreak, onFarmClick, onOutbreakClick, showRiskZones, bounds }) {
  const W = 700, H = 420;

  return (
    <svg viewBox={`0 0 ${W} ${H}`} style={{ width: "100%", height: "100%", background: C.mapBg, borderRadius: 16, display: "block" }}>
      {/* Grid lines */}
      {[...Array(9)].map((_, i) => <line key={`h${i}`} x1="0" y1={i * 52} x2={W} y2={i * 52} stroke={C.mapGrid} strokeWidth="0.5" />)}
      {[...Array(13)].map((_, i) => <line key={`v${i}`} x1={i * 58} y1="0" x2={i * 58} y2={H} stroke={C.mapGrid} strokeWidth="0.5" />)}

      {/* Risk zone rings — drawn first so markers appear on top */}
      {showRiskZones && outbreaks.map((o, i) => {
        if (!o.latitude || !o.longitude) return null;
        const { x, y } = latLonToXY(o.latitude, o.longitude, bounds, W, H);
        const r3  = kmToPixels(3,  bounds, H);
        const r8  = kmToPixels(8,  bounds, H);
        const r15 = kmToPixels(15, bounds, H);
        return (
          <g key={`zone-${i}`}>
            <circle cx={x} cy={y} r={r15} fill={C.green}   fillOpacity="0.05" stroke={C.green}   strokeWidth="1"   strokeDasharray="6 4" />
            <circle cx={x} cy={y} r={r8}  fill={C.yellow}  fillOpacity="0.09" stroke={C.yellow}  strokeWidth="1.5" strokeDasharray="5 3" />
            <circle cx={x} cy={y} r={r3}  fill={C.red}     fillOpacity="0.16" stroke={C.red}     strokeWidth="1.5" />
            {/* Distance labels on rings */}
            <text x={x} y={y - r15 - 3} textAnchor="middle" fontSize="7.5" fill={C.green}  fillOpacity="0.85">15 km</text>
            <text x={x} y={y - r8  - 3} textAnchor="middle" fontSize="7.5" fill={C.yellow} fillOpacity="0.9">8 km</text>
            <text x={x} y={y - r3  - 3} textAnchor="middle" fontSize="7.5" fill={C.red}>3 km</text>
          </g>
        );
      })}

      {/* Farm markers — colored by distance zone to nearest outbreak */}
      {(() => {
        const zoneMap = outbreaks.length ? getFarmZoneMap(farms, outbreaks) : {};
        return farms.map((f, i) => {
          if (!f.latitude || !f.longitude) return null;
          const { x, y } = latLonToXY(f.latitude, f.longitude, bounds, W, H);
          const zone = zoneMap[f.farmId] || "safe";
          const col  = zone === "red" ? C.red : zone === "yellow" ? C.yellow : C.green;
          const r    = zone === "red" ? 9 : zone === "yellow" ? 8 : 7;
          const label = zone === "red" ? "CRITICAL" : zone === "yellow" ? "WATCH" : null;
          return (
            <g key={`farm-${i}`} onClick={() => onFarmClick(f)} style={{ cursor: "pointer" }}>
              {zone !== "safe" && <circle cx={x} cy={y} r={r + 7} fill={col} fillOpacity="0.12" />}
              <circle cx={x} cy={y} r={r + 4} fill={col} fillOpacity="0.2" />
              <circle cx={x} cy={y} r={r} fill={col} />
              <circle cx={x} cy={y} r={3} fill={C.white} fillOpacity="0.75" />
              {label && <text x={x} y={y - r - 6} textAnchor="middle" fontSize="7" fill={col} fontWeight="bold">{label}</text>}
            </g>
          );
        });
      })()}

      {/* Outbreak markers — drawn last so they're always on top */}
      {outbreaks.map((o, i) => {
        if (!o.latitude || !o.longitude) return null;
        const { x, y } = latLonToXY(o.latitude, o.longitude, bounds, W, H);
        const isSel = selectedOutbreak?.reportId === o.reportId || selectedOutbreak?.outbreakId === o.outbreakId;
        const sevColor = (o.severity || o.riskLevel || "").toLowerCase() === "high" ? C.red
          : (o.severity || o.riskLevel || "").toLowerCase() === "moderate" ? C.yellow : C.green;
        return (
          <g key={`out-${i}`} onClick={() => onOutbreakClick(o)} style={{ cursor: "pointer" }}>
            {isSel && <circle cx={x} cy={y} r={22} fill="none" stroke={sevColor} strokeWidth="2" strokeDasharray="4 2" opacity="0.7" />}
            <circle cx={x} cy={y} r={isSel ? 16 : 13} fill={sevColor} fillOpacity="0.22" />
            <circle cx={x} cy={y} r={isSel ? 10 : 8} fill={sevColor} />
            <text x={x} y={y + 4} textAnchor="middle" fontSize="10" fill={C.white} fontWeight="800">!</text>
          </g>
        );
      })}

      {/* Legend — two groups */}
      <g transform={`translate(8,${H - 38})`}>
        <text x="0" y="0" fontSize="7.5" fill="rgba(255,255,255,0.45)" fontWeight="700">OUTBREAK SEVERITY</text>
        {[[C.red,"High"],[C.yellow,"Moderate"],[C.green,"Low"]].map(([col,label],i) => (
          <g key={label} transform={`translate(${i * 80}, 10)`}>
            <circle cx="5" cy="5" r="5" fill={col} fillOpacity="0.9" />
            <text x="14" y="9" fontSize="8" fill="rgba(255,255,255,0.6)">{label}</text>
          </g>
        ))}
      </g>
      <g transform={`translate(8,${H - 14})`}>
        <text x="0" y="0" fontSize="7.5" fill="rgba(255,255,255,0.45)" fontWeight="700">FARM STATUS</text>
        {[[C.red,"High-risk farm"],[C.yellow,"Moderate-risk farm"],[C.green,"Low-risk farm"]].map(([col,label],i) => (
          <g key={label} transform={`translate(${i * 130 + 70}, 0)`}>
            <circle cx="5" cy="5" r="4" fill={col} fillOpacity="0.85" />
            <text x="13" y="9" fontSize="8" fill="rgba(255,255,255,0.6)">{label}</text>
          </g>
        ))}
      </g>

      {/* Zone legend */}
      {showRiskZones && (
        <g transform="translate(8,12)">
          {[[C.red,"0-3km Critical"],[C.orange,"3-8km High"],[C.yellow,"8-15km Watch"]].map(([col, label], i) => (
            <g key={label} transform={`translate(${i * 130}, 0)`}>
              <rect x="0" y="0" width="10" height="10" rx="2" fill={col} fillOpacity="0.5" stroke={col} strokeWidth="1" />
              <text x="14" y="9" fontSize="8" fill="rgba(255,255,255,0.6)">{label}</text>
            </g>
          ))}
        </g>
      )}

      <text x={W - 5} y={H - 5} textAnchor="end" fontSize="7" fill="rgba(255,255,255,0.25)">WGS84 · BioSecure GIS</text>
    </svg>
  );
}

// ── Popup Card ─────────────────────────────────────────────────────────────
function PopupCard({ item, type, onClose, onAnalyse }) {
  if (!item) return null;
  const isOutbreak = type === "outbreak";
  const sev = (item.severity || item.riskLevel || "").toLowerCase();
  const color = isOutbreak
    ? (sev === "high" ? C.red : sev === "moderate" ? C.yellow : C.green)
    : (item.riskLevel === "HIGH" ? C.red : item.riskLevel === "MODERATE" ? C.orange : C.green);

  return (
    <div style={{ position: "absolute", top: 10, right: 10, background: C.white, borderRadius: 14, border: `2px solid ${color}40`, padding: 16, minWidth: 240, maxWidth: 280, boxShadow: "0 8px 32px rgba(0,0,0,0.22)", zIndex: 10 }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <div style={{ width: 10, height: 10, borderRadius: "50%", background: color }} />
          <span style={{ fontSize: 11, fontWeight: 700, color: C.dark }}>{isOutbreak ? "Disease Outbreak" : "Farm"}</span>
        </div>
        <button onClick={onClose} style={{ background: "none", border: "none", cursor: "pointer", fontSize: 18, color: C.gray, lineHeight: 1, padding: "0 2px" }}>×</button>
      </div>
      <div style={{ borderTop: `1px solid ${color}20`, paddingTop: 10 }}>
        <p style={{ fontSize: 13, fontWeight: 700, color: C.dark, margin: "0 0 8px" }}>{item.farmName || item.diseaseName || item.farmId}</p>
        {isOutbreak ? (
          <>
            {[
              ["Disease",   item.suspectedDisease || item.diseaseName],
              ["Severity",  item.severity || item.riskLevel],
              ["Affected",  item.affectedAnimals],
              ["Deaths",    item.deaths],
              ["District",  item.district],
              ["Date",      item.reportedDate ? new Date(item.reportedDate).toLocaleDateString() : item.outbreakDate],
            ].filter(([, v]) => v !== undefined && v !== null && v !== "").map(([k, v]) => (
              <div key={k} style={{ display: "flex", justifyContent: "space-between", fontSize: 11, padding: "3px 0", borderBottom: `1px solid ${C.gray3}` }}>
                <span style={{ color: C.gray }}>{k}</span>
                <span style={{ fontWeight: 600, color: k === "Severity" ? color : C.dark }}>{String(v)}</span>
              </div>
            ))}
            {item.nearbyFarms?.length > 0 && (
              <p style={{ fontSize: 11, color: C.orange, marginTop: 8, fontWeight: 600 }}>⚠ {item.nearbyFarms.length} farm(s) in exposure zone</p>
            )}
          </>
        ) : (
          <>
            {[["Location", item.district], ["Animal Type", item.farmType]].map(([k, v]) => (
              <div key={k} style={{ display: "flex", justifyContent: "space-between", fontSize: 11, padding: "3px 0", borderBottom: `1px solid ${C.gray3}` }}>
                <span style={{ color: C.gray }}>{k}</span>
                <span style={{ fontWeight: 600, color: C.dark }}>{String(v || "-")}</span>
              </div>
            ))}
            {(() => {
              const r = calcAIRisk(item, []);
              return null; // score shown via onAnalyse
            })()}
            <div style={{ marginTop: 10, padding: "8px 12px", borderRadius: 10, background: color + "12", border: `1px solid ${color}25`, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontSize: 11, color: C.gray }}>Risk Level</span>
              <span style={{ fontSize: 12, fontWeight: 700, color }}>{item.riskLevel || "LOW"}</span>
            </div>
            <button onClick={() => onAnalyse(item)} style={{ width: "100%", marginTop: 8, padding: "8px", borderRadius: 10, background: C.purpleL, border: `1px solid ${C.purple}30`, cursor: "pointer", fontSize: 12, fontWeight: 700, color: C.purple, display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}>
              <Brain size={13} /> View Risk Details
            </button>
          </>
        )}
      </div>
    </div>
  );
}

// ── Risk Details Panel (farmer-friendly) ─────────────────────────────────
function RiskDetailsPanel({ farm, outbreaks, onClose }) {
  const risk = calcAIRisk(farm, outbreaks);
  if (!risk) return null;

  const factorRows = [
    { label: "Nearby Outbreak",       status: risk.factors.length > 0 ? (risk.factors[0]?.severity === "high" ? "HIGH" : "MODERATE") : "NONE",   ok: risk.factors.length === 0 },
    { label: "Farm Proximity",        status: risk.score >= 61 ? "HIGH" : risk.score >= 31 ? "MODERATE" : "LOW",                                  ok: risk.score < 31 },
    { label: "Biosecurity Assessment",status: risk.score >= 61 ? "NEEDS ATTENTION" : risk.score >= 31 ? "MODERATE" : "GOOD",                      ok: risk.score < 31 },
    { label: "Vaccination Status",    status: risk.score >= 61 ? "REVIEW NEEDED" : "CHECK RECORDS",                                               ok: risk.score < 61 },
    { label: "Animal Health",         status: risk.score >= 61 ? "NEEDS MONITORING" : risk.score >= 31 ? "MONITOR" : "GOOD",                      ok: risk.score < 31 },
  ];

  return (
    <div style={{ background: C.white, borderRadius: 16, border: `2px solid ${risk.color}30`, padding: 20, marginBottom: 16 }}>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 40, height: 40, borderRadius: 12, background: risk.color + "18", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Shield size={20} color={risk.color} />
          </div>
          <div>
            <p style={{ fontSize: 14, fontWeight: 700, color: C.dark, margin: 0 }}>Farm Risk Details</p>
            <p style={{ fontSize: 11, color: C.gray, margin: 0 }}>{farm.farmName} · {farm.district}</p>
          </div>
        </div>
        <button onClick={onClose} style={{ background: "none", border: "none", cursor: "pointer", fontSize: 20, color: C.gray }}>×</button>
      </div>

      {/* Farm info + overall risk */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 16 }}>
        <div style={{ background: C.gray4, borderRadius: 12, padding: "12px 14px" }}>
          <p style={{ fontSize: 10, color: C.gray, margin: "0 0 4px" }}>FARM NAME</p>
          <p style={{ fontSize: 13, fontWeight: 700, color: C.dark, margin: 0 }}>{farm.farmName}</p>
          <p style={{ fontSize: 11, color: C.gray, margin: "4px 0 0" }}>{farm.district} · {farm.farmType}</p>
        </div>
        <div style={{ background: risk.levelBg, borderRadius: 12, padding: "12px 14px", border: `1px solid ${risk.color}20` }}>
          <p style={{ fontSize: 10, color: C.gray, margin: "0 0 4px" }}>OVERALL RISK</p>
          <p style={{ fontSize: 18, fontWeight: 800, color: risk.color, margin: 0, fontFamily: "Poppins, sans-serif" }}>{risk.level} RISK</p>
          <p style={{ fontSize: 12, fontWeight: 600, color: risk.color, margin: "2px 0 0" }}>Score: {risk.score}/100</p>
        </div>
      </div>

      {/* Score bar */}
      <div style={{ marginBottom: 16 }}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
          <span style={{ fontSize: 12, fontWeight: 600, color: C.gray }}>Risk Score</span>
          <span style={{ fontSize: 12, fontWeight: 700, color: risk.color }}>{risk.score}/100</span>
        </div>
        <div style={{ height: 8, background: C.gray3, borderRadius: 6, overflow: "hidden", position: "relative" }}>
          <div style={{ position: "absolute", left: 0, top: 0, height: "100%", width: "30%", background: C.green, opacity: 0.3 }} />
          <div style={{ position: "absolute", left: "30%", top: 0, height: "100%", width: "31%", background: C.yellow, opacity: 0.3 }} />
          <div style={{ position: "absolute", left: "61%", top: 0, height: "100%", width: "39%", background: C.red, opacity: 0.3 }} />
          <div style={{ height: "100%", width: `${risk.score}%`, background: risk.color, borderRadius: 6, position: "relative", zIndex: 1 }} />
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", marginTop: 3 }}>
          <span style={{ fontSize: 9, color: C.green, fontWeight: 600 }}>LOW (0-30)</span>
          <span style={{ fontSize: 9, color: C.yellow, fontWeight: 600 }}>MODERATE (31-60)</span>
          <span style={{ fontSize: 9, color: C.red, fontWeight: 600 }}>HIGH (61-100)</span>
        </div>
      </div>

      {/* Why is this farm at risk */}
      <div style={{ marginBottom: 16 }}>
        <p style={{ fontSize: 13, fontWeight: 700, color: C.dark, marginBottom: 10 }}>Why is this farm flagged?</p>
        {factorRows.map((row, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "8px 12px", borderRadius: 10, background: C.gray4, marginBottom: 6 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ fontSize: 14 }}>{row.ok ? "✓" : "⚠"}</span>
              <span style={{ fontSize: 12, color: C.dark }}>{row.label}</span>
            </div>
            <span style={{ fontSize: 11, fontWeight: 700, color: row.ok ? C.green : row.status === "HIGH" || row.status === "NEEDS ATTENTION" || row.status === "REVIEW NEEDED" || row.status === "NEEDS MONITORING" ? C.red : C.yellow,
              background: (row.ok ? C.green : row.status === "HIGH" || row.status === "NEEDS ATTENTION" || row.status === "REVIEW NEEDED" || row.status === "NEEDS MONITORING" ? C.red : C.yellow) + "18",
              padding: "2px 10px", borderRadius: 8 }}>{row.status}</span>
          </div>
        ))}
      </div>

      {/* Recommended Actions */}
      <div style={{ background: `linear-gradient(135deg, ${C.purpleL}, #f0f9ff)`, borderRadius: 12, padding: 14 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 10 }}>
          <Shield size={14} color={C.purple} />
          <p style={{ fontSize: 13, fontWeight: 700, color: C.purple, margin: 0 }}>Recommended Actions</p>
        </div>
        {risk.recommendations.map((r, i) => (
          <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 8, marginBottom: 7 }}>
            <div style={{ width: 20, height: 20, borderRadius: "50%", background: C.purple + "18", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 1 }}>
              <span style={{ fontSize: 9, fontWeight: 700, color: C.purple }}>{i + 1}</span>
            </div>
            <p style={{ fontSize: 12, color: C.dark, margin: 0, lineHeight: 1.6 }}>{r}</p>
          </div>
        ))}
      </div>
      <p style={{ fontSize: 10, color: C.gray2, marginTop: 10, textAlign: "center" }}>
        This is a preventive risk assessment based on outbreak proximity, disease type, and farm data. It does not confirm any disease diagnosis.
      </p>
    </div>
  );
}

// ── Main Module ────────────────────────────────────────────────────────────
export default function GISOutbreakMapModule() {
  const [farms, setFarms]               = useState([]);
  const [outbreaks, setOutbreaks]       = useState([]);
  const [loading, setLoading]           = useState(true);
  const [error, setError]               = useState(null);
  const [selectedFarm, setSelectedFarm] = useState(null);
  const [selectedOutbreak, setSelectedOutbreak] = useState(null);
  const [showRiskZones, setShowRiskZones] = useState(true);
  const [activeLayer, setActiveLayer]   = useState("All");
  const [nearbyData, setNearbyData]     = useState(null);
  const [aiTarget, setAiTarget]         = useState(null);
  const [severityFilter, setSeverityFilter] = useState("All");
  const [showFilterMenu, setShowFilterMenu] = useState(false);

  const load = useCallback(async () => {
    setLoading(true); setError(null);
    try {
      const [f, o] = await Promise.all([getGISFarms(), getGISOutbreaks()]);
      setFarms(Array.isArray(f) ? f : []);
      setOutbreaks(enrichOutbreaks(Array.isArray(o) ? o : []));
    } catch (e) {
      setError(e.message || "Failed to load map data. Ensure the server is running.");
      setFarms([]); setOutbreaks([]);
    } finally { setLoading(false); }
  }, []);

  useEffect(() => { load(); }, [load]);

  const handleOutbreakClick = async (o) => {
    setSelectedOutbreak(o); setSelectedFarm(null); setAiTarget(null);
    try { const data = await getNearbyFarms(o.reportId || o.outbreakId); setNearbyData(data); }
    catch { setNearbyData(null); }
  };

  const handleFarmClick = (f) => {
    setSelectedFarm(f); setSelectedOutbreak(null); setNearbyData(null); setAiTarget(null);
  };

  const handleAnalyse = (farm) => { setAiTarget(farm); setSelectedFarm(null); };

  // Filtered data
  const filteredFarms = activeLayer === "Outbreaks" ? [] : farms;
  const filteredOutbreaks = (activeLayer === "Farms" ? [] : outbreaks).filter(o => {
    if (severityFilter === "All") return true;
    const sev = (o.severity || o.riskLevel || "").toLowerCase();
    return sev === severityFilter.toLowerCase();
  });

  const bounds = getBounds(filteredFarms, filteredOutbreaks.length ? filteredOutbreaks : outbreaks);

  const nearbyFarmIds = nearbyData ? new Set(nearbyData.nearbyFarms?.map(f => f.farmId)) : null;

  // Stats
  const highCount = outbreaks.filter(o => (o.severity || o.riskLevel || "").toLowerCase() === "high").length;
  const modCount  = outbreaks.filter(o => (o.severity || o.riskLevel || "").toLowerCase() === "moderate").length;
  const totalAffected = outbreaks.reduce((s, o) => s + (o.affectedAnimals || 0), 0);

  // AI at-risk farms (top 8, probability >= 12%)
  const atRiskFarms = farms
    .map(f => ({ ...f, aiRisk: calcAIRisk(f, outbreaks) }))
    .filter(f => f.aiRisk && f.aiRisk.probability >= 12)
    .sort((a, b) => b.aiRisk.probability - a.aiRisk.probability)
    .slice(0, 8);

  return (
    <div style={{ fontFamily: "Inter, sans-serif", color: C.dark }}>

      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 18, padding: "16px 20px", background: "linear-gradient(135deg,#0f1f0a,#1a3310)", borderRadius: 16 }}>
        <div style={{ width: 44, height: 44, borderRadius: 13, background: "rgba(76,175,80,0.2)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
          <MapPin size={22} color="#4CAF50" />
        </div>
        <div style={{ flex: 1 }}>
          <h2 style={{ fontFamily: "Poppins, sans-serif", fontSize: 17, fontWeight: 700, color: C.white, margin: 0 }}>GIS Outbreak Map</h2>
          <p style={{ fontSize: 11, color: "rgba(255,255,255,0.55)", margin: "2px 0 0" }}>Real-time farm locations · Disease outbreak zones · AI risk prediction</p>
        </div>
        <a href={POWERBI_URL} target="_blank" rel="noopener noreferrer"
          style={{ display: "flex", alignItems: "center", gap: 5, padding: "7px 13px", borderRadius: 10, background: "#f2c811", color: C.dark, fontWeight: 700, fontSize: 11, textDecoration: "none", flexShrink: 0 }}>
          <ExternalLink size={12} /> Power BI
        </a>
        <button onClick={load} style={{ display: "flex", alignItems: "center", gap: 6, padding: "7px 14px", borderRadius: 10, background: "rgba(255,255,255,0.1)", border: "none", cursor: "pointer", fontSize: 12, color: C.white }}>
          <RefreshCw size={13} /> Refresh
        </button>
      </div>

      {/* KPI Cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 10, marginBottom: 16 }}>
        {[
          ["Total Farms",      farms.length,    C.green,  C.greenL],
          ["Active Outbreaks", outbreaks.length, C.red,    C.redL],
          ["High Severity",    highCount,        C.red,    C.redL],
          ["Animals Affected", totalAffected,    C.orange, C.orangeL],
        ].map(([label, val, color, bg]) => (
          <div key={label} style={{ background: bg, borderRadius: 12, padding: "14px 16px", border: `1px solid ${color}20` }}>
            <div style={{ fontSize: 24, fontWeight: 800, color, fontFamily: "Poppins, sans-serif" }}>{val.toLocaleString()}</div>
            <div style={{ fontSize: 11, color: C.gray, marginTop: 2 }}>{label}</div>
          </div>
        ))}
      </div>

      {/* Map Controls */}
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10, flexWrap: "wrap" }}>
        {["All", "Farms", "Outbreaks"].map(l => (
          <button key={l} onClick={() => setActiveLayer(l)}
            style={{ padding: "6px 14px", borderRadius: 10, border: "none", cursor: "pointer", fontSize: 12, fontWeight: 600, background: activeLayer === l ? "#2d5a1a" : C.gray4, color: activeLayer === l ? C.white : C.gray }}>
            {l}
          </button>
        ))}
        <button onClick={() => setShowRiskZones(v => !v)}
          style={{ display: "flex", alignItems: "center", gap: 5, padding: "6px 14px", borderRadius: 10, border: `1.5px solid ${showRiskZones ? C.orange : C.gray3}`, cursor: "pointer", fontSize: 12, fontWeight: 600, background: showRiskZones ? C.orangeL : C.white, color: showRiskZones ? C.orange : C.gray }}>
          <Layers size={13} /> Risk Zones
        </button>

        {/* Severity filter */}
        <div style={{ position: "relative" }}>
          <button onClick={() => setShowFilterMenu(v => !v)}
            style={{ display: "flex", alignItems: "center", gap: 5, padding: "6px 14px", borderRadius: 10, border: `1.5px solid ${C.gray3}`, cursor: "pointer", fontSize: 12, fontWeight: 600, background: C.white, color: C.gray }}>
            <Filter size={13} /> {severityFilter} <ChevronDown size={12} />
          </button>
          {showFilterMenu && (
            <div style={{ position: "absolute", top: "110%", left: 0, background: C.white, borderRadius: 10, border: `1px solid ${C.gray3}`, boxShadow: "0 4px 16px rgba(0,0,0,0.12)", zIndex: 20, minWidth: 130 }}>
              {["All", "High", "Moderate", "Low"].map(s => (
                <button key={s} onClick={() => { setSeverityFilter(s); setShowFilterMenu(false); }}
                  style={{ display: "block", width: "100%", padding: "8px 14px", background: severityFilter === s ? C.gray4 : "none", border: "none", cursor: "pointer", fontSize: 12, textAlign: "left", color: C.dark, fontWeight: severityFilter === s ? 700 : 400 }}>
                  {s}
                </button>
              ))}
            </div>
          )}
        </div>

        <span style={{ marginLeft: "auto", fontSize: 11, color: C.gray2 }}>
          {filteredOutbreaks.length} outbreak{filteredOutbreaks.length !== 1 ? "s" : ""} · {filteredFarms.length} farm{filteredFarms.length !== 1 ? "s" : ""}
        </span>
      </div>

      {/* Zone legend bar */}
      {showRiskZones && (
        <div style={{ display: "flex", gap: 16, marginBottom: 10, padding: "8px 14px", background: C.gray4, borderRadius: 10, flexWrap: "wrap", alignItems: "center" }}>
          <span style={{ fontSize: 11, fontWeight: 700, color: C.gray }}>Risk Zones:</span>
          {[[C.red,"Red 0-3km Critical"],[C.yellow,"Yellow 3-8km High"],[C.green,"Green 8-15km Watch"]].map(([c, l]) => (
            <div key={l} style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 11, color: C.gray }}>
              <div style={{ width: 10, height: 10, borderRadius: 2, background: c, opacity: 0.8 }} />{l}
            </div>
          ))}
        </div>
      )}

      {/* Map */}
      <div style={{ position: "relative", borderRadius: 16, overflow: "hidden", height: 440, marginBottom: 16, boxShadow: "0 4px 24px rgba(0,0,0,0.18)" }}>
        {loading ? (
          <div style={{ height: "100%", background: C.mapBg, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 12 }}>
            <div style={{ width: 36, height: 36, border: `3px solid ${C.green}`, borderTopColor: "transparent", borderRadius: "50%", animation: "spin 0.8s linear infinite" }} />
            <p style={{ color: "rgba(255,255,255,0.5)", fontSize: 13 }}>Loading map data…</p>
          </div>
        ) : error ? (
          <div style={{ height: "100%", background: C.mapBg, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <div style={{ textAlign: "center" }}>
              <AlertTriangle size={32} color={C.orange} style={{ marginBottom: 8 }} />
              <p style={{ color: "rgba(255,255,255,0.7)", fontSize: 13 }}>{error}</p>
              <button onClick={load} style={{ marginTop: 10, padding: "8px 18px", borderRadius: 10, background: C.green, border: "none", color: C.white, cursor: "pointer", fontSize: 12, fontWeight: 600 }}>Retry</button>
            </div>
          </div>
        ) : (
          <GISMapSVG
            farms={filteredFarms}
            outbreaks={filteredOutbreaks}
            selectedOutbreak={selectedOutbreak}
            onFarmClick={handleFarmClick}
            onOutbreakClick={handleOutbreakClick}
            showRiskZones={showRiskZones}
            bounds={bounds}
          />
        )}
        {selectedFarm && <PopupCard item={selectedFarm} type="farm" onClose={() => setSelectedFarm(null)} onAnalyse={handleAnalyse} />}
        {selectedOutbreak && <PopupCard item={selectedOutbreak} type="outbreak" onClose={() => { setSelectedOutbreak(null); setNearbyData(null); }} onAnalyse={() => {}} />}
      </div>

      {/* Risk Details Panel */}
      {aiTarget && <RiskDetailsPanel farm={aiTarget} outbreaks={outbreaks} onClose={() => setAiTarget(null)} />}

      {/* Nearby Farms Panel */}
      {nearbyData && (
        <div style={{ background: C.white, borderRadius: 16, border: `1.5px solid ${C.orange}30`, padding: 18, marginBottom: 16 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
            <Info size={16} color={C.orange} />
            <h3 style={{ fontFamily: "Poppins, sans-serif", fontSize: 14, fontWeight: 700, color: C.dark, margin: 0 }}>
              Nearby Farm Exposure — {nearbyData.radiusKm} km Radius
            </h3>
          </div>
          <div style={{ background: C.orangeL, borderRadius: 10, padding: "10px 14px", marginBottom: 12, fontSize: 12, color: C.orange }}>
            <strong>Note:</strong> These farms are within the potential exposure zone. Not confirmed infected — precautionary assessment only.
          </div>
          {!nearbyData.nearbyFarms?.length ? (
            <p style={{ fontSize: 13, color: C.gray, textAlign: "center", padding: "20px 0" }}>No farms within {nearbyData.radiusKm} km radius</p>
          ) : nearbyData.nearbyFarms.map((f, i) => {
            const ai = calcAIRisk(f, outbreaks);
            return (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 0", borderBottom: `1px solid ${C.gray3}` }}>
                <div style={{ width: 36, height: 36, borderRadius: 10, background: C.orangeL, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <MapPin size={16} color={C.orange} />
                </div>
                <div style={{ flex: 1 }}>
                  <p style={{ fontSize: 13, fontWeight: 600, color: C.dark, margin: 0 }}>{f.farmName || f.farmId}</p>
                  <p style={{ fontSize: 11, color: C.gray, margin: "2px 0 0" }}>{f.district} · {f.farmType}</p>
                </div>
                <div style={{ textAlign: "right" }}>
                  <p style={{ fontSize: 13, fontWeight: 700, color: C.orange, margin: 0 }}>{Number(f.distanceKm).toFixed(2)} km</p>
                  {ai && <span style={{ fontSize: 10, fontWeight: 700, color: ai.color, background: ai.color + "18", padding: "2px 8px", borderRadius: 6 }}>{ai.level} · {ai.score}/100</span>}
                </div>
                <button onClick={() => handleAnalyse(f)} style={{ padding: "6px 10px", borderRadius: 8, background: C.purpleL, border: "none", cursor: "pointer", fontSize: 11, fontWeight: 700, color: C.purple, flexShrink: 0 }}>
                  View Details
                </button>
              </div>
            );
          })}
        </div>
      )}

      {/* Farm Risk Assessment Section */}
      {atRiskFarms.length > 0 && !aiTarget && (
        <div style={{ background: C.white, borderRadius: 16, border: `1px solid ${C.gray3}`, padding: 18, marginBottom: 16 }}>
          {/* Section header */}
          <div style={{ marginBottom: 6 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
              <Shield size={16} color={C.purple} />
              <h3 style={{ fontFamily: "Poppins, sans-serif", fontSize: 15, fontWeight: 700, color: C.dark, margin: 0 }}>Farm Risk Assessment</h3>
              <span style={{ fontSize: 10, fontWeight: 700, background: C.purpleL, color: C.purple, padding: "2px 8px", borderRadius: 8, letterSpacing: 0.5 }}>AI-ASSISTED</span>
            </div>
            <p style={{ fontSize: 12, color: C.gray, margin: 0 }}>Identifies farms that may require additional attention based on available risk factors. This is not a disease diagnosis.</p>
          </div>
          <div style={{ height: 1, background: C.gray3, margin: "12px 0" }} />
          {atRiskFarms.map((f, i) => {
            const r = f.aiRisk;
            return (
              <div key={i} style={{ padding: "14px 0", borderBottom: i < atRiskFarms.length - 1 ? `1px solid ${C.gray3}` : "none" }}>
                <div style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
                  {/* Color indicator */}
                  <div style={{ width: 40, height: 40, borderRadius: 11, background: r.color + "18", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 2 }}>
                    <Activity size={18} color={r.color} />
                  </div>
                  {/* Farm info */}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap", marginBottom: 4 }}>
                      <p style={{ fontSize: 13, fontWeight: 700, color: C.dark, margin: 0 }}>{f.farmName}</p>
                      <span style={{ fontSize: 11, fontWeight: 700, color: r.color, background: r.color + "15", padding: "2px 10px", borderRadius: 20, border: `1px solid ${r.color}25` }}>
                        {r.level} RISK
                      </span>
                    </div>
                    <p style={{ fontSize: 11, color: C.gray, margin: "0 0 8px" }}>{f.district} · {f.farmType}</p>
                    {/* Score bar */}
                    <div style={{ marginBottom: 8 }}>
                      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 3 }}>
                        <span style={{ fontSize: 11, color: C.gray }}>Risk Score</span>
                        <span style={{ fontSize: 11, fontWeight: 700, color: r.color }}>{r.score}/100</span>
                      </div>
                      <div style={{ height: 6, background: C.gray3, borderRadius: 4, overflow: "hidden" }}>
                        <div style={{ height: "100%", width: `${r.score}%`, background: r.color, borderRadius: 4 }} />
                      </div>
                    </div>
                    {/* Risk tags */}
                    <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                      {r.riskTags.map((tag, ti) => (
                        <span key={ti} style={{ fontSize: 10, fontWeight: 600, padding: "3px 8px", borderRadius: 8,
                          color: tag.status === "ok" ? C.green : tag.status === "warn" ? C.red : C.yellow,
                          background: (tag.status === "ok" ? C.green : tag.status === "warn" ? C.red : C.yellow) + "12",
                          border: `1px solid ${(tag.status === "ok" ? C.green : tag.status === "warn" ? C.red : C.yellow)}25` }}>
                          {tag.status === "ok" ? "✓" : "⚠"} {tag.label}
                        </span>
                      ))}
                    </div>
                  </div>
                  {/* Button */}
                  <button onClick={() => handleAnalyse(f)}
                    style={{ padding: "8px 14px", borderRadius: 10, background: C.purpleL, border: `1px solid ${C.purple}20`, cursor: "pointer", fontSize: 11, fontWeight: 700, color: C.purple, whiteSpace: "nowrap", flexShrink: 0 }}>
                    View Risk Details
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Active Outbreaks List */}
      {filteredOutbreaks.length > 0 && (
        <div style={{ background: C.white, borderRadius: 16, border: `1px solid ${C.gray3}`, padding: 18 }}>
          <h3 style={{ fontFamily: "Poppins, sans-serif", fontSize: 14, fontWeight: 700, color: C.dark, marginBottom: 14, marginTop: 0 }}>
            Active Outbreaks ({filteredOutbreaks.length})
          </h3>
          {filteredOutbreaks.map((o, i) => {
            const sev = (o.severity || o.riskLevel || "").toLowerCase();
            const col = sev === "high" ? C.red : sev === "moderate" ? C.yellow : C.green;
            return (
              <div key={i} onClick={() => handleOutbreakClick(o)}
                style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 0", borderBottom: `1px solid ${C.gray3}`, cursor: "pointer" }}>
                <div style={{ width: 10, height: 10, borderRadius: "50%", background: col, flexShrink: 0 }} />
                <div style={{ flex: 1 }}>
                  <p style={{ fontSize: 13, fontWeight: 600, color: C.dark, margin: 0 }}>{o.suspectedDisease || o.diseaseName}</p>
                  <p style={{ fontSize: 11, color: C.gray, margin: "2px 0 0" }}>{o.farmName || o.district} · {o.district}{o.state ? `, ${o.state}` : ""}</p>
                </div>
                <div style={{ textAlign: "right" }}>
                  <span style={{ fontSize: 11, fontWeight: 700, color: col, background: col + "18", padding: "3px 10px", borderRadius: 10, display: "block" }}>{(o.severity || o.riskLevel || "LOW").toUpperCase()}</span>
                  {o.affectedAnimals > 0 && <span style={{ fontSize: 10, color: C.gray }}>{o.affectedAnimals} affected</span>}
                </div>
              </div>
            );
          })}
        </div>
      )}

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}
