// "use client";

// import { useState } from "react";
// import axios from "axios";
// import {
//   FlaskConical, BarChart3, Quote,
//   Loader2, AlertTriangle, CheckCircle2,
//   ChevronDown, ChevronUp, ExternalLink,
//   RefreshCw, Sparkles
// } from "lucide-react";

// const API = "https://abu-sameer-66-scipeerai-api.hf.space";

// interface Flag {
//   flag_type: string;
//   severity: string;
//   description: string;
//   evidence: string;
//   suggestion: string;
//   issue?: string;
// }
// interface Result {
//   module: string;
//   risk_level: string;
//   risk_score: number;
//   summary: string;
//   flags: Flag[];
//   flags_count: number;
// }

// const MODULES = [
//   { id: "statistics",      label: "Statistical Audit",      icon: BarChart3,     endpoint: "/api/v1/analyze/statistics",      desc: "p-hacking · sample size · round numbers" },
//   { id: "methodology",     label: "Methodology Checker",    icon: FlaskConical,  endpoint: "/api/v1/analyze/methodology",     desc: "causation · control groups · timeframe" },
//   { id: "citations",       label: "Citation Integrity",     icon: Quote,         endpoint: "/api/v1/analyze/citations",       desc: "self-citation · unsupported claims" },
//   { id: "reproducibility", label: "Reproducibility Scan",   icon: RefreshCw,     endpoint: "/api/v1/analyze/reproducibility", desc: "code · data · ethics · preregistration" },
//   { id: "novelty",         label: "Novelty Scorer",         icon: Sparkles,      endpoint: "/api/v1/analyze/novelty",         desc: "literature search · novelty estimation" },
//   { id: "grim",            label: "GRIM Test",              icon: AlertTriangle, endpoint: "/api/v1/analyze/grim",            desc: "impossible means · data fabrication" },
//   { id: "sprite",          label: "SPRITE Test",            icon: CheckCircle2,  endpoint: "/api/v1/analyze/sprite",          desc: "impossible distributions · SD verification" },
//   { id: "granularity",     label: "Granularity Analyzer",   icon: BarChart3,     endpoint: "/api/v1/analyze/granularity",     desc: "digit preference · Benford law · round numbers" },
//   { id: "pcurve",          label: "P-Curve Analyzer",       icon: BarChart3,     endpoint: "/api/v1/analyze/pcurve",          desc: "publication bias · p-value clustering" },
//   { id: "effect_size",     label: "Effect Size Validator",  icon: BarChart3,     endpoint: "/api/v1/analyze/effect_size",     desc: "Cohen d · power analysis · inflated effects" },
//   { id: "retraction",      label: "Retraction Checker",     icon: AlertTriangle, endpoint: "/api/v1/analyze/retraction",      desc: "retracted citations · CrossRef live API" },
//   { id: "cartel",          label: "Citation Cartel",        icon: Quote,         endpoint: "/api/v1/analyze/cartel",          desc: "citation rings · network manipulation" },
//   { id: "llm",             label: "LLM Detector",           icon: AlertTriangle, endpoint: "/api/v1/analyze/llm",             desc: "AI-generated text · burstiness · phrases" },
// ];

// function RiskBar({ score, level }: { score: number; level: string }) {
//   const color = level === "critical" ? "#ef4444" : level === "high" ? "#f97316" : level === "medium" ? "#eab308" : "#22c55e";
//   return (
//     <div className="w-full">
//       <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
//         <span style={{ fontSize: 11, color: "rgba(255,255,255,0.35)", letterSpacing: "0.15em", textTransform: "uppercase" }}>Risk Score</span>
//         <span style={{ fontSize: 13, fontWeight: 800, color, fontFamily: "Space Mono, monospace" }}>{Math.round(score * 100)}%</span>
//       </div>
//       <div style={{ height: 3, background: "rgba(255,255,255,0.06)", borderRadius: 2, overflow: "hidden" }}>
//         <div style={{ height: "100%", width: `${score * 100}%`, background: color, borderRadius: 2, transition: "width 1.2s cubic-bezier(0.4,0,0.2,1)", boxShadow: `0 0 8px ${color}88` }} />
//       </div>
//     </div>
//   );
// }

// function Badge({ level }: { level: string }) {
//   const cfg: Record<string, { bg: string; text: string; border: string }> = {
//     critical: { bg: "rgba(239,68,68,0.12)",  text: "#ef4444", border: "rgba(239,68,68,0.3)" },
//     high:     { bg: "rgba(249,115,22,0.12)", text: "#f97316", border: "rgba(249,115,22,0.3)" },
//     medium:   { bg: "rgba(234,179,8,0.12)",  text: "#eab308", border: "rgba(234,179,8,0.3)" },
//     low:      { bg: "rgba(34,197,94,0.12)",  text: "#22c55e", border: "rgba(34,197,94,0.3)" },
//   };
//   const c = cfg[level] || cfg.low;
//   return (
//     <span style={{ background: c.bg, color: c.text, border: `1px solid ${c.border}`, padding: "3px 10px", borderRadius: 4, fontSize: 10, fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", fontFamily: "Space Mono, monospace" }}>
//       {level}
//     </span>
//   );
// }

// function FlagItem({ flag }: { flag: Flag }) {
//   const [open, setOpen] = useState(false);
//   const color = flag.severity === "high" ? "#ef4444" : flag.severity === "medium" ? "#eab308" : "#22c55e";
//   return (
//     <div style={{ border: `1px solid ${color}22`, borderLeft: `2px solid ${color}`, borderRadius: 6, marginBottom: 8, overflow: "hidden", background: `${color}06` }}>
//       <button onClick={() => setOpen(!open)} style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 14px", background: "transparent", border: "none", cursor: "pointer", textAlign: "left" }}>
//         <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
//           <span style={{ width: 6, height: 6, borderRadius: "50%", background: color, flexShrink: 0, boxShadow: `0 0 6px ${color}` }} />
//           <span style={{ fontSize: 11, fontWeight: 700, color: "rgba(255,255,255,0.85)", letterSpacing: "0.1em", textTransform: "uppercase", fontFamily: "Space Mono, monospace" }}>
//             {flag.flag_type.replace(/_/g, " ")}
//           </span>
//           <span style={{ fontSize: 10, padding: "2px 8px", borderRadius: 3, background: `${color}18`, color, fontWeight: 700, letterSpacing: "0.1em" }}>
//             {flag.severity}
//           </span>
//         </div>
//         <span style={{ color: "rgba(255,255,255,0.2)", fontSize: 12 }}>{open ? "▲" : "▼"}</span>
//       </button>
//       {open && (
//         <div style={{ padding: "0 14px 14px", borderTop: "1px solid rgba(255,255,255,0.04)" }}>
//           <p style={{ fontSize: 12, color: "rgba(255,255,255,0.6)", lineHeight: 1.7, marginTop: 10 }}>{flag.description || flag.issue}</p>
//           {flag.evidence && (
//             <div style={{ marginTop: 8, padding: "8px 12px", background: "rgba(0,0,0,0.4)", borderRadius: 4, fontFamily: "Space Mono, monospace", fontSize: 11 }}>
//               <span style={{ color: "#7dd3fc" }}>EVIDENCE › </span>
//               <span style={{ color: "rgba(255,255,255,0.5)" }}>{flag.evidence}</span>
//             </div>
//           )}
//           {flag.suggestion && (
//             <div style={{ marginTop: 6, padding: "8px 12px", background: "rgba(0,0,0,0.3)", borderRadius: 4, fontSize: 11 }}>
//               <span style={{ color: "#86efac" }}>SUGGESTION › </span>
//               <span style={{ color: "rgba(255,255,255,0.5)" }}>{flag.suggestion}</span>
//             </div>
//           )}
//         </div>
//       )}
//     </div>
//   );
// }

