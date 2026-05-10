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


// "use client";

// import { useState, useRef } from "react";
// import axios from "axios";

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
// interface PDFMeta {
//   paper_title: string;
//   page_count: number;
//   figure_count: number;
//   file_size_kb: number;
//   sha256: string;
//   overall_score: number;
//   overall_risk: string;
//   integrity_verdict: string;
//   top_flags: string[];
//   analyzed_by: string;
// }

// const MODULES = [
//   { id: "statistics",      label: "Statistical Audit",      endpoint: "/api/v1/analyze/statistics",      desc: "p-hacking · sample size · round numbers" },
//   { id: "methodology",     label: "Methodology Checker",    endpoint: "/api/v1/analyze/methodology",     desc: "causation · control groups · timeframe" },
//   { id: "citations",       label: "Citation Integrity",     endpoint: "/api/v1/analyze/citations",       desc: "self-citation · unsupported claims" },
//   { id: "reproducibility", label: "Reproducibility Scan",   endpoint: "/api/v1/analyze/reproducibility", desc: "code · data · ethics · preregistration" },
//   { id: "novelty",         label: "Novelty Scorer",         endpoint: "/api/v1/analyze/novelty",         desc: "literature search · novelty estimation" },
//   { id: "grim",            label: "GRIM Test",              endpoint: "/api/v1/analyze/grim",            desc: "impossible means · data fabrication" },
//   { id: "sprite",          label: "SPRITE Test",            endpoint: "/api/v1/analyze/sprite",          desc: "impossible distributions · SD verification" },
//   { id: "granularity",     label: "Granularity Analyzer",   endpoint: "/api/v1/analyze/granularity",     desc: "digit preference · Benford law · round numbers" },
//   { id: "pcurve",          label: "P-Curve Analyzer",       endpoint: "/api/v1/analyze/pcurve",          desc: "publication bias · p-value clustering" },
//   { id: "effect_size",     label: "Effect Size Validator",  endpoint: "/api/v1/analyze/effect_size",     desc: "Cohen d · power analysis · inflated effects" },
//   { id: "retraction",      label: "Retraction Checker",     endpoint: "/api/v1/analyze/retraction",      desc: "retracted citations · CrossRef live API" },
//   { id: "cartel",          label: "Citation Cartel",        endpoint: "/api/v1/analyze/cartel",          desc: "citation rings · network manipulation" },
//   { id: "llm",             label: "LLM Detector",           endpoint: "/api/v1/analyze/llm",             desc: "AI-generated text · burstiness · phrases" },
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
//   const c = cfg[level?.toLowerCase()] || cfg.low;
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
//   // ── Text mode state ───────────────────────────────────────────
//   const [text, setText]       = useState("");
//   const [author, setAuthor]   = useState("");
//   const [loading, setLoading] = useState(false);
//   const [results, setResults] = useState<Result[]>([]);
//   const [done, setDone]       = useState(false);
//   const [step, setStep]       = useState("");

//   // ── PDF mode state ────────────────────────────────────────────
//   const [mode, setMode]           = useState<"text" | "pdf">("text");
//   const [pdfFile, setPdfFile]     = useState<File | null>(null);
//   const [pdfLoading, setPdfLoading] = useState(false);
//   const [pdfResults, setPdfResults] = useState<Result[]>([]);
//   const [pdfMeta, setPdfMeta]     = useState<PDFMeta | null>(null);
//   const [pdfDone, setPdfDone]     = useState(false);
//   const [dragOver, setDragOver]   = useState(false);
//   const fileInputRef              = useRef<HTMLInputElement>(null);

//   // ── Shared notice ─────────────────────────────────────────────
//   const [notice, setNotice] = useState("");
//   const notify = (msg: string) => { setNotice(msg); setTimeout(() => setNotice(""), 4000); };

//   // ── Text mode: run all modules ────────────────────────────────
//   const run = async () => {
//     if (text.trim().length < 50) { notify("Minimum 50 characters required."); return; }
//     setLoading(true); setResults([]); setDone(false);
//     const out: Result[] = [];
//     for (const m of MODULES) {
//       setStep(`Running ${m.label}...`);
//       try {
//         await new Promise(resolve => setTimeout(resolve, 800));
//         const payload: Record<string, string> = { text };
//         if (m.id === "citations")   payload.author_name = author;
//         if (m.id === "methodology") payload.abstract = "";
//         if (m.id === "novelty")     payload.title = "";
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
//       } catch { notify(`${m.label} unavailable.`); }
//     }
//     setResults(out); setDone(true); setLoading(false); setStep("");
//     notify("Analysis complete.");
//   };

//   // ── PDF mode: single endpoint call ───────────────────────────
//   const runPDF = async () => {
//     if (!pdfFile) { notify("Please select a PDF file first."); return; }
//     setPdfLoading(true); setPdfResults([]); setPdfMeta(null); setPdfDone(false);
//     setStep("Uploading PDF and running 14-module analysis...");
//     try {
//       const formData = new FormData();
//       formData.append("file", pdfFile);
//       const { data } = await axios.post(`${API}/api/v1/analyze/full-pdf`, formData, {
//         timeout: 120000,
//         headers: { "Content-Type": "multipart/form-data" },
//       });
//       const moduleResults: Result[] = (data.modules || []).map((m: any) => ({
//         module:      m.module,
//         risk_level:  m.risk_level,
//         risk_score:  m.risk_score,
//         summary:     m.summary,
//         flags:       [],
//         flags_count: m.flags_count,
//       }));
//       setPdfResults(moduleResults);
//       setPdfMeta({
//         paper_title:      data.paper_title,
//         page_count:       data.page_count,
//         figure_count:     data.figure_count,
//         file_size_kb:     data.file_size_kb,
//         sha256:           data.sha256,
//         overall_score:    data.overall_score,
//         overall_risk:     data.overall_risk,
//         integrity_verdict: data.integrity_verdict,
//         top_flags:        data.top_flags || [],
//         analyzed_by:      data.analyzed_by,
//       });
//       setPdfDone(true);
//       notify("PDF analysis complete — 14 modules executed.");
//     } catch (err: any) {
//       notify(err?.response?.data?.detail || "PDF analysis failed. Try again.");
//     }
//     setPdfLoading(false); setStep("");
//   };

//   const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const f = e.target.files?.[0];
//     if (f) { setPdfFile(f); setPdfDone(false); setPdfResults([]); setPdfMeta(null); }
//   };

//   const onDrop = (e: React.DragEvent) => {
//     e.preventDefault(); setDragOver(false);
//     const f = e.dataTransfer.files?.[0];
//     if (f && f.name.endsWith(".pdf")) {
//       setPdfFile(f); setPdfDone(false); setPdfResults([]); setPdfMeta(null);
//     } else { notify("Only PDF files accepted."); }
//   };

//   // ── Shared computed ───────────────────────────────────────────
//   const activeResults = mode === "text" ? results : pdfResults;
//   const activeDone    = mode === "text" ? done    : pdfDone;
//   const overall       = activeResults.length ? activeResults.reduce((a, b) => a + b.risk_score, 0) / activeResults.length : 0;
//   const overallLevel  = overall >= 0.7 ? "critical" : overall >= 0.4 ? "high" : overall >= 0.2 ? "medium" : "low";
//   const overallColor  = overallLevel === "critical" ? "#ef4444" : overallLevel === "high" ? "#f97316" : overallLevel === "medium" ? "#eab308" : "#22c55e";
//   const totalFlags    = activeResults.reduce((a, b) => a + b.flags_count, 0);

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
//             Automated scientific integrity analysis. Upload a PDF or paste paper text — receive a structured, multi-dimensional forensic report in seconds.
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

//         {/* ── MODE TABS ── */}
//         <div style={{ marginBottom: 32 }}>
//           <div style={{ display: "flex", gap: 0, marginBottom: 24, border: "1px solid rgba(255,255,255,0.07)", borderRadius: 12, overflow: "hidden" }}>
//             {(["text", "pdf"] as const).map((m) => (
//               <button
//                 key={m}
//                 onClick={() => setMode(m)}
//                 style={{
//                   flex: 1, padding: "14px 0",
//                   background: mode === m ? "rgba(56,189,248,0.1)" : "transparent",
//                   border: "none",
//                   borderRight: m === "text" ? "1px solid rgba(255,255,255,0.07)" : "none",
//                   color: mode === m ? "#38bdf8" : "rgba(255,255,255,0.3)",
//                   fontSize: 11, fontWeight: 700,
//                   letterSpacing: "0.25em", textTransform: "uppercase",
//                   fontFamily: "Space Mono, monospace",
//                   cursor: "pointer",
//                   transition: "all 0.2s",
//                 }}>
//                 {m === "text" ? "◈ TEXT INPUT" : "⬆ PDF UPLOAD"}
//               </button>
//             ))}
//           </div>

//           {/* TEXT MODE */}
//           {mode === "text" && (
//             <div style={{ background: "linear-gradient(135deg, rgba(13,17,27,0.98), rgba(17,22,34,0.95))", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 16, padding: 24 }}>
//               <div style={{ fontSize: 11, color: "rgba(56,189,248,0.5)", letterSpacing: "0.2em", textTransform: "uppercase", fontFamily: "Space Mono, monospace", marginBottom: 10 }}>
//                 PAPER TEXT *
//               </div>
//               <textarea
//                 value={text}
//                 onChange={(e) => setText(e.target.value)}
//                 placeholder="Paste abstract, methods section, or full paper text here..."
//                 rows={8}
//                 style={{ width: "100%", resize: "vertical", background: "rgba(0,0,0,0.4)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 10, padding: "14px 16px", color: "rgba(255,255,255,0.8)", fontSize: 13, lineHeight: 1.7, transition: "border-color 0.2s" }}
//                 onFocus={(e) => e.target.style.borderColor = "rgba(56,189,248,0.35)"}
//                 onBlur={(e)  => e.target.style.borderColor = "rgba(255,255,255,0.07)"}
//               />
//               <div style={{ fontSize: 11, color: "rgba(56,189,248,0.5)", letterSpacing: "0.2em", textTransform: "uppercase", fontFamily: "Space Mono, monospace", marginBottom: 10, marginTop: 16 }}>
//                 AUTHOR NAME (optional)
//               </div>
//               <input
//                 value={author}
//                 onChange={(e) => setAuthor(e.target.value)}
//                 placeholder="e.g. Sameer Nadeem"
//                 style={{ width: "100%", background: "rgba(0,0,0,0.4)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 10, padding: "12px 16px", color: "rgba(255,255,255,0.8)", fontSize: 13, transition: "border-color 0.2s" }}
//                 onFocus={(e) => e.target.style.borderColor = "rgba(56,189,248,0.35)"}
//                 onBlur={(e)  => e.target.style.borderColor = "rgba(255,255,255,0.07)"}
//               />
//               <button
//                 onClick={run}
//                 disabled={loading}
//                 style={{ width: "100%", marginTop: 20, padding: "15px 24px", background: loading ? "rgba(255,255,255,0.04)" : "rgba(56,189,248,0.1)", border: `1px solid ${loading ? "rgba(255,255,255,0.06)" : "rgba(56,189,248,0.3)"}`, borderRadius: 10, color: loading ? "rgba(255,255,255,0.3)" : "#38bdf8", fontSize: 12, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", cursor: loading ? "not-allowed" : "pointer", fontFamily: "Space Mono, monospace", transition: "all 0.2s" }}>
//                 {loading ? `⟳ ${step || "Initializing..."}` : "INITIALIZE INTEGRITY SCAN ◈"}
//               </button>
//             </div>
//           )}

//           {/* PDF MODE */}
//           {mode === "pdf" && (
//             <div style={{ background: "linear-gradient(135deg, rgba(13,17,27,0.98), rgba(17,22,34,0.95))", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 16, padding: 24 }}>

//               {/* drop zone */}
//               <div
//                 onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
//                 onDragLeave={() => setDragOver(false)}
//                 onDrop={onDrop}
//                 onClick={() => fileInputRef.current?.click()}
//                 style={{
//                   border: `2px dashed ${dragOver ? "rgba(56,189,248,0.6)" : pdfFile ? "rgba(34,197,94,0.4)" : "rgba(255,255,255,0.1)"}`,
//                   borderRadius: 12, padding: "48px 24px",
//                   textAlign: "center", cursor: "pointer",
//                   background: dragOver ? "rgba(56,189,248,0.04)" : pdfFile ? "rgba(34,197,94,0.03)" : "rgba(0,0,0,0.2)",
//                   transition: "all 0.2s",
//                   marginBottom: 20,
//                 }}>
//                 <input ref={fileInputRef} type="file" accept=".pdf" onChange={onFileChange} style={{ display: "none" }} />

//                 {pdfFile ? (
//                   <>
//                     <div style={{ fontSize: 32, marginBottom: 12 }}>📄</div>
//                     <div style={{ fontSize: 13, fontWeight: 700, color: "#22c55e", fontFamily: "Space Mono, monospace", marginBottom: 6 }}>
//                       {pdfFile.name}
//                     </div>
//                     <div style={{ fontSize: 11, color: "rgba(255,255,255,0.3)" }}>
//                       {(pdfFile.size / 1024).toFixed(1)} KB · Click to change
//                     </div>
//                   </>
//                 ) : (
//                   <>
//                     <div style={{ fontSize: 32, marginBottom: 12 }}>⬆</div>
//                     <div style={{ fontSize: 13, fontWeight: 700, color: "rgba(255,255,255,0.6)", fontFamily: "Space Mono, monospace", marginBottom: 6 }}>
//                       DROP PDF HERE OR CLICK TO BROWSE
//                     </div>
//                     <div style={{ fontSize: 11, color: "rgba(255,255,255,0.25)" }}>
//                       Max 50MB · Selectable text PDF only
//                     </div>
//                   </>
//                 )}
//               </div>

//               {/* security note */}
//               <div style={{ padding: "10px 14px", background: "rgba(56,189,248,0.04)", border: "1px solid rgba(56,189,248,0.1)", borderRadius: 8, marginBottom: 20, fontSize: 11, color: "rgba(56,189,248,0.5)", fontFamily: "Space Mono, monospace" }}>
//                 🔒 SECURE · SHA-256 fingerprinted · Files not stored · 14-module parallel analysis
//               </div>

//               <button
//                 onClick={runPDF}
//                 disabled={pdfLoading || !pdfFile}
//                 style={{ width: "100%", padding: "15px 24px", background: pdfLoading || !pdfFile ? "rgba(255,255,255,0.04)" : "rgba(56,189,248,0.1)", border: `1px solid ${pdfLoading || !pdfFile ? "rgba(255,255,255,0.06)" : "rgba(56,189,248,0.3)"}`, borderRadius: 10, color: pdfLoading || !pdfFile ? "rgba(255,255,255,0.3)" : "#38bdf8", fontSize: 12, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", cursor: pdfLoading || !pdfFile ? "not-allowed" : "pointer", fontFamily: "Space Mono, monospace", transition: "all 0.2s" }}>
//                 {pdfLoading ? `⟳ ${step || "Analyzing..."}` : "ANALYZE PDF — 14 MODULES ◈"}
//               </button>