// function ModuleCard({ r, index }: { r: Result; index: number }) {
//   return (
//     <div style={{ background: "linear-gradient(135deg, rgba(13,17,27,0.98) 0%, rgba(17,22,34,0.95) 100%)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 16, padding: 28, marginBottom: 16, position: "relative", overflow: "hidden" }}>
//       <div style={{ position: "absolute", top: 0, right: 0, width: 120, height: 120, background: "radial-gradient(circle at top right, rgba(56,189,248,0.04) 0%, transparent 70%)" }} />
//       <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 20, flexWrap: "wrap", gap: 12 }}>
//         <div>
//           <div style={{ fontSize: 10, color: "rgba(56,189,248,0.6)", letterSpacing: "0.3em", textTransform: "uppercase", fontFamily: "Space Mono, monospace", marginBottom: 6 }}>
//             ANALYSIS — {String(index + 1).padStart(2, "0")}
//           </div>
//           <h3 style={{ fontSize: 20, fontWeight: 800, color: "#fff", letterSpacing: "-0.02em", margin: 0 }}>{r.module}</h3>
//         </div>
//         <Badge level={r.risk_level} />
//       </div>
//       <div style={{ marginBottom: 20 }}>
//         <RiskBar score={r.risk_score} level={r.risk_level} />
//       </div>
//       <p style={{ fontSize: 13, color: "rgba(255,255,255,0.5)", lineHeight: 1.7, marginBottom: 20 }}>{r.summary}</p>
//       {r.flags.length === 0 ? (
//         <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 12, color: "#22c55e" }}>
//           <span style={{ textShadow: "0 0 8px #22c55e" }}>✓</span>
//           <span>No anomalies detected in this dimension</span>
//         </div>
//       ) : (
//         <>
//           <div style={{ fontSize: 10, color: "rgba(255,255,255,0.2)", letterSpacing: "0.25em", textTransform: "uppercase", fontFamily: "Space Mono, monospace", marginBottom: 12 }}>
//             {r.flags_count} ANOMAL{r.flags_count === 1 ? "Y" : "IES"} DETECTED
//           </div>
//           {r.flags.map((f, i) => <FlagItem key={i} flag={f} />)}
//         </>
//       )}
//     </div>
//   );
// }

// function StatPill({ value, label }: { value: string; label: string }) {
//   return (
//     <div style={{ textAlign: "center" }}>
//       <div style={{ fontSize: 22, fontWeight: 900, color: "#fff", fontFamily: "Space Mono, monospace", letterSpacing: "-0.02em" }}>{value}</div>
//       <div style={{ fontSize: 10, color: "rgba(255,255,255,0.3)", letterSpacing: "0.2em", textTransform: "uppercase", marginTop: 2 }}>{label}</div>
//     </div>
//   );
// }

// export default function Home() {
//   const [text, setText]       = useState("");
//   const [author, setAuthor]   = useState("");
//   const [loading, setLoading] = useState(false);
//   const [results, setResults] = useState<Result[]>([]);
//   const [done, setDone]       = useState(false);
//   const [notice, setNotice]   = useState("");
//   const [step, setStep]       = useState("");

//   const notify = (msg: string) => { setNotice(msg); setTimeout(() => setNotice(""), 4000); };

//   const run = async () => {
//     if (text.trim().length < 50) { notify("Minimum 50 characters required."); return; }
//     setLoading(true); setResults([]); setDone(false);
//     const out: Result[] = [];
//     for (const m of MODULES) {
//       setStep(`Running ${m.label}...`);
//       try {
//         await new Promise(resolve => setTimeout(resolve, 800));
//         const payload: Record<string, string> = { text };
//         if (m.id === "citations")    payload.author_name = author;
//         if (m.id === "methodology")  payload.abstract = "";
//         if (m.id === "novelty")      payload.title = "";
//         if (m.id === "grim")         payload.title = "";
//         if (m.id === "sprite")       payload.title = "";
//         if (m.id === "granularity")  payload.title = "";
//         if (m.id === "pcurve")       payload.title = "";
//         if (m.id === "effect_size")  payload.title = "";
//         if (m.id === "retraction")   payload.title = "";
//         if (m.id === "cartel")       payload.title = "";
//         if (m.id === "llm")          payload.title = "";
//         const { data } = await axios.post(`${API}${m.endpoint}`, payload, {
//           timeout: 35000,
//           headers: { "Content-Type": "application/json" }
//         });
//         out.push({
//           module:      m.label,
//           risk_level:  data.risk_level,
//           risk_score:  data.risk_score ?? data.reproducibility_score ?? data.novelty_score ?? data.grim_score ?? data.sprite_score ?? data.granularity_score ?? data.pcurve_score ?? data.effect_score ?? data.retraction_score ?? data.cartel_score ?? data.llm_score ?? 0,
//           summary:     data.summary,
//           flags:       data.flags || [],
//           flags_count: data.flags_count || 0,
//         });
//       } catch { notify(`${m.label} module unavailable.`); }
//     }
//     setResults(out); setDone(true); setLoading(false); setStep("");
//     notify("Integrity analysis sequence complete.");
//   };

//   const overall      = results.length ? results.reduce((a, b) => a + b.risk_score, 0) / results.length : 0;
//   const overallLevel = overall >= 0.7 ? "critical" : overall >= 0.4 ? "high" : overall >= 0.2 ? "medium" : "low";
//   const overallColor = overallLevel === "critical" ? "#ef4444" : overallLevel === "high" ? "#f97316" : overallLevel === "medium" ? "#eab308" : "#22c55e";
//   const totalFlags   = results.reduce((a, b) => a + b.flags_count, 0);

//   return (
//     <div style={{ minHeight: "100vh", background: "#080c14", color: "#fff", fontFamily: "system-ui, sans-serif" }}>

//       <style>{`
//         @import url('https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&display=swap');
//         * { box-sizing: border-box; }
//         body { background: #080c14; }
//         textarea, input { font-family: 'Space Mono', monospace !important; }
//         textarea::placeholder, input::placeholder { color: rgba(255,255,255,0.18) !important; }
//         textarea:focus, input:focus { outline: none; }
//         ::-webkit-scrollbar { width: 4px; }
//         ::-webkit-scrollbar-track { background: #080c14; }
//         ::-webkit-scrollbar-thumb { background: rgba(56,189,248,0.3); border-radius: 2px; }
//       `}</style>

//       {notice && (
//         <div style={{ position: "fixed", top: 20, right: 20, zIndex: 100, padding: "10px 18px", background: "rgba(13,17,27,0.98)", border: "1px solid rgba(56,189,248,0.25)", borderRadius: 8, fontSize: 12, color: "rgba(255,255,255,0.8)", backdropFilter: "blur(20px)", fontFamily: "Space Mono, monospace" }}>
//           {notice}
//         </div>
//       )}

//       <div style={{ maxWidth: 760, margin: "0 auto", padding: "0 20px 80px" }}>

//         {/* nav */}
//         <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "24px 0 20px", borderBottom: "1px solid rgba(255,255,255,0.05)", marginBottom: 60 }}>
//           <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
//             <div style={{ width: 7, height: 7, borderRadius: "50%", background: "#22c55e", boxShadow: "0 0 10px #22c55e" }} />
//             <span style={{ fontSize: 11, color: "rgba(255,255,255,0.3)", letterSpacing: "0.25em", textTransform: "uppercase", fontFamily: "Space Mono, monospace" }}>
//               SYSTEM ONLINE // INTEGRITY ENGINE ACTIVE
//             </span>
//           </div>
//           <div style={{ display: "flex", gap: 24 }}>
//             {[
//               { label: "API",       href: `${API}/docs` },
//               { label: "GitHub",    href: "https://github.com/Abu-Sameer-66/SciPeerAI" },
//               { label: "Portfolio", href: "https://sameer-nadeem-portfolio.vercel.app" },
//             ].map((l) => (
//               <a key={l.label} href={l.href} target="_blank" rel="noreferrer"
//                 style={{ fontSize: 11, color: "rgba(255,255,255,0.3)", textDecoration: "none", letterSpacing: "0.1em" }}
//                 onMouseEnter={(e) => (e.currentTarget.style.color = "#38bdf8")}
//                 onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.3)")}>
//                 {l.label} ↗
//               </a>
//             ))}
//           </div>
//         </div>

//         {/* hero */}
//         <div style={{ marginBottom: 64 }}>
//           <div style={{ fontSize: 11, color: "rgba(56,189,248,0.7)", letterSpacing: "0.35em", textTransform: "uppercase", fontFamily: "Space Mono, monospace", marginBottom: 20 }}>
//             /// PROTOCOL: INTEGRITY ANALYSIS
//           </div>
//           <h1 style={{ fontSize: "clamp(48px, 8vw, 80px)", fontWeight: 900, lineHeight: 1, letterSpacing: "-0.04em", marginBottom: 20, color: "#fff" }}>
//             SciPeer<span style={{ color: "#38bdf8" }}>AI</span>
//           </h1>
//           <p style={{ fontSize: 17, color: "rgba(255,255,255,0.45)", lineHeight: 1.7, maxWidth: 540, marginBottom: 32 }}>
//             Automated scientific integrity analysis. Upload paper text and receive a structured, multi-dimensional forensic report — in seconds.
//           </p>
//           <div style={{ display: "flex", gap: 40, padding: "20px 0", borderTop: "1px solid rgba(255,255,255,0.06)", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
//             <StatPill value="14"   label="Modules" />
//             <StatPill value="109"  label="Tests Passing" />
//             <StatPill value="15"   label="API Endpoints" />
//             <StatPill value="Live" label="Deployed" />
//           </div>
//         </div>

//         {/* module overview */}
//         <div style={{ marginBottom: 48 }}>
//           <div style={{ fontSize: 10, color: "rgba(255,255,255,0.25)", letterSpacing: "0.3em", textTransform: "uppercase", fontFamily: "Space Mono, monospace", marginBottom: 16 }}>
//             ANALYSIS DIMENSIONS
//           </div>
//           <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12 }}>
//             {MODULES.map((m, idx) => (
//               <div key={m.id} style={{ padding: "14px 16px", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 10 }}>
//                 <div style={{ fontSize: 10, color: "rgba(56,189,248,0.5)", letterSpacing: "0.25em", fontFamily: "Space Mono, monospace", marginBottom: 6 }}>
//                   EXPERIMENT {String(idx + 1).padStart(2, "0")}
//                 </div>
//                 <div style={{ fontSize: 13, fontWeight: 700, color: "rgba(255,255,255,0.85)", marginBottom: 4 }}>{m.label}</div>
//                 <div style={{ fontSize: 11, color: "rgba(255,255,255,0.3)", lineHeight: 1.5 }}>{m.desc}</div>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* input */}
//         <div style={{ marginBottom: 32 }}>
//           <div style={{ fontSize: 10, color: "rgba(255,255,255,0.25)", letterSpacing: "0.3em", textTransform: "uppercase", fontFamily: "Space Mono, monospace", marginBottom: 16 }}>
//             INPUT TERMINAL
//           </div>
//           <div style={{ background: "linear-gradient(135deg, rgba(13,17,27,0.98), rgba(17,22,34,0.95))", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 16, padding: 24 }}>
//             <div style={{ fontSize: 11, color: "rgba(56,189,248,0.5)", letterSpacing: "0.2em", textTransform: "uppercase", fontFamily: "Space Mono, monospace", marginBottom: 10 }}>
//               PAPER TEXT *
//             </div>
//             <textarea
//               value={text}
//               onChange={(e) => setText(e.target.value)}
//               placeholder="Paste abstract, methods section, or full paper text here..."
//               rows={8}
//               style={{ width: "100%", resize: "vertical", background: "rgba(0,0,0,0.4)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 10, padding: "14px 16px", color: "rgba(255,255,255,0.8)", fontSize: 13, lineHeight: 1.7, transition: "border-color 0.2s" }}
//               onFocus={(e) => e.target.style.borderColor = "rgba(56,189,248,0.35)"}
//               onBlur={(e)  => e.target.style.borderColor = "rgba(255,255,255,0.07)"}
//             />
//             <div style={{ fontSize: 11, color: "rgba(56,189,248,0.5)", letterSpacing: "0.2em", textTransform: "uppercase", fontFamily: "Space Mono, monospace", marginBottom: 10, marginTop: 16 }}>
//               AUTHOR NAME (optional — self-citation detection)
//             </div>
//             <input
//               value={author}
//               onChange={(e) => setAuthor(e.target.value)}
//               placeholder="e.g. Sameer Nadeem"
//               style={{ width: "100%", background: "rgba(0,0,0,0.4)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 10, padding: "12px 16px", color: "rgba(255,255,255,0.8)", fontSize: 13, transition: "border-color 0.2s" }}
//               onFocus={(e) => e.target.style.borderColor = "rgba(56,189,248,0.35)"}
//               onBlur={(e)  => e.target.style.borderColor = "rgba(255,255,255,0.07)"}
//             />
//             <button
//               onClick={run}
//               disabled={loading}
//               style={{ width: "100%", marginTop: 20, padding: "15px 24px", background: loading ? "rgba(255,255,255,0.04)" : "rgba(56,189,248,0.1)", border: `1px solid ${loading ? "rgba(255,255,255,0.06)" : "rgba(56,189,248,0.3)"}`, borderRadius: 10, color: loading ? "rgba(255,255,255,0.3)" : "#38bdf8", fontSize: 12, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", cursor: loading ? "not-allowed" : "pointer", fontFamily: "Space Mono, monospace", transition: "all 0.2s" }}
//               onMouseEnter={(e) => { if (!loading) { e.currentTarget.style.background = "rgba(56,189,248,0.15)"; e.currentTarget.style.boxShadow = "0 0 20px rgba(56,189,248,0.1)"; } }}
//               onMouseLeave={(e) => { e.currentTarget.style.background = loading ? "rgba(255,255,255,0.04)" : "rgba(56,189,248,0.1)"; e.currentTarget.style.boxShadow = "none"; }}>
//               {loading ? `⟳ ${step || "Initializing..."}` : "INITIALIZE INTEGRITY SCAN ◈"}
//             </button>
//           </div>
//         </div>