//               {/* PDF meta result */}
//               {pdfDone && pdfMeta && (
//                 <div style={{ marginTop: 24, padding: "20px", background: "rgba(0,0,0,0.3)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 12 }}>
//                   <div style={{ fontSize: 10, color: "rgba(56,189,248,0.6)", letterSpacing: "0.25em", fontFamily: "Space Mono, monospace", marginBottom: 12 }}>
//                     PAPER METADATA
//                   </div>
//                   <div style={{ fontSize: 14, fontWeight: 700, color: "#fff", marginBottom: 12 }}>{pdfMeta.paper_title}</div>
//                   <div style={{ display: "flex", gap: 24, flexWrap: "wrap", marginBottom: 16 }}>
//                     {[
//                       { label: "Pages",   value: pdfMeta.page_count },
//                       { label: "Figures", value: pdfMeta.figure_count },
//                       { label: "Size",    value: `${pdfMeta.file_size_kb} KB` },
//                     ].map(({ label, value }) => (
//                       <div key={label} style={{ textAlign: "center" }}>
//                         <div style={{ fontSize: 18, fontWeight: 900, color: "#38bdf8", fontFamily: "Space Mono, monospace" }}>{value}</div>
//                         <div style={{ fontSize: 10, color: "rgba(255,255,255,0.3)", letterSpacing: "0.15em" }}>{label}</div>
//                       </div>
//                     ))}
//                   </div>
//                   <div style={{ fontSize: 11, padding: "10px 14px", background: "rgba(0,0,0,0.4)", borderRadius: 8, fontFamily: "Space Mono, monospace", color: "rgba(255,255,255,0.4)", marginBottom: 12 }}>
//                     SHA-256: {pdfMeta.sha256.slice(0, 32)}...
//                   </div>
//                   {pdfMeta.top_flags.length > 0 && (
//                     <div>
//                       <div style={{ fontSize: 10, color: "rgba(239,68,68,0.7)", letterSpacing: "0.2em", fontFamily: "Space Mono, monospace", marginBottom: 8 }}>TOP FLAGS</div>
//                       {pdfMeta.top_flags.map((f, i) => (
//                         <div key={i} style={{ fontSize: 11, color: "rgba(255,255,255,0.45)", padding: "6px 10px", borderLeft: "2px solid rgba(239,68,68,0.4)", marginBottom: 6, lineHeight: 1.5 }}>{f}</div>
//                       ))}
//                     </div>
//                   )}
//                   <div style={{ fontSize: 10, color: "rgba(255,255,255,0.2)", fontFamily: "Space Mono, monospace", marginTop: 12 }}>{pdfMeta.analyzed_by}</div>
//                 </div>
//               )}
//             </div>
//           )}
//         </div>

//         {/* overall score */}
//         {activeDone && activeResults.length > 0 && (
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
//                 {activeResults.map((r, i) => (
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
//               {totalFlags} ANOMALIES DETECTED · {activeResults.length} DIMENSIONS ANALYZED
//             </div>
//           </div>
//         )}

//         {activeDone && (
//           <div style={{ fontSize: 10, color: "rgba(255,255,255,0.25)", letterSpacing: "0.3em", textTransform: "uppercase", fontFamily: "Space Mono, monospace", marginBottom: 16 }}>
//             DETAILED ANALYSIS REPORT
//           </div>
//         )}

//         {activeResults.map((r, i) => <ModuleCard key={i} r={r} index={i} />)}

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

import { useState, useRef, useEffect } from "react";
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
  { id: "statistics",       label: "Statistical Audit",      endpoint: "/api/v1/analyze/statistics",       desc: "p-hacking · sample size · round numbers",          phase: 1 },
  { id: "methodology",      label: "Methodology Checker",    endpoint: "/api/v1/analyze/methodology",      desc: "causation · control groups · timeframe",            phase: 1 },
  { id: "citations",        label: "Citation Integrity",     endpoint: "/api/v1/analyze/citations",        desc: "self-citation · unsupported claims",                phase: 1 },
  { id: "reproducibility",  label: "Reproducibility Scan",   endpoint: "/api/v1/analyze/reproducibility",  desc: "code · data · ethics · preregistration",            phase: 1 },
  { id: "novelty",          label: "Novelty Scorer",         endpoint: "/api/v1/analyze/novelty",          desc: "literature search · novelty estimation",            phase: 1 },
  { id: "grim",             label: "GRIM Test",              endpoint: "/api/v1/analyze/grim",             desc: "impossible means · data fabrication",               phase: 1 },
  { id: "sprite",           label: "SPRITE Test",            endpoint: "/api/v1/analyze/sprite",           desc: "impossible distributions · SD verification",        phase: 1 },
  { id: "granularity",      label: "Granularity Analyzer",   endpoint: "/api/v1/analyze/granularity",      desc: "digit preference · Benford law · round numbers",    phase: 1 },
  { id: "pcurve",           label: "P-Curve Analyzer",       endpoint: "/api/v1/analyze/pcurve",           desc: "publication bias · p-value clustering",             phase: 1 },
  { id: "effect_size",      label: "Effect Size Validator",  endpoint: "/api/v1/analyze/effect_size",      desc: "Cohen d · power analysis · inflated effects",       phase: 1 },
  { id: "retraction",       label: "Retraction Checker",     endpoint: "/api/v1/analyze/retraction",       desc: "retracted citations · CrossRef live API",           phase: 1 },
  { id: "cartel",           label: "Citation Cartel",        endpoint: "/api/v1/analyze/cartel",           desc: "citation rings · network manipulation",             phase: 1 },
  { id: "llm",              label: "LLM Detector",           endpoint: "/api/v1/analyze/llm",              desc: "AI-generated text · burstiness · phrases",          phase: 1 },
  { id: "fraud_fingerprint",label: "Fraud Fingerprinting",   endpoint: "/api/v1/analyze/fraud_fingerprint",desc: "writing DNA · style shift · authorship anomaly",    phase: 5 },
  { id: "temporal_anomaly", label: "Temporal Anomaly",       endpoint: "/api/v1/analyze/temporal_anomaly", desc: "citation paradox · false recency · timeline",       phase: 5 },
  { id: "citation_dna",     label: "Citation DNA",           endpoint: "/api/v1/analyze/citation_dna",     desc: "network concentration · journal diversity",         phase: 5 },
  { id: "data_fingerprint", label: "Data Fingerprint",       endpoint: "/api/v1/analyze/data_fingerprint", desc: "fabrication · terminal digit · impossible values",  phase: 5 },
  { id: "peer_review",      label: "Peer Review Score",      endpoint: "/api/v1/analyze/peer_review",      desc: "fast acceptance · predatory signals · conflict",    phase: 5 },
  { id: "ai_spectrum",      label: "AI-Human Spectrum",      endpoint: "/api/v1/analyze/ai_spectrum",      desc: "GPT-4 · Claude · Gemini attribution · ratio",       phase: 5 },
];

const PHASE5_IDS = new Set(["fraud_fingerprint","temporal_anomaly","citation_dna","data_fingerprint","peer_review","ai_spectrum"]);