//         {/* overall */}
//         {done && results.length > 0 && (
//           <div style={{ background: "linear-gradient(135deg, rgba(13,17,27,0.98), rgba(17,22,34,0.95))", border: `1px solid ${overallColor}22`, borderRadius: 16, padding: 28, marginBottom: 28, position: "relative", overflow: "hidden" }}>
//             <div style={{ position: "absolute", top: 0, right: 0, width: 200, height: 200, background: `radial-gradient(circle at top right, ${overallColor}08 0%, transparent 70%)` }} />
//             <div style={{ fontSize: 10, color: "rgba(255,255,255,0.25)", letterSpacing: "0.3em", textTransform: "uppercase", fontFamily: "Space Mono, monospace", marginBottom: 20 }}>
//               AGGREGATE INTEGRITY ASSESSMENT
//             </div>
//             <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 20 }}>
//               <div>
//                 <div style={{ fontSize: 64, fontWeight: 900, lineHeight: 1, color: overallColor, fontFamily: "Space Mono, monospace", letterSpacing: "-0.04em", textShadow: `0 0 40px ${overallColor}44` }}>
//                   {Math.round(overall * 100)}%
//                 </div>
//                 <div style={{ marginTop: 10 }}><Badge level={overallLevel} /></div>
//               </div>
//               <div style={{ display: "flex", flexDirection: "column", gap: 10, minWidth: 200 }}>
//                 {results.map((r, i) => (
//                   <div key={i} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12 }}>
//                     <span style={{ fontSize: 11, color: "rgba(255,255,255,0.4)" }}>{r.module}</span>
//                     <span style={{ fontSize: 11, fontWeight: 700, fontFamily: "Space Mono, monospace", color: r.risk_level === "critical" ? "#ef4444" : r.risk_level === "high" ? "#f97316" : r.risk_level === "medium" ? "#eab308" : "#22c55e" }}>
//                       {Math.round(r.risk_score * 100)}%
//                     </span>
//                   </div>
//                 ))}
//               </div>
//             </div>
//             <div style={{ marginTop: 20, paddingTop: 16, borderTop: "1px solid rgba(255,255,255,0.05)", fontSize: 11, color: "rgba(255,255,255,0.25)", fontFamily: "Space Mono, monospace" }}>
//               {totalFlags} ANOMALIES DETECTED · {results.length} DIMENSIONS ANALYZED
//             </div>
//           </div>
//         )}

//         {done && (
//           <div style={{ fontSize: 10, color: "rgba(255,255,255,0.25)", letterSpacing: "0.3em", textTransform: "uppercase", fontFamily: "Space Mono, monospace", marginBottom: 16 }}>
//             DETAILED ANALYSIS REPORT
//           </div>
//         )}

//         {results.map((r, i) => <ModuleCard key={i} r={r} index={i} />)}

//         {/* footer */}
//         <div style={{ textAlign: "center", marginTop: 60, paddingTop: 24, borderTop: "1px solid rgba(255,255,255,0.04)" }}>
//           <div style={{ fontSize: 11, color: "rgba(255,255,255,0.18)", fontFamily: "Space Mono, monospace", letterSpacing: "0.15em" }}>
//             ENGINEERED BY{" "}
//             <a href="https://sameer-nadeem-portfolio.vercel.app" target="_blank" rel="noreferrer"
//               style={{ color: "rgba(56,189,248,0.4)", textDecoration: "none" }}
//               onMouseEnter={(e) => (e.currentTarget.style.color = "#38bdf8")}
//               onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(56,189,248,0.4)")}>
//               SAMEER NADEEM
//             </a>
//             {" "}// SciPeerAI v1.8.0 // 14 MODULES // BUILDING INTELLIGENCE
//           </div>
//         </div>

//       </div>
//     </div>
//   );
// }


"use client";

import { useState, useRef } from "react";
import axios from "axios";

const API = "https://abu-sameer-66-scipeerai-api.hf.space";

interface Flag {
  flag_type: string;
  severity: string;
  description: string;
  evidence: string;
  suggestion: string;
  issue?: string;
}
interface Result {
  module: string;
  risk_level: string;
  risk_score: number;
  summary: string;
  flags: Flag[];
  flags_count: number;
}
interface PDFMeta {
  paper_title: string;
  page_count: number;
  figure_count: number;
  file_size_kb: number;
  sha256: string;
  overall_score: number;
  overall_risk: string;
  integrity_verdict: string;
  top_flags: string[];
  analyzed_by: string;
}

const MODULES = [
  { id: "statistics",      label: "Statistical Audit",      endpoint: "/api/v1/analyze/statistics",      desc: "p-hacking · sample size · round numbers" },
  { id: "methodology",     label: "Methodology Checker",    endpoint: "/api/v1/analyze/methodology",     desc: "causation · control groups · timeframe" },
  { id: "citations",       label: "Citation Integrity",     endpoint: "/api/v1/analyze/citations",       desc: "self-citation · unsupported claims" },
  { id: "reproducibility", label: "Reproducibility Scan",   endpoint: "/api/v1/analyze/reproducibility", desc: "code · data · ethics · preregistration" },
  { id: "novelty",         label: "Novelty Scorer",         endpoint: "/api/v1/analyze/novelty",         desc: "literature search · novelty estimation" },
  { id: "grim",            label: "GRIM Test",              endpoint: "/api/v1/analyze/grim",            desc: "impossible means · data fabrication" },
  { id: "sprite",          label: "SPRITE Test",            endpoint: "/api/v1/analyze/sprite",          desc: "impossible distributions · SD verification" },
  { id: "granularity",     label: "Granularity Analyzer",   endpoint: "/api/v1/analyze/granularity",     desc: "digit preference · Benford law · round numbers" },
  { id: "pcurve",          label: "P-Curve Analyzer",       endpoint: "/api/v1/analyze/pcurve",          desc: "publication bias · p-value clustering" },
  { id: "effect_size",     label: "Effect Size Validator",  endpoint: "/api/v1/analyze/effect_size",     desc: "Cohen d · power analysis · inflated effects" },
  { id: "retraction",      label: "Retraction Checker",     endpoint: "/api/v1/analyze/retraction",      desc: "retracted citations · CrossRef live API" },
  { id: "cartel",          label: "Citation Cartel",        endpoint: "/api/v1/analyze/cartel",          desc: "citation rings · network manipulation" },
  { id: "llm",             label: "LLM Detector",           endpoint: "/api/v1/analyze/llm",             desc: "AI-generated text · burstiness · phrases" },
];

function RiskBar({ score, level }: { score: number; level: string }) {
  const color = level === "critical" ? "#ef4444" : level === "high" ? "#f97316" : level === "medium" ? "#eab308" : "#22c55e";
  return (
    <div className="w-full">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
        <span style={{ fontSize: 11, color: "rgba(255,255,255,0.35)", letterSpacing: "0.15em", textTransform: "uppercase" }}>Risk Score</span>
        <span style={{ fontSize: 13, fontWeight: 800, color, fontFamily: "Space Mono, monospace" }}>{Math.round(score * 100)}%</span>
      </div>
      <div style={{ height: 3, background: "rgba(255,255,255,0.06)", borderRadius: 2, overflow: "hidden" }}>
        <div style={{ height: "100%", width: `${score * 100}%`, background: color, borderRadius: 2, transition: "width 1.2s cubic-bezier(0.4,0,0.2,1)", boxShadow: `0 0 8px ${color}88` }} />
      </div>
    </div>
  );
}

function Badge({ level }: { level: string }) {
  const cfg: Record<string, { bg: string; text: string; border: string }> = {
    critical: { bg: "rgba(239,68,68,0.12)",  text: "#ef4444", border: "rgba(239,68,68,0.3)" },
    high:     { bg: "rgba(249,115,22,0.12)", text: "#f97316", border: "rgba(249,115,22,0.3)" },
    medium:   { bg: "rgba(234,179,8,0.12)",  text: "#eab308", border: "rgba(234,179,8,0.3)" },
    low:      { bg: "rgba(34,197,94,0.12)",  text: "#22c55e", border: "rgba(34,197,94,0.3)" },
  };
  const c = cfg[level?.toLowerCase()] || cfg.low;
  return (
    <span style={{ background: c.bg, color: c.text, border: `1px solid ${c.border}`, padding: "3px 10px", borderRadius: 4, fontSize: 10, fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", fontFamily: "Space Mono, monospace" }}>
      {level}
    </span>
  );
}

function FlagItem({ flag }: { flag: Flag }) {
  const [open, setOpen] = useState(false);
  const color = flag.severity === "high" ? "#ef4444" : flag.severity === "medium" ? "#eab308" : "#22c55e";
  return (
    <div style={{ border: `1px solid ${color}22`, borderLeft: `2px solid ${color}`, borderRadius: 6, marginBottom: 8, overflow: "hidden", background: `${color}06` }}>
      <button onClick={() => setOpen(!open)} style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 14px", background: "transparent", border: "none", cursor: "pointer", textAlign: "left" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <span style={{ width: 6, height: 6, borderRadius: "50%", background: color, flexShrink: 0, boxShadow: `0 0 6px ${color}` }} />
          <span style={{ fontSize: 11, fontWeight: 700, color: "rgba(255,255,255,0.85)", letterSpacing: "0.1em", textTransform: "uppercase", fontFamily: "Space Mono, monospace" }}>
            {flag.flag_type.replace(/_/g, " ")}
          </span>
          <span style={{ fontSize: 10, padding: "2px 8px", borderRadius: 3, background: `${color}18`, color, fontWeight: 700, letterSpacing: "0.1em" }}>
            {flag.severity}
          </span>
        </div>
        <span style={{ color: "rgba(255,255,255,0.2)", fontSize: 12 }}>{open ? "▲" : "▼"}</span>
      </button>
      {open && (
        <div style={{ padding: "0 14px 14px", borderTop: "1px solid rgba(255,255,255,0.04)" }}>
          <p style={{ fontSize: 12, color: "rgba(255,255,255,0.6)", lineHeight: 1.7, marginTop: 10 }}>{flag.description || flag.issue}</p>
          {flag.evidence && (
            <div style={{ marginTop: 8, padding: "8px 12px", background: "rgba(0,0,0,0.4)", borderRadius: 4, fontFamily: "Space Mono, monospace", fontSize: 11 }}>
              <span style={{ color: "#7dd3fc" }}>EVIDENCE › </span>
              <span style={{ color: "rgba(255,255,255,0.5)" }}>{flag.evidence}</span>
            </div>
          )}
          {flag.suggestion && (
            <div style={{ marginTop: 6, padding: "8px 12px", background: "rgba(0,0,0,0.3)", borderRadius: 4, fontSize: 11 }}>
              <span style={{ color: "#86efac" }}>SUGGESTION › </span>
              <span style={{ color: "rgba(255,255,255,0.5)" }}>{flag.suggestion}</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function ModuleCard({ r, index }: { r: Result; index: number }) {
  return (
    <div style={{ background: "linear-gradient(135deg, rgba(13,17,27,0.98) 0%, rgba(17,22,34,0.95) 100%)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 16, padding: 28, marginBottom: 16, position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", top: 0, right: 0, width: 120, height: 120, background: "radial-gradient(circle at top right, rgba(56,189,248,0.04) 0%, transparent 70%)" }} />
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 20, flexWrap: "wrap", gap: 12 }}>
        <div>
          <div style={{ fontSize: 10, color: "rgba(56,189,248,0.6)", letterSpacing: "0.3em", textTransform: "uppercase", fontFamily: "Space Mono, monospace", marginBottom: 6 }}>
            ANALYSIS — {String(index + 1).padStart(2, "0")}
          </div>
          <h3 style={{ fontSize: 20, fontWeight: 800, color: "#fff", letterSpacing: "-0.02em", margin: 0 }}>{r.module}</h3>
        </div>
        <Badge level={r.risk_level} />
      </div>
      <div style={{ marginBottom: 20 }}>
        <RiskBar score={r.risk_score} level={r.risk_level} />
      </div>
      <p style={{ fontSize: 13, color: "rgba(255,255,255,0.5)", lineHeight: 1.7, marginBottom: 20 }}>{r.summary}</p>
      {r.flags.length === 0 ? (
        <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 12, color: "#22c55e" }}>
          <span style={{ textShadow: "0 0 8px #22c55e" }}>✓</span>
          <span>No anomalies detected in this dimension</span>
        </div>
      ) : (
        <>
          <div style={{ fontSize: 10, color: "rgba(255,255,255,0.2)", letterSpacing: "0.25em", textTransform: "uppercase", fontFamily: "Space Mono, monospace", marginBottom: 12 }}>
            {r.flags_count} ANOMAL{r.flags_count === 1 ? "Y" : "IES"} DETECTED
          </div>
          {r.flags.map((f, i) => <FlagItem key={i} flag={f} />)}
        </>
      )}
    </div>
  );
}

function StatPill({ value, label }: { value: string; label: string }) {
  return (
    <div style={{ textAlign: "center" }}>
      <div style={{ fontSize: 22, fontWeight: 900, color: "#fff", fontFamily: "Space Mono, monospace", letterSpacing: "-0.02em" }}>{value}</div>
      <div style={{ fontSize: 10, color: "rgba(255,255,255,0.3)", letterSpacing: "0.2em", textTransform: "uppercase", marginTop: 2 }}>{label}</div>
    </div>
  );
}

export default function Home() {
  // ── Text mode state ───────────────────────────────────────────
  const [text, setText]       = useState("");
  const [author, setAuthor]   = useState("");
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<Result[]>([]);
  const [done, setDone]       = useState(false);
  const [step, setStep]       = useState("");

  // ── PDF mode state ────────────────────────────────────────────
  const [mode, setMode]           = useState<"text" | "pdf">("text");
  const [pdfFile, setPdfFile]     = useState<File | null>(null);
  const [pdfLoading, setPdfLoading] = useState(false);
  const [pdfResults, setPdfResults] = useState<Result[]>([]);
  const [pdfMeta, setPdfMeta]     = useState<PDFMeta | null>(null);
  const [pdfDone, setPdfDone]     = useState(false);
  const [dragOver, setDragOver]   = useState(false);
  const fileInputRef              = useRef<HTMLInputElement>(null);

  // ── Shared notice ─────────────────────────────────────────────
  const [notice, setNotice] = useState("");
  const notify = (msg: string) => { setNotice(msg); setTimeout(() => setNotice(""), 4000); };

  // ── Text mode: run all modules ────────────────────────────────
  const run = async () => {
    if (text.trim().length < 50) { notify("Minimum 50 characters required."); return; }
    setLoading(true); setResults([]); setDone(false);
    const out: Result[] = [];
    for (const m of MODULES) {
      setStep(`Running ${m.label}...`);
      try {
        await new Promise(resolve => setTimeout(resolve, 800));
        const payload: Record<string, string> = { text };
        if (m.id === "citations")   payload.author_name = author;
        if (m.id === "methodology") payload.abstract = "";
        if (m.id === "novelty")     payload.title = "";
        const { data } = await axios.post(`${API}${m.endpoint}`, payload, {
          timeout: 35000,
          headers: { "Content-Type": "application/json" }
        });
        out.push({
          module:      m.label,
          risk_level:  data.risk_level,
          risk_score:  data.risk_score ?? data.reproducibility_score ?? data.novelty_score ?? data.grim_score ?? data.sprite_score ?? data.granularity_score ?? data.pcurve_score ?? data.effect_score ?? data.retraction_score ?? data.cartel_score ?? data.llm_score ?? 0,
          summary:     data.summary,
          flags:       data.flags || [],
          flags_count: data.flags_count || 0,
        });
      } catch { notify(`${m.label} unavailable.`); }
    }
    setResults(out); setDone(true); setLoading(false); setStep("");
    notify("Analysis complete.");
  };

  // ── PDF mode: single endpoint call ───────────────────────────
  const runPDF = async () => {
    if (!pdfFile) { notify("Please select a PDF file first."); return; }
    setPdfLoading(true); setPdfResults([]); setPdfMeta(null); setPdfDone(false);
    setStep("Uploading PDF and running 14-module analysis...");
    try {
      const formData = new FormData();
      formData.append("file", pdfFile);
      const { data } = await axios.post(`${API}/api/v1/analyze/full-pdf`, formData, {
        timeout: 120000,
        headers: { "Content-Type": "multipart/form-data" },
      });
      const moduleResults: Result[] = (data.modules || []).map((m: any) => ({
        module:      m.module,
        risk_level:  m.risk_level,
        risk_score:  m.risk_score,
        summary:     m.summary,
        flags:       [],
        flags_count: m.flags_count,
      }));
      setPdfResults(moduleResults);
      setPdfMeta({
        paper_title:      data.paper_title,
        page_count:       data.page_count,
        figure_count:     data.figure_count,
        file_size_kb:     data.file_size_kb,
        sha256:           data.sha256,
        overall_score:    data.overall_score,
        overall_risk:     data.overall_risk,
        integrity_verdict: data.integrity_verdict,
        top_flags:        data.top_flags || [],
        analyzed_by:      data.analyzed_by,
      });
      setPdfDone(true);
      notify("PDF analysis complete — 14 modules executed.");
    } catch (err: any) {
      notify(err?.response?.data?.detail || "PDF analysis failed. Try again.");
    }
    setPdfLoading(false); setStep("");
  };

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (f) { setPdfFile(f); setPdfDone(false); setPdfResults([]); setPdfMeta(null); }
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault(); setDragOver(false);
    const f = e.dataTransfer.files?.[0];
    if (f && f.name.endsWith(".pdf")) {
      setPdfFile(f); setPdfDone(false); setPdfResults([]); setPdfMeta(null);
    } else { notify("Only PDF files accepted."); }
  };

  // ── Shared computed ───────────────────────────────────────────
  const activeResults = mode === "text" ? results : pdfResults;
  const activeDone    = mode === "text" ? done    : pdfDone;
  const overall       = activeResults.length ? activeResults.reduce((a, b) => a + b.risk_score, 0) / activeResults.length : 0;
  const overallLevel  = overall >= 0.7 ? "critical" : overall >= 0.4 ? "high" : overall >= 0.2 ? "medium" : "low";
  const overallColor  = overallLevel === "critical" ? "#ef4444" : overallLevel === "high" ? "#f97316" : overallLevel === "medium" ? "#eab308" : "#22c55e";
  const totalFlags    = activeResults.reduce((a, b) => a + b.flags_count, 0);

  return (
    <div style={{ minHeight: "100vh", background: "#080c14", color: "#fff", fontFamily: "system-ui, sans-serif" }}>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&display=swap');
        * { box-sizing: border-box; }
        body { background: #080c14; }
        textarea, input { font-family: 'Space Mono', monospace !important; }
        textarea::placeholder, input::placeholder { color: rgba(255,255,255,0.18) !important; }
        textarea:focus, input:focus { outline: none; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: #080c14; }
        ::-webkit-scrollbar-thumb { background: rgba(56,189,248,0.3); border-radius: 2px; }
      `}</style>

      {notice && (
        <div style={{ position: "fixed", top: 20, right: 20, zIndex: 100, padding: "10px 18px", background: "rgba(13,17,27,0.98)", border: "1px solid rgba(56,189,248,0.25)", borderRadius: 8, fontSize: 12, color: "rgba(255,255,255,0.8)", backdropFilter: "blur(20px)", fontFamily: "Space Mono, monospace" }}>
          {notice}
        </div>
      )}

      <div style={{ maxWidth: 760, margin: "0 auto", padding: "0 20px 80px" }}>

        {/* nav */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "24px 0 20px", borderBottom: "1px solid rgba(255,255,255,0.05)", marginBottom: 60 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 7, height: 7, borderRadius: "50%", background: "#22c55e", boxShadow: "0 0 10px #22c55e" }} />
            <span style={{ fontSize: 11, color: "rgba(255,255,255,0.3)", letterSpacing: "0.25em", textTransform: "uppercase", fontFamily: "Space Mono, monospace" }}>
              SYSTEM ONLINE // INTEGRITY ENGINE ACTIVE
            </span>
          </div>
          <div style={{ display: "flex", gap: 24 }}>
            {[
              { label: "API",       href: `${API}/docs` },
              { label: "GitHub",    href: "https://github.com/Abu-Sameer-66/SciPeerAI" },
              { label: "Portfolio", href: "https://sameer-nadeem-portfolio.vercel.app" },
            ].map((l) => (
              <a key={l.label} href={l.href} target="_blank" rel="noreferrer"
                style={{ fontSize: 11, color: "rgba(255,255,255,0.3)", textDecoration: "none", letterSpacing: "0.1em" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#38bdf8")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.3)")}>
                {l.label} ↗
              </a>
            ))}
          </div>
        </div>

        {/* hero */}
        <div style={{ marginBottom: 64 }}>
          <div style={{ fontSize: 11, color: "rgba(56,189,248,0.7)", letterSpacing: "0.35em", textTransform: "uppercase", fontFamily: "Space Mono, monospace", marginBottom: 20 }}>
            /// PROTOCOL: INTEGRITY ANALYSIS
          </div>
          <h1 style={{ fontSize: "clamp(48px, 8vw, 80px)", fontWeight: 900, lineHeight: 1, letterSpacing: "-0.04em", marginBottom: 20, color: "#fff" }}>
            SciPeer<span style={{ color: "#38bdf8" }}>AI</span>
          </h1>
          <p style={{ fontSize: 17, color: "rgba(255,255,255,0.45)", lineHeight: 1.7, maxWidth: 540, marginBottom: 32 }}>
            Automated scientific integrity analysis. Upload a PDF or paste paper text — receive a structured, multi-dimensional forensic report in seconds.
          </p>
          <div style={{ display: "flex", gap: 40, padding: "20px 0", borderTop: "1px solid rgba(255,255,255,0.06)", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
            <StatPill value="14"   label="Modules" />
            <StatPill value="109"  label="Tests Passing" />
            <StatPill value="15"   label="API Endpoints" />
            <StatPill value="Live" label="Deployed" />
          </div>
        </div>

        {/* module overview */}
        <div style={{ marginBottom: 48 }}>
          <div style={{ fontSize: 10, color: "rgba(255,255,255,0.25)", letterSpacing: "0.3em", textTransform: "uppercase", fontFamily: "Space Mono, monospace", marginBottom: 16 }}>
            ANALYSIS DIMENSIONS
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12 }}>
            {MODULES.map((m, idx) => (
              <div key={m.id} style={{ padding: "14px 16px", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 10 }}>
                <div style={{ fontSize: 10, color: "rgba(56,189,248,0.5)", letterSpacing: "0.25em", fontFamily: "Space Mono, monospace", marginBottom: 6 }}>
                  EXPERIMENT {String(idx + 1).padStart(2, "0")}
                </div>
                <div style={{ fontSize: 13, fontWeight: 700, color: "rgba(255,255,255,0.85)", marginBottom: 4 }}>{m.label}</div>
                <div style={{ fontSize: 11, color: "rgba(255,255,255,0.3)", lineHeight: 1.5 }}>{m.desc}</div>
              </div>
            ))}
          </div>
        </div>

        {/* ── MODE TABS ── */}
        <div style={{ marginBottom: 32 }}>
          <div style={{ display: "flex", gap: 0, marginBottom: 24, border: "1px solid rgba(255,255,255,0.07)", borderRadius: 12, overflow: "hidden" }}>
            {(["text", "pdf"] as const).map((m) => (
              <button
                key={m}
                onClick={() => setMode(m)}
                style={{
                  flex: 1, padding: "14px 0",
                  background: mode === m ? "rgba(56,189,248,0.1)" : "transparent",
                  border: "none",
                  borderRight: m === "text" ? "1px solid rgba(255,255,255,0.07)" : "none",
                  color: mode === m ? "#38bdf8" : "rgba(255,255,255,0.3)",
                  fontSize: 11, fontWeight: 700,
                  letterSpacing: "0.25em", textTransform: "uppercase",
                  fontFamily: "Space Mono, monospace",
                  cursor: "pointer",
                  transition: "all 0.2s",
                }}>
                {m === "text" ? "◈ TEXT INPUT" : "⬆ PDF UPLOAD"}
              </button>
            ))}
          </div>

          {/* TEXT MODE */}
          {mode === "text" && (
            <div style={{ background: "linear-gradient(135deg, rgba(13,17,27,0.98), rgba(17,22,34,0.95))", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 16, padding: 24 }}>
              <div style={{ fontSize: 11, color: "rgba(56,189,248,0.5)", letterSpacing: "0.2em", textTransform: "uppercase", fontFamily: "Space Mono, monospace", marginBottom: 10 }}>
                PAPER TEXT *
              </div>
              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Paste abstract, methods section, or full paper text here..."
                rows={8}
                style={{ width: "100%", resize: "vertical", background: "rgba(0,0,0,0.4)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 10, padding: "14px 16px", color: "rgba(255,255,255,0.8)", fontSize: 13, lineHeight: 1.7, transition: "border-color 0.2s" }}
                onFocus={(e) => e.target.style.borderColor = "rgba(56,189,248,0.35)"}
                onBlur={(e)  => e.target.style.borderColor = "rgba(255,255,255,0.07)"}
              />
              <div style={{ fontSize: 11, color: "rgba(56,189,248,0.5)", letterSpacing: "0.2em", textTransform: "uppercase", fontFamily: "Space Mono, monospace", marginBottom: 10, marginTop: 16 }}>
                AUTHOR NAME (optional)
              </div>
              <input
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                placeholder="e.g. Sameer Nadeem"
                style={{ width: "100%", background: "rgba(0,0,0,0.4)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 10, padding: "12px 16px", color: "rgba(255,255,255,0.8)", fontSize: 13, transition: "border-color 0.2s" }}
                onFocus={(e) => e.target.style.borderColor = "rgba(56,189,248,0.35)"}
                onBlur={(e)  => e.target.style.borderColor = "rgba(255,255,255,0.07)"}
              />
              <button
                onClick={run}
                disabled={loading}
                style={{ width: "100%", marginTop: 20, padding: "15px 24px", background: loading ? "rgba(255,255,255,0.04)" : "rgba(56,189,248,0.1)", border: `1px solid ${loading ? "rgba(255,255,255,0.06)" : "rgba(56,189,248,0.3)"}`, borderRadius: 10, color: loading ? "rgba(255,255,255,0.3)" : "#38bdf8", fontSize: 12, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", cursor: loading ? "not-allowed" : "pointer", fontFamily: "Space Mono, monospace", transition: "all 0.2s" }}>
                {loading ? `⟳ ${step || "Initializing..."}` : "INITIALIZE INTEGRITY SCAN ◈"}
              </button>
            </div>
          )}

          {/* PDF MODE */}
          {mode === "pdf" && (
            <div style={{ background: "linear-gradient(135deg, rgba(13,17,27,0.98), rgba(17,22,34,0.95))", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 16, padding: 24 }}>

              {/* drop zone */}
              <div
                onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
                onDragLeave={() => setDragOver(false)}
                onDrop={onDrop}
                onClick={() => fileInputRef.current?.click()}
                style={{
                  border: `2px dashed ${dragOver ? "rgba(56,189,248,0.6)" : pdfFile ? "rgba(34,197,94,0.4)" : "rgba(255,255,255,0.1)"}`,
                  borderRadius: 12, padding: "48px 24px",
                  textAlign: "center", cursor: "pointer",
                  background: dragOver ? "rgba(56,189,248,0.04)" : pdfFile ? "rgba(34,197,94,0.03)" : "rgba(0,0,0,0.2)",
                  transition: "all 0.2s",
                  marginBottom: 20,
                }}>
                <input ref={fileInputRef} type="file" accept=".pdf" onChange={onFileChange} style={{ display: "none" }} />

                {pdfFile ? (
                  <>
                    <div style={{ fontSize: 32, marginBottom: 12 }}>📄</div>
                    <div style={{ fontSize: 13, fontWeight: 700, color: "#22c55e", fontFamily: "Space Mono, monospace", marginBottom: 6 }}>
                      {pdfFile.name}
                    </div>
                    <div style={{ fontSize: 11, color: "rgba(255,255,255,0.3)" }}>
                      {(pdfFile.size / 1024).toFixed(1)} KB · Click to change
                    </div>
                  </>
                ) : (
                  <>
                    <div style={{ fontSize: 32, marginBottom: 12 }}>⬆</div>
                    <div style={{ fontSize: 13, fontWeight: 700, color: "rgba(255,255,255,0.6)", fontFamily: "Space Mono, monospace", marginBottom: 6 }}>
                      DROP PDF HERE OR CLICK TO BROWSE
                    </div>
                    <div style={{ fontSize: 11, color: "rgba(255,255,255,0.25)" }}>
                      Max 50MB · Selectable text PDF only
                    </div>
                  </>
                )}
              </div>

              {/* security note */}
              <div style={{ padding: "10px 14px", background: "rgba(56,189,248,0.04)", border: "1px solid rgba(56,189,248,0.1)", borderRadius: 8, marginBottom: 20, fontSize: 11, color: "rgba(56,189,248,0.5)", fontFamily: "Space Mono, monospace" }}>
                🔒 SECURE · SHA-256 fingerprinted · Files not stored · 14-module parallel analysis
              </div>

              <button
                onClick={runPDF}
                disabled={pdfLoading || !pdfFile}
                style={{ width: "100%", padding: "15px 24px", background: pdfLoading || !pdfFile ? "rgba(255,255,255,0.04)" : "rgba(56,189,248,0.1)", border: `1px solid ${pdfLoading || !pdfFile ? "rgba(255,255,255,0.06)" : "rgba(56,189,248,0.3)"}`, borderRadius: 10, color: pdfLoading || !pdfFile ? "rgba(255,255,255,0.3)" : "#38bdf8", fontSize: 12, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", cursor: pdfLoading || !pdfFile ? "not-allowed" : "pointer", fontFamily: "Space Mono, monospace", transition: "all 0.2s" }}>
                {pdfLoading ? `⟳ ${step || "Analyzing..."}` : "ANALYZE PDF — 14 MODULES ◈"}
              </button>

              {/* PDF meta result */}
              {pdfDone && pdfMeta && (
                <div style={{ marginTop: 24, padding: "20px", background: "rgba(0,0,0,0.3)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 12 }}>
                  <div style={{ fontSize: 10, color: "rgba(56,189,248,0.6)", letterSpacing: "0.25em", fontFamily: "Space Mono, monospace", marginBottom: 12 }}>
                    PAPER METADATA
                  </div>
                  <div style={{ fontSize: 14, fontWeight: 700, color: "#fff", marginBottom: 12 }}>{pdfMeta.paper_title}</div>
                  <div style={{ display: "flex", gap: 24, flexWrap: "wrap", marginBottom: 16 }}>
                    {[
                      { label: "Pages",   value: pdfMeta.page_count },
                      { label: "Figures", value: pdfMeta.figure_count },
                      { label: "Size",    value: `${pdfMeta.file_size_kb} KB` },
                    ].map(({ label, value }) => (
                      <div key={label} style={{ textAlign: "center" }}>
                        <div style={{ fontSize: 18, fontWeight: 900, color: "#38bdf8", fontFamily: "Space Mono, monospace" }}>{value}</div>
                        <div style={{ fontSize: 10, color: "rgba(255,255,255,0.3)", letterSpacing: "0.15em" }}>{label}</div>
                      </div>
                    ))}
                  </div>
                  <div style={{ fontSize: 11, padding: "10px 14px", background: "rgba(0,0,0,0.4)", borderRadius: 8, fontFamily: "Space Mono, monospace", color: "rgba(255,255,255,0.4)", marginBottom: 12 }}>
                    SHA-256: {pdfMeta.sha256.slice(0, 32)}...
                  </div>
                  {pdfMeta.top_flags.length > 0 && (
                    <div>
                      <div style={{ fontSize: 10, color: "rgba(239,68,68,0.7)", letterSpacing: "0.2em", fontFamily: "Space Mono, monospace", marginBottom: 8 }}>TOP FLAGS</div>
                      {pdfMeta.top_flags.map((f, i) => (
                        <div key={i} style={{ fontSize: 11, color: "rgba(255,255,255,0.45)", padding: "6px 10px", borderLeft: "2px solid rgba(239,68,68,0.4)", marginBottom: 6, lineHeight: 1.5 }}>{f}</div>
                      ))}
                    </div>
                  )}
                  <div style={{ fontSize: 10, color: "rgba(255,255,255,0.2)", fontFamily: "Space Mono, monospace", marginTop: 12 }}>{pdfMeta.analyzed_by}</div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* overall score */}
        {activeDone && activeResults.length > 0 && (
          <div style={{ background: "linear-gradient(135deg, rgba(13,17,27,0.98), rgba(17,22,34,0.95))", border: `1px solid ${overallColor}22`, borderRadius: 16, padding: 28, marginBottom: 28, position: "relative", overflow: "hidden" }}>
            <div style={{ position: "absolute", top: 0, right: 0, width: 200, height: 200, background: `radial-gradient(circle at top right, ${overallColor}08 0%, transparent 70%)` }} />
            <div style={{ fontSize: 10, color: "rgba(255,255,255,0.25)", letterSpacing: "0.3em", textTransform: "uppercase", fontFamily: "Space Mono, monospace", marginBottom: 20 }}>
              AGGREGATE INTEGRITY ASSESSMENT
            </div>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 20 }}>
              <div>
                <div style={{ fontSize: 64, fontWeight: 900, lineHeight: 1, color: overallColor, fontFamily: "Space Mono, monospace", letterSpacing: "-0.04em", textShadow: `0 0 40px ${overallColor}44` }}>
                  {Math.round(overall * 100)}%
                </div>
                <div style={{ marginTop: 10 }}><Badge level={overallLevel} /></div>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 10, minWidth: 200 }}>
                {activeResults.map((r, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12 }}>
                    <span style={{ fontSize: 11, color: "rgba(255,255,255,0.4)" }}>{r.module}</span>
                    <span style={{ fontSize: 11, fontWeight: 700, fontFamily: "Space Mono, monospace", color: r.risk_level === "critical" ? "#ef4444" : r.risk_level === "high" ? "#f97316" : r.risk_level === "medium" ? "#eab308" : "#22c55e" }}>
                      {Math.round(r.risk_score * 100)}%
                    </span>
                  </div>
                ))}
              </div>
            </div>
            <div style={{ marginTop: 20, paddingTop: 16, borderTop: "1px solid rgba(255,255,255,0.05)", fontSize: 11, color: "rgba(255,255,255,0.25)", fontFamily: "Space Mono, monospace" }}>
              {totalFlags} ANOMALIES DETECTED · {activeResults.length} DIMENSIONS ANALYZED
            </div>
          </div>
        )}

        {activeDone && (
          <div style={{ fontSize: 10, color: "rgba(255,255,255,0.25)", letterSpacing: "0.3em", textTransform: "uppercase", fontFamily: "Space Mono, monospace", marginBottom: 16 }}>
            DETAILED ANALYSIS REPORT
          </div>
        )}

        {activeResults.map((r, i) => <ModuleCard key={i} r={r} index={i} />)}

        {/* footer */}
        <div style={{ textAlign: "center", marginTop: 60, paddingTop: 24, borderTop: "1px solid rgba(255,255,255,0.04)" }}>
          <div style={{ fontSize: 11, color: "rgba(255,255,255,0.18)", fontFamily: "Space Mono, monospace", letterSpacing: "0.15em" }}>
            ENGINEERED BY{" "}
            <a href="https://sameer-nadeem-portfolio.vercel.app" target="_blank" rel="noreferrer"
              style={{ color: "rgba(56,189,248,0.4)", textDecoration: "none" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#38bdf8")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(56,189,248,0.4)")}>
              SAMEER NADEEM
            </a>
            {" "}// SciPeerAI v1.8.0 // 14 MODULES // BUILDING INTELLIGENCE
          </div>
        </div>

      </div>
    </div>
  );
}