function RiskBar({ score, level }: { score: number; level: string }) {
  const color = level === "critical" ? "#ef4444" : level === "high" ? "#f97316" : level === "medium" ? "#eab308" : "#22c55e";
  const [width, setWidth] = useState(0);
  useEffect(() => { const t = setTimeout(() => setWidth(score * 100), 120); return () => clearTimeout(t); }, [score]);
  return (
    <div style={{ width: "100%" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
        <span style={{ fontSize: 10, color: "rgba(255,255,255,0.3)", letterSpacing: "0.2em", textTransform: "uppercase" }}>INTEGRITY RISK</span>
        <span style={{ fontSize: 14, fontWeight: 800, color, fontFamily: "Space Mono, monospace", letterSpacing: "-0.02em" }}>{Math.round(score * 100)}%</span>
      </div>
      <div style={{ height: 2, background: "rgba(255,255,255,0.05)", borderRadius: 1, overflow: "hidden", position: "relative" }}>
        <div style={{ position: "absolute", inset: 0, background: "rgba(255,255,255,0.02)" }} />
        <div style={{ height: "100%", width: `${width}%`, background: `linear-gradient(90deg, ${color}88, ${color})`, borderRadius: 1, transition: "width 1.4s cubic-bezier(0.4,0,0.2,1)", boxShadow: `0 0 12px ${color}66` }} />
      </div>
    </div>
  );
}

function Badge({ level }: { level: string }) {
  const cfg: Record<string, { bg: string; text: string; border: string }> = {
    critical: { bg: "rgba(239,68,68,0.08)",  text: "#ef4444", border: "rgba(239,68,68,0.25)" },
    high:     { bg: "rgba(249,115,22,0.08)", text: "#f97316", border: "rgba(249,115,22,0.25)" },
    medium:   { bg: "rgba(234,179,8,0.08)",  text: "#eab308", border: "rgba(234,179,8,0.25)" },
    low:      { bg: "rgba(34,197,94,0.08)",  text: "#22c55e", border: "rgba(34,197,94,0.25)" },
  };
  const c = cfg[level?.toLowerCase()] || cfg.low;
  return (
    <span style={{ background: c.bg, color: c.text, border: `1px solid ${c.border}`, padding: "2px 10px", borderRadius: 3, fontSize: 9, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", fontFamily: "Space Mono, monospace" }}>
      {level?.toUpperCase()}
    </span>
  );
}

function FlagItem({ flag }: { flag: Flag }) {
  const [open, setOpen] = useState(false);
  const sev = flag.severity?.toLowerCase();
  const color = sev === "high" ? "#ef4444" : sev === "medium" ? "#eab308" : "#22c55e";
  return (
    <div style={{ border: `1px solid ${color}18`, borderLeft: `2px solid ${color}55`, borderRadius: 6, marginBottom: 6, overflow: "hidden", background: `${color}04` }}>
      <button onClick={() => setOpen(!open)} style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "9px 14px", background: "transparent", border: "none", cursor: "pointer", textAlign: "left" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <span style={{ width: 5, height: 5, borderRadius: "50%", background: color, flexShrink: 0 }} />
          <span style={{ fontSize: 10, fontWeight: 700, color: "rgba(255,255,255,0.7)", letterSpacing: "0.12em", textTransform: "uppercase", fontFamily: "Space Mono, monospace" }}>
            {flag.flag_type.replace(/_/g, " ")}
          </span>
          <span style={{ fontSize: 9, padding: "1px 7px", borderRadius: 2, background: `${color}14`, color, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase" }}>
            {sev}
          </span>
        </div>
        <span style={{ color: "rgba(255,255,255,0.15)", fontSize: 10 }}>{open ? "▲" : "▼"}</span>
      </button>
      {open && (
        <div style={{ padding: "0 14px 12px", borderTop: "1px solid rgba(255,255,255,0.03)" }}>
          <p style={{ fontSize: 12, color: "rgba(255,255,255,0.5)", lineHeight: 1.8, marginTop: 10, marginBottom: 0 }}>{flag.description || flag.issue}</p>
          {flag.evidence && (
            <div style={{ marginTop: 8, padding: "8px 12px", background: "rgba(0,0,0,0.5)", borderRadius: 4, fontFamily: "Space Mono, monospace", fontSize: 10, borderLeft: "2px solid rgba(125,211,252,0.3)" }}>
              <span style={{ color: "#7dd3fc", letterSpacing: "0.1em" }}>EVIDENCE › </span>
              <span style={{ color: "rgba(255,255,255,0.4)" }}>{flag.evidence}</span>
            </div>
          )}
          {flag.suggestion && (
            <div style={{ marginTop: 6, padding: "8px 12px", background: "rgba(0,0,0,0.3)", borderRadius: 4, fontSize: 10, borderLeft: "2px solid rgba(134,239,172,0.3)" }}>
              <span style={{ color: "#86efac", letterSpacing: "0.1em", fontFamily: "Space Mono, monospace" }}>RECOMMENDATION › </span>
              <span style={{ color: "rgba(255,255,255,0.4)" }}>{flag.suggestion}</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function ModuleCard({ r, index, isPhase5 }: { r: Result; index: number; isPhase5?: boolean }) {
  const lvl = r.risk_level?.toLowerCase();
  const accentColor = lvl === "critical" ? "#ef4444" : lvl === "high" ? "#f97316" : lvl === "medium" ? "#eab308" : "#22c55e";
  return (
    <div style={{ background: "rgba(8,12,20,0.95)", border: `1px solid rgba(255,255,255,${lvl === "critical" ? "0.12" : "0.05"})`, borderRadius: 14, padding: "24px 28px", marginBottom: 12, position: "relative", overflow: "hidden" }}>
      {isPhase5 && (
        <div style={{ position: "absolute", top: 12, right: 12, fontSize: 8, color: "rgba(168,85,247,0.7)", letterSpacing: "0.2em", fontFamily: "Space Mono, monospace", border: "1px solid rgba(168,85,247,0.2)", padding: "2px 8px", borderRadius: 2 }}>PHASE V</div>
      )}
      <div style={{ position: "absolute", top: 0, right: 0, width: 180, height: 180, background: `radial-gradient(circle at top right, ${accentColor}06 0%, transparent 65%)`, pointerEvents: "none" }} />
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 18, flexWrap: "wrap", gap: 10 }}>
        <div>
          <div style={{ fontSize: 9, color: "rgba(56,189,248,0.5)", letterSpacing: "0.35em", textTransform: "uppercase", fontFamily: "Space Mono, monospace", marginBottom: 8 }}>
            ANALYSIS — {String(index + 1).padStart(2, "0")}
          </div>
          <h3 style={{ fontSize: 18, fontWeight: 700, color: "#fff", letterSpacing: "-0.02em", margin: 0 }}>{r.module}</h3>
        </div>
        <Badge level={r.risk_level} />
      </div>
      <div style={{ marginBottom: 18 }}>
        <RiskBar score={r.risk_score} level={r.risk_level} />
      </div>
      <p style={{ fontSize: 12, color: "rgba(255,255,255,0.4)", lineHeight: 1.8, marginBottom: 16, fontFamily: "Space Mono, monospace" }}>{r.summary}</p>
      {r.flags.length === 0 ? (
        <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 11, color: "#22c55e", fontFamily: "Space Mono, monospace", letterSpacing: "0.05em" }}>
          <span>✓</span>
          <span>NO ANOMALIES DETECTED IN THIS DIMENSION</span>
        </div>
      ) : (
        <>
          <div style={{ fontSize: 9, color: "rgba(255,255,255,0.18)", letterSpacing: "0.3em", textTransform: "uppercase", fontFamily: "Space Mono, monospace", marginBottom: 10 }}>
            {r.flags_count} ANOMAL{r.flags_count === 1 ? "Y" : "IES"} FLAGGED
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
      <div style={{ fontSize: 24, fontWeight: 900, color: "#fff", fontFamily: "Space Mono, monospace", letterSpacing: "-0.03em" }}>{value}</div>
      <div style={{ fontSize: 9, color: "rgba(255,255,255,0.25)", letterSpacing: "0.25em", textTransform: "uppercase", marginTop: 4, fontFamily: "Space Mono, monospace" }}>{label}</div>
    </div>
  );
}

function ScanLine() {
  return (
    <div style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, pointerEvents: "none", overflow: "hidden", borderRadius: 16 }}>
      <div style={{
        position: "absolute", left: 0, right: 0, height: "1px",
        background: "linear-gradient(90deg, transparent, rgba(56,189,248,0.15), transparent)",
        animation: "scanline 4s linear infinite",
      }} />
    </div>
  );
}

export default function Home() {
  const [text, setText]           = useState("");
  const [author, setAuthor]       = useState("");
  const [loading, setLoading]     = useState(false);
  const [results, setResults]     = useState<Result[]>([]);
  const [done, setDone]           = useState(false);
  const [step, setStep]           = useState("");
  const [stepIndex, setStepIndex] = useState(0);

  const [mode, setMode]               = useState<"text" | "pdf">("text");
  const [pdfFile, setPdfFile]         = useState<File | null>(null);
  const [pdfLoading, setPdfLoading]   = useState(false);
  const [pdfResults, setPdfResults]   = useState<Result[]>([]);
  const [pdfMeta, setPdfMeta]         = useState<PDFMeta | null>(null);
  const [pdfDone, setPdfDone]         = useState(false);
  const [dragOver, setDragOver]       = useState(false);
  const fileInputRef                  = useRef<HTMLInputElement>(null);

  const [notice, setNotice] = useState("");
  const notify = (msg: string) => { setNotice(msg); setTimeout(() => setNotice(""), 4000); };

  const run = async () => {
    if (text.trim().length < 50) { notify("Minimum 50 characters required."); return; }
    setLoading(true); setResults([]); setDone(false); setStepIndex(0);
    const out: Result[] = [];
    for (let i = 0; i < MODULES.length; i++) {
      const m = MODULES[i];
      setStep(m.label); setStepIndex(i + 1);
      try {
        await new Promise(resolve => setTimeout(resolve, 600));
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
          risk_score:  data.risk_score ?? data.reproducibility_score ?? data.novelty_score ?? data.grim_score ?? data.sprite_score ?? data.granularity_score ?? data.pcurve_score ?? data.effect_score ?? data.retraction_score ?? data.cartel_score ?? data.llm_score ?? data.fingerprint_score ?? data.temporal_score ?? data.dna_risk_score ?? data.manipulation_score ?? data.spectrum_score ?? 0,
          summary:     data.summary,
          flags:       data.flags || [],
          flags_count: data.flags_count || 0,
        });
      } catch { notify(`${m.label} unavailable.`); }
    }
    setResults(out); setDone(true); setLoading(false); setStep(""); setStepIndex(0);
    notify("Integrity analysis complete — 20 dimensions processed.");
  };

  const runPDF = async () => {
    if (!pdfFile) { notify("Please select a PDF file first."); return; }
    setPdfLoading(true); setPdfResults([]); setPdfMeta(null); setPdfDone(false);
    setStep("Uploading and running 20-module forensic analysis...");
    try {
      const formData = new FormData();
      formData.append("file", pdfFile);
      const { data } = await axios.post(`${API}/api/v1/analyze/full-pdf`, formData, {
        timeout: 180000,
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
        paper_title:       data.paper_title,
        page_count:        data.page_count,
        figure_count:      data.figure_count,
        file_size_kb:      data.file_size_kb,
        sha256:            data.sha256,
        overall_score:     data.overall_score,
        overall_risk:      data.overall_risk,
        integrity_verdict: data.integrity_verdict,
        top_flags:         data.top_flags || [],
        analyzed_by:       data.analyzed_by,
      });
      setPdfDone(true);
      notify("PDF forensic analysis complete — 20 modules executed.");
    } catch (err: any) {
      notify(err?.response?.data?.detail || "PDF analysis failed. Please retry.");
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
    if (f && f.name.endsWith(".pdf")) { setPdfFile(f); setPdfDone(false); setPdfResults([]); setPdfMeta(null); }
    else notify("Only PDF files are accepted.");
  };

  const activeResults = mode === "text" ? results : pdfResults;
  const activeDone    = mode === "text" ? done    : pdfDone;
  const overall       = activeResults.length ? activeResults.reduce((a, b) => a + b.risk_score, 0) / activeResults.length : 0;
  const overallLevel  = overall >= 0.7 ? "critical" : overall >= 0.4 ? "high" : overall >= 0.2 ? "medium" : "low";
  const overallColor  = overallLevel === "critical" ? "#ef4444" : overallLevel === "high" ? "#f97316" : overallLevel === "medium" ? "#eab308" : "#22c55e";
  const totalFlags    = activeResults.reduce((a, b) => a + b.flags_count, 0);

  return (
    <div style={{ minHeight: "100vh", background: "#060a10", color: "#fff", fontFamily: "system-ui, sans-serif" }}>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: #060a10; }
        textarea, input[type="text"], input[type="email"] { font-family: 'Space Mono', monospace !important; }
        textarea::placeholder, input::placeholder { color: rgba(255,255,255,0.15) !important; }
        textarea:focus, input:focus { outline: none; }
        ::-webkit-scrollbar { width: 3px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: rgba(56,189,248,0.2); border-radius: 2px; }
        @keyframes scanline {
          0% { top: -2px; }
          100% { top: 100%; }
        }
        @keyframes pulse-dot {
          0%, 100% { opacity: 1; box-shadow: 0 0 8px #22c55e; }
          50% { opacity: 0.4; box-shadow: 0 0 4px #22c55e; }
        }
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .module-card-enter { animation: fadeInUp 0.3s ease forwards; }
        .glow-btn:hover:not(:disabled) {
          background: rgba(56,189,248,0.15) !important;
          box-shadow: 0 0 24px rgba(56,189,248,0.12), inset 0 0 24px rgba(56,189,248,0.04) !important;
        }
        .nav-link:hover { color: #38bdf8 !important; }
        .module-grid-item:hover {
          border-color: rgba(56,189,248,0.2) !important;
          background: rgba(56,189,248,0.04) !important;
        }
      `}</style>

      {notice && (
        <div style={{ position: "fixed", top: 20, right: 20, zIndex: 999, padding: "10px 20px", background: "rgba(6,10,16,0.98)", border: "1px solid rgba(56,189,248,0.2)", borderRadius: 6, fontSize: 11, color: "rgba(255,255,255,0.7)", backdropFilter: "blur(20px)", fontFamily: "Space Mono, monospace", letterSpacing: "0.05em", maxWidth: 340 }}>
          {notice}
        </div>
      )}

      <div style={{ maxWidth: 780, margin: "0 auto", padding: "0 24px 100px" }}>

        {/* ── NAV ── */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "28px 0 24px", borderBottom: "1px solid rgba(255,255,255,0.04)", marginBottom: 72 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#22c55e", animation: "pulse-dot 2s ease-in-out infinite" }} />
            <span style={{ fontSize: 10, color: "rgba(255,255,255,0.25)", letterSpacing: "0.3em", textTransform: "uppercase", fontFamily: "Space Mono, monospace" }}>
              SYSTEM ONLINE // INTEGRITY ENGINE v2.0 ACTIVE
            </span>
          </div>
          <div style={{ display: "flex", gap: 28 }}>
            {[
              { label: "API Docs", href: `${API}/docs` },
              { label: "GitHub",   href: "https://github.com/Abu-Sameer-66/SciPeerAI" },
              { label: "Portfolio",href: "https://sameer-nadeem-portfolio.vercel.app" },
            ].map((l) => (
              <a key={l.label} href={l.href} target="_blank" rel="noreferrer" className="nav-link"
                style={{ fontSize: 10, color: "rgba(255,255,255,0.25)", textDecoration: "none", letterSpacing: "0.12em", textTransform: "uppercase", fontFamily: "Space Mono, monospace", transition: "color 0.2s" }}>
                {l.label} ↗
              </a>
            ))}
          </div>
        </div>

        {/* ── HERO ── */}
        <div style={{ marginBottom: 80 }}>
          <div style={{ fontSize: 10, color: "rgba(56,189,248,0.5)", letterSpacing: "0.45em", textTransform: "uppercase", fontFamily: "Space Mono, monospace", marginBottom: 24 }}>
            /// PROTOCOL: SCIENTIFIC INTEGRITY ANALYSIS
          </div>
          <h1 style={{ fontSize: "clamp(52px, 9vw, 88px)", fontWeight: 900, lineHeight: 0.92, letterSpacing: "-0.045em", marginBottom: 28, color: "#fff" }}>
            SciPeer<span style={{ color: "#38bdf8" }}>AI</span>
          </h1>
          <p style={{ fontSize: 16, color: "rgba(255,255,255,0.35)", lineHeight: 1.8, maxWidth: 520, marginBottom: 40, fontFamily: "Space Mono, monospace", letterSpacing: "0.02em" }}>
            Upload a PDF or paste paper text. Receive a structured forensic integrity report across 20 independent analysis dimensions — in seconds.
          </p>

          {/* Stats bar */}
          <div style={{ display: "flex", gap: 0, padding: "24px 0", borderTop: "1px solid rgba(255,255,255,0.05)", borderBottom: "1px solid rgba(255,255,255,0.05)", position: "relative", overflow: "hidden" }}>
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(90deg, transparent, rgba(56,189,248,0.02), transparent)", pointerEvents: "none" }} />
            {[
              { value: "20",   label: "Modules" },
              { value: "180",  label: "Tests" },
              { value: "21",   label: "Endpoints" },
              { value: "Live", label: "Deployed" },
            ].map((s, i) => (
              <div key={i} style={{ flex: 1, textAlign: "center", borderRight: i < 3 ? "1px solid rgba(255,255,255,0.05)" : "none", padding: "0 20px" }}>
                <StatPill value={s.value} label={s.label} />
              </div>
            ))}
          </div>
        </div>

        {/* ── MODULE GRID ── */}
        <div style={{ marginBottom: 56 }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
            <span style={{ fontSize: 9, color: "rgba(255,255,255,0.2)", letterSpacing: "0.35em", textTransform: "uppercase", fontFamily: "Space Mono, monospace" }}>
              ANALYSIS DIMENSIONS — 20 MODULES
            </span>
            <span style={{ fontSize: 9, color: "rgba(168,85,247,0.5)", letterSpacing: "0.2em", fontFamily: "Space Mono, monospace" }}>
              ◈ PHASE V MODULES INCLUDED
            </span>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 10 }}>
            {MODULES.map((m, idx) => {
              const isNew = PHASE5_IDS.has(m.id);
              return (
                <div key={m.id} className="module-grid-item" style={{ padding: "14px 16px", background: isNew ? "rgba(168,85,247,0.04)" : "rgba(255,255,255,0.02)", border: `1px solid ${isNew ? "rgba(168,85,247,0.15)" : "rgba(255,255,255,0.05)"}`, borderRadius: 8, transition: "all 0.2s", cursor: "default" }}>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 6 }}>
                    <div style={{ fontSize: 9, color: isNew ? "rgba(168,85,247,0.5)" : "rgba(56,189,248,0.4)", letterSpacing: "0.25em", fontFamily: "Space Mono, monospace" }}>
                      {isNew ? `PHASE V · ${String(idx + 1).padStart(2, "0")}` : `EXP ${String(idx + 1).padStart(2, "0")}`}
                    </div>
                    {isNew && <span style={{ fontSize: 7, color: "rgba(168,85,247,0.6)", letterSpacing: "0.2em", fontFamily: "Space Mono, monospace", border: "1px solid rgba(168,85,247,0.2)", padding: "1px 5px", borderRadius: 2 }}>NEW</span>}
                  </div>
                  <div style={{ fontSize: 12, fontWeight: 700, color: "rgba(255,255,255,0.8)", marginBottom: 5, letterSpacing: "-0.01em" }}>{m.label}</div>
                  <div style={{ fontSize: 10, color: "rgba(255,255,255,0.25)", lineHeight: 1.5 }}>{m.desc}</div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ── MODE TABS ── */}
        <div style={{ marginBottom: 36 }}>
          <div style={{ display: "flex", marginBottom: 20, border: "1px solid rgba(255,255,255,0.06)", borderRadius: 10, overflow: "hidden" }}>
            {(["text", "pdf"] as const).map((m) => (
              <button key={m} onClick={() => setMode(m)} style={{
                flex: 1, padding: "13px 0",
                background: mode === m ? "rgba(56,189,248,0.08)" : "transparent",
                border: "none",
                borderRight: m === "text" ? "1px solid rgba(255,255,255,0.06)" : "none",
                color: mode === m ? "#38bdf8" : "rgba(255,255,255,0.25)",
                fontSize: 10, fontWeight: 700, letterSpacing: "0.3em", textTransform: "uppercase",
                fontFamily: "Space Mono, monospace", cursor: "pointer", transition: "all 0.2s",
              }}>
                {m === "text" ? "◈ TEXT INPUT" : "⬆ PDF UPLOAD"}
              </button>
            ))}
          </div>

          {/* TEXT MODE */}
          {mode === "text" && (
            <div style={{ background: "rgba(8,12,20,0.98)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 14, padding: 28, position: "relative", overflow: "hidden" }}>
              <ScanLine />
              <div style={{ fontSize: 9, color: "rgba(56,189,248,0.4)", letterSpacing: "0.3em", textTransform: "uppercase", fontFamily: "Space Mono, monospace", marginBottom: 12 }}>
                PAPER TEXT INPUT *
              </div>
              <textarea
                value={text} onChange={(e) => setText(e.target.value)}
                placeholder="Paste abstract, methods section, results, or full paper text here..."
                rows={9}
                style={{ width: "100%", resize: "vertical", background: "rgba(0,0,0,0.5)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 8, padding: "14px 16px", color: "rgba(255,255,255,0.75)", fontSize: 12, lineHeight: 1.8, transition: "border-color 0.2s", fontFamily: "Space Mono, monospace" }}
                onFocus={(e) => e.target.style.borderColor = "rgba(56,189,248,0.3)"}
                onBlur={(e)  => e.target.style.borderColor = "rgba(255,255,255,0.06)"}
              />
              <div style={{ fontSize: 9, color: "rgba(56,189,248,0.4)", letterSpacing: "0.3em", textTransform: "uppercase", fontFamily: "Space Mono, monospace", marginBottom: 12, marginTop: 20 }}>
                AUTHOR NAME — OPTIONAL, SELF-CITATION DETECTION
              </div>
              <input value={author} onChange={(e) => setAuthor(e.target.value)} placeholder="e.g. Sameer Nadeem"
                style={{ width: "100%", background: "rgba(0,0,0,0.5)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 8, padding: "12px 16px", color: "rgba(255,255,255,0.75)", fontSize: 12, transition: "border-color 0.2s", fontFamily: "Space Mono, monospace" }}
                onFocus={(e) => e.target.style.borderColor = "rgba(56,189,248,0.3)"}
                onBlur={(e)  => e.target.style.borderColor = "rgba(255,255,255,0.06)"}
              />

              {/* progress bar when loading */}
              {loading && (
                <div style={{ marginTop: 20, padding: "14px 16px", background: "rgba(56,189,248,0.04)", border: "1px solid rgba(56,189,248,0.1)", borderRadius: 8 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                    <span style={{ fontSize: 10, color: "rgba(56,189,248,0.6)", fontFamily: "Space Mono, monospace", letterSpacing: "0.1em" }}>⟳ {step}</span>
                    <span style={{ fontSize: 10, color: "rgba(56,189,248,0.4)", fontFamily: "Space Mono, monospace" }}>{stepIndex}/{MODULES.length}</span>
                  </div>
                  <div style={{ height: 2, background: "rgba(56,189,248,0.1)", borderRadius: 1, overflow: "hidden" }}>
                    <div style={{ height: "100%", width: `${(stepIndex / MODULES.length) * 100}%`, background: "#38bdf8", borderRadius: 1, transition: "width 0.6s ease", boxShadow: "0 0 8px rgba(56,189,248,0.5)" }} />
                  </div>
                </div>
              )}

              <button onClick={run} disabled={loading} className="glow-btn"
                style={{ width: "100%", marginTop: 16, padding: "15px 24px", background: loading ? "rgba(255,255,255,0.02)" : "rgba(56,189,248,0.08)", border: `1px solid ${loading ? "rgba(255,255,255,0.04)" : "rgba(56,189,248,0.25)"}`, borderRadius: 8, color: loading ? "rgba(255,255,255,0.2)" : "#38bdf8", fontSize: 10, fontWeight: 700, letterSpacing: "0.3em", textTransform: "uppercase", cursor: loading ? "not-allowed" : "pointer", fontFamily: "Space Mono, monospace", transition: "all 0.2s", position: "relative", overflow: "hidden" }}>
                {!loading && <div style={{ position: "absolute", top: 0, left: "-100%", right: 0, bottom: 0, background: "linear-gradient(90deg, transparent, rgba(56,189,248,0.06), transparent)", animation: "shimmer 3s infinite" }} />}
                {loading ? `ANALYZING — ${step}` : "INITIALIZE 20-MODULE INTEGRITY SCAN ◈"}
              </button>
            </div>
          )}

          {/* PDF MODE */}
          {mode === "pdf" && (
            <div style={{ background: "rgba(8,12,20,0.98)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 14, padding: 28, position: "relative", overflow: "hidden" }}>
              <ScanLine />
              <div
                onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
                onDragLeave={() => setDragOver(false)}
                onDrop={onDrop}
                onClick={() => fileInputRef.current?.click()}
                style={{ border: `2px dashed ${dragOver ? "rgba(56,189,248,0.5)" : pdfFile ? "rgba(34,197,94,0.35)" : "rgba(255,255,255,0.08)"}`, borderRadius: 10, padding: "44px 24px", textAlign: "center", cursor: "pointer", background: dragOver ? "rgba(56,189,248,0.03)" : pdfFile ? "rgba(34,197,94,0.02)" : "rgba(0,0,0,0.3)", transition: "all 0.2s", marginBottom: 20 }}>
                <input ref={fileInputRef} type="file" accept=".pdf" onChange={onFileChange} style={{ display: "none" }} />
                {pdfFile ? (
                  <>
                    <div style={{ fontSize: 28, marginBottom: 10 }}>📄</div>
                    <div style={{ fontSize: 12, fontWeight: 700, color: "#22c55e", fontFamily: "Space Mono, monospace", marginBottom: 6 }}>{pdfFile.name}</div>
                    <div style={{ fontSize: 10, color: "rgba(255,255,255,0.25)", fontFamily: "Space Mono, monospace" }}>{(pdfFile.size / 1024).toFixed(1)} KB · CLICK TO CHANGE FILE</div>
                  </>
                ) : (
                  <>
                    <div style={{ fontSize: 28, marginBottom: 10, opacity: 0.4 }}>⬆</div>
                    <div style={{ fontSize: 11, fontWeight: 700, color: "rgba(255,255,255,0.4)", fontFamily: "Space Mono, monospace", marginBottom: 8, letterSpacing: "0.1em" }}>DROP PDF OR CLICK TO BROWSE</div>
                    <div style={{ fontSize: 10, color: "rgba(255,255,255,0.2)", fontFamily: "Space Mono, monospace" }}>MAX 50MB · SELECTABLE TEXT PDF REQUIRED</div>
                  </>
                )}
              </div>

              <div style={{ padding: "10px 16px", background: "rgba(56,189,248,0.03)", border: "1px solid rgba(56,189,248,0.08)", borderRadius: 6, marginBottom: 16, fontSize: 10, color: "rgba(56,189,248,0.4)", fontFamily: "Space Mono, monospace", letterSpacing: "0.05em" }}>
                🔒 SHA-256 FINGERPRINTED · FILES NOT STORED · 20-MODULE FORENSIC PIPELINE
              </div>

              {pdfLoading && (
                <div style={{ marginBottom: 16, padding: "14px 16px", background: "rgba(56,189,248,0.04)", border: "1px solid rgba(56,189,248,0.1)", borderRadius: 8 }}>
                  <span style={{ fontSize: 10, color: "rgba(56,189,248,0.6)", fontFamily: "Space Mono, monospace", letterSpacing: "0.1em" }}>⟳ {step}</span>
                </div>
              )}

              <button onClick={runPDF} disabled={pdfLoading || !pdfFile} className="glow-btn"
                style={{ width: "100%", padding: "15px 24px", background: pdfLoading || !pdfFile ? "rgba(255,255,255,0.02)" : "rgba(56,189,248,0.08)", border: `1px solid ${pdfLoading || !pdfFile ? "rgba(255,255,255,0.04)" : "rgba(56,189,248,0.25)"}`, borderRadius: 8, color: pdfLoading || !pdfFile ? "rgba(255,255,255,0.2)" : "#38bdf8", fontSize: 10, fontWeight: 700, letterSpacing: "0.3em", textTransform: "uppercase", cursor: pdfLoading || !pdfFile ? "not-allowed" : "pointer", fontFamily: "Space Mono, monospace", transition: "all 0.2s", position: "relative", overflow: "hidden" }}>
                {!pdfLoading && pdfFile && <div style={{ position: "absolute", top: 0, left: "-100%", right: 0, bottom: 0, background: "linear-gradient(90deg, transparent, rgba(56,189,248,0.06), transparent)", animation: "shimmer 3s infinite" }} />}
                {pdfLoading ? `⟳ FORENSIC ANALYSIS RUNNING...` : "EXECUTE 20-MODULE FORENSIC SCAN ◈"}
              </button>

              {pdfDone && pdfMeta && (
                <div style={{ marginTop: 24, padding: "22px", background: "rgba(0,0,0,0.5)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 10 }}>
                  <div style={{ fontSize: 9, color: "rgba(56,189,248,0.5)", letterSpacing: "0.3em", fontFamily: "Space Mono, monospace", marginBottom: 14 }}>PAPER FORENSIC METADATA</div>
                  <div style={{ fontSize: 15, fontWeight: 700, color: "#fff", marginBottom: 16, letterSpacing: "-0.01em" }}>{pdfMeta.paper_title}</div>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16, marginBottom: 16 }}>
                    {[
                      { label: "PAGES",   value: pdfMeta.page_count },
                      { label: "FIGURES", value: pdfMeta.figure_count },
                      { label: "SIZE KB", value: pdfMeta.file_size_kb },
                    ].map(({ label, value }) => (
                      <div key={label} style={{ textAlign: "center", padding: "12px", background: "rgba(56,189,248,0.04)", borderRadius: 6, border: "1px solid rgba(56,189,248,0.08)" }}>
                        <div style={{ fontSize: 20, fontWeight: 900, color: "#38bdf8", fontFamily: "Space Mono, monospace", letterSpacing: "-0.03em" }}>{value}</div>
                        <div style={{ fontSize: 8, color: "rgba(255,255,255,0.25)", letterSpacing: "0.25em", marginTop: 4, fontFamily: "Space Mono, monospace" }}>{label}</div>
                      </div>
                    ))}
                  </div>
                  <div style={{ fontSize: 10, padding: "10px 14px", background: "rgba(0,0,0,0.6)", borderRadius: 6, fontFamily: "Space Mono, monospace", color: "rgba(255,255,255,0.3)", marginBottom: 14, wordBreak: "break-all" }}>
                    SHA-256 › {pdfMeta.sha256.slice(0, 40)}...
                  </div>
                  {pdfMeta.top_flags.length > 0 && (
                    <div>
                      <div style={{ fontSize: 9, color: "rgba(239,68,68,0.5)", letterSpacing: "0.3em", fontFamily: "Space Mono, monospace", marginBottom: 10 }}>TOP INTEGRITY FLAGS</div>
                      {pdfMeta.top_flags.map((f, i) => (
                        <div key={i} style={{ fontSize: 10, color: "rgba(255,255,255,0.4)", padding: "7px 12px", borderLeft: "2px solid rgba(239,68,68,0.3)", marginBottom: 5, lineHeight: 1.6, fontFamily: "Space Mono, monospace", background: "rgba(239,68,68,0.03)", borderRadius: "0 4px 4px 0" }}>{f}</div>
                      ))}
                    </div>
                  )}
                  <div style={{ fontSize: 9, color: "rgba(255,255,255,0.15)", fontFamily: "Space Mono, monospace", marginTop: 14, letterSpacing: "0.1em" }}>{pdfMeta.analyzed_by}</div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* ── OVERALL SCORE ── */}
        {activeDone && activeResults.length > 0 && (
          <div style={{ background: "rgba(8,12,20,0.98)", border: `1px solid ${overallColor}18`, borderRadius: 14, padding: 32, marginBottom: 20, position: "relative", overflow: "hidden" }}>
            <div style={{ position: "absolute", top: 0, right: 0, width: 300, height: 300, background: `radial-gradient(circle at top right, ${overallColor}06 0%, transparent 60%)`, pointerEvents: "none" }} />
            <div style={{ fontSize: 9, color: "rgba(255,255,255,0.2)", letterSpacing: "0.35em", textTransform: "uppercase", fontFamily: "Space Mono, monospace", marginBottom: 24 }}>
              AGGREGATE INTEGRITY ASSESSMENT — {activeResults.length} DIMENSIONS
            </div>
            <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", flexWrap: "wrap", gap: 28 }}>
              <div>
                <div style={{ fontSize: 72, fontWeight: 900, lineHeight: 0.9, color: overallColor, fontFamily: "Space Mono, monospace", letterSpacing: "-0.05em", marginBottom: 16 }}>
                  {Math.round(overall * 100)}%
                </div>
                <Badge level={overallLevel} />
                <div style={{ marginTop: 12, fontSize: 10, color: "rgba(255,255,255,0.2)", fontFamily: "Space Mono, monospace", letterSpacing: "0.05em", maxWidth: 220, lineHeight: 1.6 }}>
                  {overallLevel === "low" ? "No major integrity concerns detected across all analysis dimensions." : overallLevel === "medium" ? "Some integrity signals require attention before publication." : "Significant integrity concerns detected. Expert review required."}
                </div>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 8, minWidth: 220, maxWidth: 280 }}>
                {activeResults.map((r, i) => {
                  const c = r.risk_level?.toLowerCase() === "critical" ? "#ef4444" : r.risk_level?.toLowerCase() === "high" ? "#f97316" : r.risk_level?.toLowerCase() === "medium" ? "#eab308" : "#22c55e";
                  return (
                    <div key={i} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12 }}>
                      <span style={{ fontSize: 10, color: "rgba(255,255,255,0.3)", fontFamily: "Space Mono, monospace", flex: 1, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{r.module}</span>
                      <span style={{ fontSize: 10, fontWeight: 700, fontFamily: "Space Mono, monospace", color: c, minWidth: 32, textAlign: "right" }}>{Math.round(r.risk_score * 100)}%</span>
                    </div>
                  );
                })}
              </div>
            </div>
            <div style={{ marginTop: 24, paddingTop: 16, borderTop: "1px solid rgba(255,255,255,0.04)", fontSize: 9, color: "rgba(255,255,255,0.18)", fontFamily: "Space Mono, monospace", letterSpacing: "0.15em" }}>
              {totalFlags} TOTAL ANOMALIES · {activeResults.length} DIMENSIONS ANALYZED · SciPeerAI v2.0.0
            </div>
          </div>
        )}

        {activeDone && activeResults.length > 0 && (
          <div style={{ fontSize: 9, color: "rgba(255,255,255,0.18)", letterSpacing: "0.35em", textTransform: "uppercase", fontFamily: "Space Mono, monospace", marginBottom: 16 }}>
            DETAILED FORENSIC REPORT — MODULE BY MODULE
          </div>
        )}

        {activeResults.map((r, i) => (
          <ModuleCard key={i} r={r} index={i} isPhase5={PHASE5_IDS.has(MODULES.find(m => m.label === r.module)?.id || "")} />
        ))}

        {/* ── FOOTER ── */}
        <div style={{ textAlign: "center", marginTop: 80, paddingTop: 28, borderTop: "1px solid rgba(255,255,255,0.03)" }}>
          <div style={{ fontSize: 9, color: "rgba(255,255,255,0.12)", fontFamily: "Space Mono, monospace", letterSpacing: "0.2em", lineHeight: 2 }}>
            ENGINEERED BY{" "}
            <a href="https://sameer-nadeem-portfolio.vercel.app" target="_blank" rel="noreferrer"
              style={{ color: "rgba(56,189,248,0.3)", textDecoration: "none", transition: "color 0.2s" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#38bdf8")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(56,189,248,0.3)")}>
              SAMEER NADEEM
            </a>
            {" "}// SciPeerAI v2.0.0 // 20 MODULES // 180 TESTS // BUILDING INTELLIGENCE
          </div>
        </div>

      </div>
    </div>
  );
}