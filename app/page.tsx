
// "use client";

// import { useState, useRef, useEffect } from "react";
// import axios from "axios";
// import jsPDF from "jspdf";

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
//   { id: "statistics",       label: "Statistical Audit",      endpoint: "/api/v1/analyze/statistics",       desc: "p-hacking · sample size · round numbers",         phase: 1 },
//   { id: "methodology",      label: "Methodology Checker",    endpoint: "/api/v1/analyze/methodology",      desc: "causation · control groups · timeframe",           phase: 1 },
//   { id: "citations",        label: "Citation Integrity",     endpoint: "/api/v1/analyze/citations",        desc: "self-citation · unsupported claims",               phase: 1 },
//   { id: "reproducibility",  label: "Reproducibility Scan",   endpoint: "/api/v1/analyze/reproducibility",  desc: "code · data · ethics · preregistration",           phase: 1 },
//   { id: "novelty",          label: "Novelty Scorer",         endpoint: "/api/v1/analyze/novelty",          desc: "literature search · novelty estimation",           phase: 1 },
//   { id: "grim",             label: "GRIM Test",              endpoint: "/api/v1/analyze/grim",             desc: "impossible means · data fabrication",              phase: 1 },
//   { id: "sprite",           label: "SPRITE Test",            endpoint: "/api/v1/analyze/sprite",           desc: "impossible distributions · SD verification",       phase: 1 },
//   { id: "granularity",      label: "Granularity Analyzer",   endpoint: "/api/v1/analyze/granularity",      desc: "digit preference · Benford law · round numbers",   phase: 1 },
//   { id: "pcurve",           label: "P-Curve Analyzer",       endpoint: "/api/v1/analyze/pcurve",           desc: "publication bias · p-value clustering",            phase: 1 },
//   { id: "effect_size",      label: "Effect Size Validator",  endpoint: "/api/v1/analyze/effect_size",      desc: "Cohen d · power analysis · inflated effects",      phase: 1 },
//   { id: "retraction",       label: "Retraction Checker",     endpoint: "/api/v1/analyze/retraction",       desc: "retracted citations · CrossRef live API",          phase: 1 },
//   { id: "cartel",           label: "Citation Cartel",        endpoint: "/api/v1/analyze/cartel",           desc: "citation rings · network manipulation",            phase: 1 },
//   { id: "llm",              label: "LLM Detector",           endpoint: "/api/v1/analyze/llm",              desc: "AI-generated text · burstiness · phrases",         phase: 1 },
//   { id: "fraud_fingerprint",label: "Fraud Fingerprinting",   endpoint: "/api/v1/analyze/fraud_fingerprint",desc: "writing DNA · style shift · authorship anomaly",   phase: 5 },
//   { id: "temporal_anomaly", label: "Temporal Anomaly",       endpoint: "/api/v1/analyze/temporal_anomaly", desc: "citation paradox · false recency · timeline",      phase: 5 },
//   { id: "citation_dna",     label: "Citation DNA",           endpoint: "/api/v1/analyze/citation_dna",     desc: "network concentration · journal diversity",        phase: 5 },
//   { id: "data_fingerprint", label: "Data Fingerprint",       endpoint: "/api/v1/analyze/data_fingerprint", desc: "fabrication · terminal digit · impossible values", phase: 5 },
//   { id: "peer_review",      label: "Peer Review Score",      endpoint: "/api/v1/analyze/peer_review",      desc: "fast acceptance · predatory signals · conflict",   phase: 5 },
//   { id: "ai_spectrum",      label: "AI-Human Spectrum",      endpoint: "/api/v1/analyze/ai_spectrum",      desc: "GPT-4 · Claude · Gemini attribution · ratio",      phase: 5 },
// ];

// const PHASE5_IDS = new Set(["fraud_fingerprint","temporal_anomaly","citation_dna","data_fingerprint","peer_review","ai_spectrum"]);

// function RiskBar({ score, level }: { score: number; level: string }) {
//   const color = level === "critical" ? "#ef4444" : level === "high" ? "#f97316" : level === "medium" ? "#eab308" : "#22c55e";
//   const [width, setWidth] = useState(0);
//   useEffect(() => { const t = setTimeout(() => setWidth(score * 100), 120); return () => clearTimeout(t); }, [score]);
//   return (
//     <div style={{ width: "100%" }}>
//       <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
//         <span style={{ fontSize: 10, color: "rgba(255,255,255,0.3)", letterSpacing: "0.2em", textTransform: "uppercase" }}>INTEGRITY RISK</span>
//         <span style={{ fontSize: 14, fontWeight: 800, color, fontFamily: "Space Mono, monospace", letterSpacing: "-0.02em" }}>{Math.round(score * 100)}%</span>
//       </div>
//       <div style={{ height: 2, background: "rgba(255,255,255,0.05)", borderRadius: 1, overflow: "hidden", position: "relative" }}>
//         <div style={{ position: "absolute", inset: 0, background: "rgba(255,255,255,0.02)" }} />
//         <div style={{ height: "100%", width: `${width}%`, background: `linear-gradient(90deg, ${color}88, ${color})`, borderRadius: 1, transition: "width 1.4s cubic-bezier(0.4,0,0.2,1)", boxShadow: `0 0 12px ${color}66` }} />
//       </div>
//     </div>
//   );
// }

// function Badge({ level }: { level: string }) {
//   const cfg: Record<string, { bg: string; text: string; border: string }> = {
//     critical: { bg: "rgba(239,68,68,0.08)",  text: "#ef4444", border: "rgba(239,68,68,0.25)" },
//     high:     { bg: "rgba(249,115,22,0.08)", text: "#f97316", border: "rgba(249,115,22,0.25)" },
//     medium:   { bg: "rgba(234,179,8,0.08)",  text: "#eab308", border: "rgba(234,179,8,0.25)" },
//     low:      { bg: "rgba(34,197,94,0.08)",  text: "#22c55e", border: "rgba(34,197,94,0.25)" },
//   };
//   const c = cfg[level?.toLowerCase()] || cfg.low;
//   return (
//     <span style={{ background: c.bg, color: c.text, border: `1px solid ${c.border}`, padding: "2px 10px", borderRadius: 3, fontSize: 9, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", fontFamily: "Space Mono, monospace" }}>
//       {level?.toUpperCase()}
//     </span>
//   );
// }

// function FlagItem({ flag }: { flag: Flag }) {
//   const [open, setOpen] = useState(false);
//   const sev = flag.severity?.toLowerCase();
//   const color = sev === "high" ? "#ef4444" : sev === "medium" ? "#eab308" : "#22c55e";
//   return (
//     <div style={{ border: `1px solid ${color}18`, borderLeft: `2px solid ${color}55`, borderRadius: 6, marginBottom: 6, overflow: "hidden", background: `${color}04` }}>
//       <button onClick={() => setOpen(!open)} style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "9px 14px", background: "transparent", border: "none", cursor: "pointer", textAlign: "left" }}>
//         <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
//           <span style={{ width: 5, height: 5, borderRadius: "50%", background: color, flexShrink: 0 }} />
//           <span style={{ fontSize: 10, fontWeight: 700, color: "rgba(255,255,255,0.7)", letterSpacing: "0.12em", textTransform: "uppercase", fontFamily: "Space Mono, monospace" }}>
//             {flag.flag_type.replace(/_/g, " ")}
//           </span>
//           <span style={{ fontSize: 9, padding: "1px 7px", borderRadius: 2, background: `${color}14`, color, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase" }}>
//             {sev}
//           </span>
//         </div>
//         <span style={{ color: "rgba(255,255,255,0.15)", fontSize: 10 }}>{open ? "▲" : "▼"}</span>
//       </button>
//       {open && (
//         <div style={{ padding: "0 14px 12px", borderTop: "1px solid rgba(255,255,255,0.03)" }}>
//           <p style={{ fontSize: 12, color: "rgba(255,255,255,0.5)", lineHeight: 1.8, marginTop: 10, marginBottom: 0 }}>{flag.description || flag.issue}</p>
//           {flag.evidence && (
//             <div style={{ marginTop: 8, padding: "8px 12px", background: "rgba(0,0,0,0.5)", borderRadius: 4, fontFamily: "Space Mono, monospace", fontSize: 10, borderLeft: "2px solid rgba(125,211,252,0.3)" }}>
//               <span style={{ color: "#7dd3fc", letterSpacing: "0.1em" }}>EVIDENCE › </span>
//               <span style={{ color: "rgba(255,255,255,0.4)" }}>{flag.evidence}</span>
//             </div>
//           )}
//           {flag.suggestion && (
//             <div style={{ marginTop: 6, padding: "8px 12px", background: "rgba(0,0,0,0.3)", borderRadius: 4, fontSize: 10, borderLeft: "2px solid rgba(134,239,172,0.3)" }}>
//               <span style={{ color: "#86efac", letterSpacing: "0.1em", fontFamily: "Space Mono, monospace" }}>RECOMMENDATION › </span>
//               <span style={{ color: "rgba(255,255,255,0.4)" }}>{flag.suggestion}</span>
//             </div>
//           )}
//         </div>
//       )}
//     </div>
//   );
// }

// function ModuleCard({ r, index, isPhase5 }: { r: Result; index: number; isPhase5?: boolean }) {
//   const lvl = r.risk_level?.toLowerCase();
//   const accentColor = lvl === "critical" ? "#ef4444" : lvl === "high" ? "#f97316" : lvl === "medium" ? "#eab308" : "#22c55e";
//   return (
//     <div style={{ background: "rgba(8,12,20,0.95)", border: `1px solid rgba(255,255,255,${lvl === "critical" ? "0.12" : "0.05"})`, borderRadius: 14, padding: "24px 28px", marginBottom: 12, position: "relative", overflow: "hidden" }}>
//       {isPhase5 && (
//         <div style={{ position: "absolute", top: 12, right: 12, fontSize: 8, color: "rgba(168,85,247,0.7)", letterSpacing: "0.2em", fontFamily: "Space Mono, monospace", border: "1px solid rgba(168,85,247,0.2)", padding: "2px 8px", borderRadius: 2 }}>PHASE V</div>
//       )}
//       <div style={{ position: "absolute", top: 0, right: 0, width: 180, height: 180, background: `radial-gradient(circle at top right, ${accentColor}06 0%, transparent 65%)`, pointerEvents: "none" }} />
//       <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 18, flexWrap: "wrap", gap: 10 }}>
//         <div>
//           <div style={{ fontSize: 9, color: "rgba(56,189,248,0.5)", letterSpacing: "0.35em", textTransform: "uppercase", fontFamily: "Space Mono, monospace", marginBottom: 8 }}>
//             ANALYSIS — {String(index + 1).padStart(2, "0")}
//           </div>
//           <h3 style={{ fontSize: 18, fontWeight: 700, color: "#fff", letterSpacing: "-0.02em", margin: 0 }}>{r.module}</h3>
//         </div>
//         <Badge level={r.risk_level} />
//       </div>
//       <div style={{ marginBottom: 18 }}>
//         <RiskBar score={r.risk_score} level={r.risk_level} />
//       </div>
//       <p style={{ fontSize: 12, color: "rgba(255,255,255,0.4)", lineHeight: 1.8, marginBottom: 16, fontFamily: "Space Mono, monospace" }}>{r.summary}</p>
//       {r.flags.length === 0 ? (
//         <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 11, color: "#22c55e", fontFamily: "Space Mono, monospace", letterSpacing: "0.05em" }}>
//           <span>✓</span>
//           <span>NO ANOMALIES DETECTED IN THIS DIMENSION</span>
//         </div>
//       ) : (
//         <>
//           <div style={{ fontSize: 9, color: "rgba(255,255,255,0.18)", letterSpacing: "0.3em", textTransform: "uppercase", fontFamily: "Space Mono, monospace", marginBottom: 10 }}>
//             {r.flags_count} ANOMAL{r.flags_count === 1 ? "Y" : "IES"} FLAGGED
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
//       <div style={{ fontSize: 24, fontWeight: 900, color: "#fff", fontFamily: "Space Mono, monospace", letterSpacing: "-0.03em" }}>{value}</div>
//       <div style={{ fontSize: 9, color: "rgba(255,255,255,0.25)", letterSpacing: "0.25em", textTransform: "uppercase", marginTop: 4, fontFamily: "Space Mono, monospace" }}>{label}</div>
//     </div>
//   );
// }

// function ScanLine() {
//   return (
//     <div style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, pointerEvents: "none", overflow: "hidden", borderRadius: 16 }}>
//       <div style={{ position: "absolute", left: 0, right: 0, height: "1px", background: "linear-gradient(90deg, transparent, rgba(56,189,248,0.15), transparent)", animation: "scanline 4s linear infinite" }} />
//     </div>
//   );
// }

// export default function Home() {
//   const [text, setText]           = useState("");
//   const [author, setAuthor]       = useState("");
//   const [loading, setLoading]     = useState(false);
//   const [results, setResults]     = useState<Result[]>([]);
//   const [done, setDone]           = useState(false);
//   const [step, setStep]           = useState("");
//   const [stepIndex, setStepIndex] = useState(0);

//   const [mode, setMode]             = useState<"text" | "pdf">("text");
//   const [pdfFile, setPdfFile]       = useState<File | null>(null);
//   const [pdfLoading, setPdfLoading] = useState(false);
//   const [pdfResults, setPdfResults] = useState<Result[]>([]);
//   const [pdfMeta, setPdfMeta]       = useState<PDFMeta | null>(null);
//   const [pdfDone, setPdfDone]       = useState(false);
//   const [dragOver, setDragOver]     = useState(false);
//   const fileInputRef                = useRef<HTMLInputElement>(null);

//   const [notice, setNotice] = useState("");
//   const notify = (msg: string) => { setNotice(msg); setTimeout(() => setNotice(""), 4000); };

//   // ── PDF Report Generator ────────────────────────────────────────────────────
//   const generateReport = () => {
//     const doc = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
//     const W = 210;
//     const margin = 18;
//     let y = 20;

//     const line = (text: string, size = 10, color = [255, 255, 255] as number[], bold = false) => {
//       doc.setFontSize(size);
//       doc.setTextColor(color[0], color[1], color[2]);
//       doc.setFont("courier", bold ? "bold" : "normal");
//       doc.text(text, margin, y);
//       y += size * 0.45;
//     };
//     const gap  = (n = 4) => { y += n; };
//     const rule = () => {
//       doc.setDrawColor(56, 189, 248);
//       doc.setLineWidth(0.3);
//       doc.line(margin, y, W - margin, y);
//       y += 6;
//     };

//     // background
//     doc.setFillColor(6, 10, 16);
//     doc.rect(0, 0, W, 297, "F");

//     // header
//     doc.setFillColor(13, 17, 27);
//     doc.rect(0, 0, W, 36, "F");
//     doc.setFontSize(22);
//     doc.setFont("courier", "bold");
//     doc.setTextColor(56, 189, 248);
//     doc.text("SciPeer", margin, 16);
//     const sw = doc.getTextWidth("SciPeer");
//     doc.setTextColor(255, 255, 255);
//     doc.text("AI", margin + sw, 16);
//     doc.setFontSize(8);
//     doc.setFont("courier", "normal");
//     doc.setTextColor(100, 120, 140);
//     doc.text("SCIENTIFIC INTEGRITY FORENSIC REPORT  //  v2.0.0  //  20-MODULE PIPELINE", margin, 24);
//     doc.setFontSize(7);
//     doc.text(`Generated: ${new Date().toUTCString()}`, margin, 30);
//     y = 44;

//     // paper meta
//     if (pdfMeta) {
//       doc.setFillColor(13, 17, 27);
//       doc.roundedRect(margin, y, W - margin * 2, 34, 2, 2, "F");
//       y += 6;
//       line("PAPER FORENSIC METADATA", 7, [56, 189, 248]);
//       gap(2);
//       line(pdfMeta.paper_title.slice(0, 60), 10, [255, 255, 255], true);
//       gap(2);
//       line(`Pages: ${pdfMeta.page_count}   Figures: ${pdfMeta.figure_count}   Size: ${pdfMeta.file_size_kb} KB`, 8, [160, 180, 200]);
//       gap(1);
//       line(`SHA-256: ${pdfMeta.sha256.slice(0, 48)}...`, 7, [100, 120, 140]);
//       y += 6;
//     }

//     rule();

//     // overall score
//     const ov    = activeResults.length ? activeResults.reduce((a, b) => a + b.risk_score, 0) / activeResults.length : 0;
//     const ovPct = Math.round(ov * 100);
//     const lvl   = ovPct >= 70 ? "CRITICAL" : ovPct >= 40 ? "HIGH" : ovPct >= 20 ? "MEDIUM" : "LOW";
//     const sc: [number, number, number] = lvl === "CRITICAL" ? [239, 68, 68] : lvl === "HIGH" ? [249, 115, 22] : lvl === "MEDIUM" ? [234, 179, 8] : [34, 197, 94];

//     doc.setFontSize(32);
//     doc.setFont("courier", "bold");
//     doc.setTextColor(...sc);
//     doc.text(`${ovPct}%`, margin, y + 10);
//     doc.setFontSize(9);
//     doc.setTextColor(...sc);
//     doc.text(lvl, margin, y + 18);
//     doc.setFontSize(8);
//     doc.setFont("courier", "normal");
//     doc.setTextColor(160, 180, 200);
//     doc.text(`AGGREGATE INTEGRITY SCORE  ·  ${activeResults.length} DIMENSIONS ANALYZED`, margin + 28, y + 10);
//     doc.text(`${activeResults.reduce((a, b) => a + b.flags_count, 0)} TOTAL ANOMALIES  ·  SciPeerAI v2.0.0`, margin + 28, y + 17);
//     y += 28;
//     rule();

//     // modules
//     line("DETAILED MODULE ANALYSIS", 8, [56, 189, 248], true);
//     gap(4);

//     activeResults.forEach((r, i) => {
//       if (y > 265) {
//         doc.addPage();
//         doc.setFillColor(6, 10, 16);
//         doc.rect(0, 0, W, 297, "F");
//         y = 20;
//       }
//       const rPct = Math.round(r.risk_score * 100);
//       const rLvl = r.risk_level?.toUpperCase() || "LOW";
//       const rc: [number, number, number] = rLvl === "CRITICAL" ? [239, 68, 68] : rLvl === "HIGH" ? [249, 115, 22] : rLvl === "MEDIUM" ? [234, 179, 8] : [34, 197, 94];

//       doc.setFillColor(13, 17, 27);
//       doc.roundedRect(margin, y, W - margin * 2, 26, 1, 1, "F");
//       y += 5;

//       doc.setFontSize(7);
//       doc.setFont("courier", "normal");
//       doc.setTextColor(56, 189, 248);
//       doc.text(`ANALYSIS — ${String(i + 1).padStart(2, "0")}`, margin + 3, y);

//       doc.setFontSize(9);
//       doc.setFont("courier", "bold");
//       doc.setTextColor(255, 255, 255);
//       doc.text(r.module, margin + 3, y + 6);

//       doc.setFontSize(9);
//       doc.setFont("courier", "bold");
//       doc.setTextColor(...rc);
//       doc.text(`${rPct}%  ${rLvl}`, W - margin - 30, y + 6);

//       doc.setFillColor(30, 40, 55);
//       doc.roundedRect(margin + 3, y + 10, W - margin * 2 - 6, 2, 0.5, 0.5, "F");
//       if (rPct > 0) {
//         doc.setFillColor(...rc);
//         doc.roundedRect(margin + 3, y + 10, (W - margin * 2 - 6) * (rPct / 100), 2, 0.5, 0.5, "F");
//       }

//       doc.setFontSize(7);
//       doc.setFont("courier", "normal");
//       doc.setTextColor(120, 140, 160);
//       const sl = doc.splitTextToSize(r.summary, W - margin * 2 - 6);
//       doc.text(sl[0] || "", margin + 3, y + 17);
//       y += 30;
//     });

//     // top flags
//     if (pdfMeta?.top_flags?.length) {
//       if (y > 240) { doc.addPage(); doc.setFillColor(6, 10, 16); doc.rect(0, 0, W, 297, "F"); y = 20; }
//       gap(2);
//       rule();
//       line("TOP INTEGRITY FLAGS", 8, [239, 68, 68], true);
//       gap(4);
//       pdfMeta.top_flags.forEach((f) => {
//         if (y > 270) { doc.addPage(); doc.setFillColor(6, 10, 16); doc.rect(0, 0, W, 297, "F"); y = 20; }
//         doc.setDrawColor(239, 68, 68);
//         doc.setLineWidth(0.3);
//         doc.line(margin, y, margin, y + 8);
//         const fl = doc.splitTextToSize(f, W - margin * 2 - 6);
//         doc.setFontSize(7);
//         doc.setFont("courier", "normal");
//         doc.setTextColor(200, 180, 180);
//         doc.text(fl[0] || "", margin + 4, y + 5);
//         y += 10;
//       });
//     }

//     // footer on all pages
//     const pages = doc.getNumberOfPages();
//     for (let p = 1; p <= pages; p++) {
//       doc.setPage(p);
//       doc.setFillColor(13, 17, 27);
//       doc.rect(0, 285, W, 12, "F");
//       doc.setFontSize(6);
//       doc.setFont("courier", "normal");
//       doc.setTextColor(80, 100, 120);
//       doc.text("ENGINEERED BY SAMEER NADEEM  //  SciPeerAI v2.0.0  //  20 MODULES  //  180 TESTS", margin, 292);
//       doc.text(`Page ${p} of ${pages}`, W - margin, 292, { align: "right" });
//     }

//     const title = pdfMeta?.paper_title || "analysis";
//     doc.save(`SciPeerAI_Report_${title.replace(/\s+/g, "_").slice(0, 40)}.pdf`);
//     notify("Report downloaded successfully!");
//   };

//   // ── Text mode ───────────────────────────────────────────────────────────────
//   const run = async () => {
//     if (text.trim().length < 50) { notify("Minimum 50 characters required."); return; }
//     setLoading(true); setResults([]); setDone(false); setStepIndex(0);
//     const out: Result[] = [];
//     for (let i = 0; i < MODULES.length; i++) {
//       const m = MODULES[i];
//       setStep(m.label); setStepIndex(i + 1);
//       try {
//         await new Promise(resolve => setTimeout(resolve, 600));
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
//           risk_score:  data.risk_score ?? data.reproducibility_score ?? data.novelty_score ?? data.grim_score ?? data.sprite_score ?? data.granularity_score ?? data.pcurve_score ?? data.effect_score ?? data.retraction_score ?? data.cartel_score ?? data.llm_score ?? data.fingerprint_score ?? data.temporal_score ?? data.dna_risk_score ?? data.manipulation_score ?? data.spectrum_score ?? 0,
//           summary:     data.summary,
//           flags:       data.flags || [],
//           flags_count: data.flags_count || 0,
//         });
//       } catch { notify(`${m.label} unavailable.`); }
//     }
//     setResults(out); setDone(true); setLoading(false); setStep(""); setStepIndex(0);
//     notify("Integrity analysis complete — 20 dimensions processed.");
//   };

//   // ── PDF mode ────────────────────────────────────────────────────────────────
//   const runPDF = async () => {
//     if (!pdfFile) { notify("Please select a PDF file first."); return; }
//     setPdfLoading(true); setPdfResults([]); setPdfMeta(null); setPdfDone(false);
//     setStep("Uploading and running 20-module forensic analysis...");
//     try {
//       const formData = new FormData();
//       formData.append("file", pdfFile);
//       const { data } = await axios.post(`${API}/api/v1/analyze/full-pdf`, formData, {
//         timeout: 180000,
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
//         paper_title:       data.paper_title,
//         page_count:        data.page_count,
//         figure_count:      data.figure_count,
//         file_size_kb:      data.file_size_kb,
//         sha256:            data.sha256,
//         overall_score:     data.overall_score,
//         overall_risk:      data.overall_risk,
//         integrity_verdict: data.integrity_verdict,
//         top_flags:         data.top_flags || [],
//         analyzed_by:       data.analyzed_by,
//       });
//       setPdfDone(true);
//       notify("PDF forensic analysis complete — 20 modules executed.");
//     } catch (err: any) {
//       notify(err?.response?.data?.detail || "PDF analysis failed. Please retry.");
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
//     if (f && f.name.endsWith(".pdf")) { setPdfFile(f); setPdfDone(false); setPdfResults([]); setPdfMeta(null); }
//     else notify("Only PDF files are accepted.");
//   };

//   const activeResults = mode === "text" ? results : pdfResults;
//   const activeDone    = mode === "text" ? done    : pdfDone;
//   const overall       = activeResults.length ? activeResults.reduce((a, b) => a + b.risk_score, 0) / activeResults.length : 0;
//   const overallLevel  = overall >= 0.7 ? "critical" : overall >= 0.4 ? "high" : overall >= 0.2 ? "medium" : "low";
//   const overallColor  = overallLevel === "critical" ? "#ef4444" : overallLevel === "high" ? "#f97316" : overallLevel === "medium" ? "#eab308" : "#22c55e";
//   const totalFlags    = activeResults.reduce((a, b) => a + b.flags_count, 0);

//   return (
//     <div style={{ minHeight: "100vh", background: "#060a10", color: "#fff", fontFamily: "system-ui, sans-serif" }}>
//       <style>{`
//         @import url('https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&display=swap');
//         * { box-sizing: border-box; margin: 0; padding: 0; }
//         body { background: #060a10; }
//         textarea, input[type="text"], input[type="email"] { font-family: 'Space Mono', monospace !important; }
//         textarea::placeholder, input::placeholder { color: rgba(255,255,255,0.15) !important; }
//         textarea:focus, input:focus { outline: none; }
//         ::-webkit-scrollbar { width: 3px; }
//         ::-webkit-scrollbar-track { background: transparent; }
//         ::-webkit-scrollbar-thumb { background: rgba(56,189,248,0.2); border-radius: 2px; }
//         @keyframes scanline { 0% { top: -2px; } 100% { top: 100%; } }
//         @keyframes pulse-dot { 0%,100%{opacity:1;box-shadow:0 0 8px #22c55e} 50%{opacity:.4;box-shadow:0 0 4px #22c55e} }
//         @keyframes shimmer { 0%{transform:translateX(-100%)} 100%{transform:translateX(100%)} }
//         @keyframes fadeInUp { from{opacity:0;transform:translateY(8px)} to{opacity:1;transform:translateY(0)} }
//         .glow-btn:hover:not(:disabled) { background:rgba(56,189,248,0.15)!important; box-shadow:0 0 24px rgba(56,189,248,0.12)!important; }
//         .nav-link:hover { color:#38bdf8!important; }
//         .module-grid-item:hover { border-color:rgba(56,189,248,0.2)!important; background:rgba(56,189,248,0.04)!important; }
//         .dl-btn:hover { background:rgba(34,197,94,0.15)!important; box-shadow:0 0 20px rgba(34,197,94,0.1)!important; }
//       `}</style>

//       {notice && (
//         <div style={{ position: "fixed", top: 20, right: 20, zIndex: 999, padding: "10px 20px", background: "rgba(6,10,16,0.98)", border: "1px solid rgba(56,189,248,0.2)", borderRadius: 6, fontSize: 11, color: "rgba(255,255,255,0.7)", backdropFilter: "blur(20px)", fontFamily: "Space Mono, monospace", letterSpacing: "0.05em", maxWidth: 340 }}>
//           {notice}
//         </div>
//       )}

//       <div style={{ maxWidth: 780, margin: "0 auto", padding: "0 24px 100px" }}>

//         {/* NAV */}
//         <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "28px 0 24px", borderBottom: "1px solid rgba(255,255,255,0.04)", marginBottom: 72 }}>
//           <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
//             <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#22c55e", animation: "pulse-dot 2s ease-in-out infinite" }} />
//             <span style={{ fontSize: 10, color: "rgba(255,255,255,0.25)", letterSpacing: "0.3em", textTransform: "uppercase", fontFamily: "Space Mono, monospace" }}>
//               SYSTEM ONLINE // INTEGRITY ENGINE v2.0 ACTIVE
//             </span>
//           </div>
//           <div style={{ display: "flex", gap: 28 }}>
//             {[
//               { label: "API Docs", href: `${API}/docs` },
//               { label: "GitHub",   href: "https://github.com/Abu-Sameer-66/SciPeerAI" },
//               { label: "Portfolio",href: "https://sameer-nadeem-portfolio.vercel.app" },
//             ].map((l) => (
//               <a key={l.label} href={l.href} target="_blank" rel="noreferrer" className="nav-link"
//                 style={{ fontSize: 10, color: "rgba(255,255,255,0.25)", textDecoration: "none", letterSpacing: "0.12em", textTransform: "uppercase", fontFamily: "Space Mono, monospace", transition: "color 0.2s" }}>
//                 {l.label} ↗
//               </a>
//             ))}
//           </div>
//         </div>

//         {/* HERO */}
//         <div style={{ marginBottom: 80 }}>
//           <div style={{ fontSize: 10, color: "rgba(56,189,248,0.5)", letterSpacing: "0.45em", textTransform: "uppercase", fontFamily: "Space Mono, monospace", marginBottom: 24 }}>
//             /// PROTOCOL: SCIENTIFIC INTEGRITY ANALYSIS
//           </div>
//           <h1 style={{ fontSize: "clamp(52px, 9vw, 88px)", fontWeight: 900, lineHeight: 0.92, letterSpacing: "-0.045em", marginBottom: 28, color: "#fff" }}>
//             SciPeer<span style={{ color: "#38bdf8" }}>AI</span>
//           </h1>
//           <p style={{ fontSize: 16, color: "rgba(255,255,255,0.35)", lineHeight: 1.8, maxWidth: 520, marginBottom: 40, fontFamily: "Space Mono, monospace", letterSpacing: "0.02em" }}>
//             Upload a PDF or paste paper text. Receive a structured forensic integrity report across 20 independent analysis dimensions — in seconds.
//           </p>
//           <div style={{ display: "flex", gap: 0, padding: "24px 0", borderTop: "1px solid rgba(255,255,255,0.05)", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
//             {[{ value: "20", label: "Modules" }, { value: "180", label: "Tests" }, { value: "21", label: "Endpoints" }, { value: "Live", label: "Deployed" }].map((s, i) => (
//               <div key={i} style={{ flex: 1, textAlign: "center", borderRight: i < 3 ? "1px solid rgba(255,255,255,0.05)" : "none", padding: "0 20px" }}>
//                 <StatPill value={s.value} label={s.label} />
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* MODULE GRID */}
//         <div style={{ marginBottom: 56 }}>
//           <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
//             <span style={{ fontSize: 9, color: "rgba(255,255,255,0.2)", letterSpacing: "0.35em", textTransform: "uppercase", fontFamily: "Space Mono, monospace" }}>ANALYSIS DIMENSIONS — 20 MODULES</span>
//             <span style={{ fontSize: 9, color: "rgba(168,85,247,0.5)", letterSpacing: "0.2em", fontFamily: "Space Mono, monospace" }}>◈ PHASE V MODULES INCLUDED</span>
//           </div>
//           <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 10 }}>
//             {MODULES.map((m, idx) => {
//               const isNew = PHASE5_IDS.has(m.id);
//               return (
//                 <div key={m.id} className="module-grid-item" style={{ padding: "14px 16px", background: isNew ? "rgba(168,85,247,0.04)" : "rgba(255,255,255,0.02)", border: `1px solid ${isNew ? "rgba(168,85,247,0.15)" : "rgba(255,255,255,0.05)"}`, borderRadius: 8, transition: "all 0.2s" }}>
//                   <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 6 }}>
//                     <div style={{ fontSize: 9, color: isNew ? "rgba(168,85,247,0.5)" : "rgba(56,189,248,0.4)", letterSpacing: "0.25em", fontFamily: "Space Mono, monospace" }}>
//                       {isNew ? `PHASE V · ${String(idx + 1).padStart(2, "0")}` : `EXP ${String(idx + 1).padStart(2, "0")}`}
//                     </div>
//                     {isNew && <span style={{ fontSize: 7, color: "rgba(168,85,247,0.6)", letterSpacing: "0.2em", fontFamily: "Space Mono, monospace", border: "1px solid rgba(168,85,247,0.2)", padding: "1px 5px", borderRadius: 2 }}>NEW</span>}
//                   </div>
//                   <div style={{ fontSize: 12, fontWeight: 700, color: "rgba(255,255,255,0.8)", marginBottom: 5 }}>{m.label}</div>
//                   <div style={{ fontSize: 10, color: "rgba(255,255,255,0.25)", lineHeight: 1.5 }}>{m.desc}</div>
//                 </div>
//               );
//             })}
//           </div>
//         </div>

//         {/* MODE TABS */}
//         <div style={{ marginBottom: 36 }}>
//           <div style={{ display: "flex", marginBottom: 20, border: "1px solid rgba(255,255,255,0.06)", borderRadius: 10, overflow: "hidden" }}>
//             {(["text", "pdf"] as const).map((m) => (
//               <button key={m} onClick={() => setMode(m)} style={{ flex: 1, padding: "13px 0", background: mode === m ? "rgba(56,189,248,0.08)" : "transparent", border: "none", borderRight: m === "text" ? "1px solid rgba(255,255,255,0.06)" : "none", color: mode === m ? "#38bdf8" : "rgba(255,255,255,0.25)", fontSize: 10, fontWeight: 700, letterSpacing: "0.3em", textTransform: "uppercase", fontFamily: "Space Mono, monospace", cursor: "pointer", transition: "all 0.2s" }}>
//                 {m === "text" ? "◈ TEXT INPUT" : "⬆ PDF UPLOAD"}
//               </button>
//             ))}
//           </div>

//           {/* TEXT MODE */}
//           {mode === "text" && (
//             <div style={{ background: "rgba(8,12,20,0.98)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 14, padding: 28, position: "relative", overflow: "hidden" }}>
//               <ScanLine />
//               <div style={{ fontSize: 9, color: "rgba(56,189,248,0.4)", letterSpacing: "0.3em", textTransform: "uppercase", fontFamily: "Space Mono, monospace", marginBottom: 12 }}>PAPER TEXT INPUT *</div>
//               <textarea value={text} onChange={(e) => setText(e.target.value)} placeholder="Paste abstract, methods section, results, or full paper text here..." rows={9}
//                 style={{ width: "100%", resize: "vertical", background: "rgba(0,0,0,0.5)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 8, padding: "14px 16px", color: "rgba(255,255,255,0.75)", fontSize: 12, lineHeight: 1.8, transition: "border-color 0.2s", fontFamily: "Space Mono, monospace" }}
//                 onFocus={(e) => e.target.style.borderColor = "rgba(56,189,248,0.3)"}
//                 onBlur={(e)  => e.target.style.borderColor = "rgba(255,255,255,0.06)"} />
//               <div style={{ fontSize: 9, color: "rgba(56,189,248,0.4)", letterSpacing: "0.3em", textTransform: "uppercase", fontFamily: "Space Mono, monospace", marginBottom: 12, marginTop: 20 }}>AUTHOR NAME — OPTIONAL</div>
//               <input value={author} onChange={(e) => setAuthor(e.target.value)} placeholder="e.g. Sameer Nadeem"
//                 style={{ width: "100%", background: "rgba(0,0,0,0.5)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 8, padding: "12px 16px", color: "rgba(255,255,255,0.75)", fontSize: 12, transition: "border-color 0.2s", fontFamily: "Space Mono, monospace" }}
//                 onFocus={(e) => e.target.style.borderColor = "rgba(56,189,248,0.3)"}
//                 onBlur={(e)  => e.target.style.borderColor = "rgba(255,255,255,0.06)"} />
//               {loading && (
//                 <div style={{ marginTop: 20, padding: "14px 16px", background: "rgba(56,189,248,0.04)", border: "1px solid rgba(56,189,248,0.1)", borderRadius: 8 }}>
//                   <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
//                     <span style={{ fontSize: 10, color: "rgba(56,189,248,0.6)", fontFamily: "Space Mono, monospace" }}>⟳ {step}</span>
//                     <span style={{ fontSize: 10, color: "rgba(56,189,248,0.4)", fontFamily: "Space Mono, monospace" }}>{stepIndex}/{MODULES.length}</span>
//                   </div>
//                   <div style={{ height: 2, background: "rgba(56,189,248,0.1)", borderRadius: 1, overflow: "hidden" }}>
//                     <div style={{ height: "100%", width: `${(stepIndex / MODULES.length) * 100}%`, background: "#38bdf8", borderRadius: 1, transition: "width 0.6s ease", boxShadow: "0 0 8px rgba(56,189,248,0.5)" }} />
//                   </div>
//                 </div>
//               )}
//               <button onClick={run} disabled={loading} className="glow-btn"
//                 style={{ width: "100%", marginTop: 16, padding: "15px 24px", background: loading ? "rgba(255,255,255,0.02)" : "rgba(56,189,248,0.08)", border: `1px solid ${loading ? "rgba(255,255,255,0.04)" : "rgba(56,189,248,0.25)"}`, borderRadius: 8, color: loading ? "rgba(255,255,255,0.2)" : "#38bdf8", fontSize: 10, fontWeight: 700, letterSpacing: "0.3em", textTransform: "uppercase", cursor: loading ? "not-allowed" : "pointer", fontFamily: "Space Mono, monospace", transition: "all 0.2s", position: "relative", overflow: "hidden" }}>
//                 {!loading && <div style={{ position: "absolute", top: 0, left: "-100%", right: 0, bottom: 0, background: "linear-gradient(90deg, transparent, rgba(56,189,248,0.06), transparent)", animation: "shimmer 3s infinite" }} />}
//                 {loading ? `ANALYZING — ${step}` : "INITIALIZE 20-MODULE INTEGRITY SCAN ◈"}
//               </button>
//             </div>
//           )}

//           {/* PDF MODE */}
//           {mode === "pdf" && (
//             <div style={{ background: "rgba(8,12,20,0.98)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 14, padding: 28, position: "relative", overflow: "hidden" }}>
//               <ScanLine />
//               <div onDragOver={(e) => { e.preventDefault(); setDragOver(true); }} onDragLeave={() => setDragOver(false)} onDrop={onDrop} onClick={() => fileInputRef.current?.click()}
//                 style={{ border: `2px dashed ${dragOver ? "rgba(56,189,248,0.5)" : pdfFile ? "rgba(34,197,94,0.35)" : "rgba(255,255,255,0.08)"}`, borderRadius: 10, padding: "44px 24px", textAlign: "center", cursor: "pointer", background: dragOver ? "rgba(56,189,248,0.03)" : pdfFile ? "rgba(34,197,94,0.02)" : "rgba(0,0,0,0.3)", transition: "all 0.2s", marginBottom: 20 }}>
//                 <input ref={fileInputRef} type="file" accept=".pdf" onChange={onFileChange} style={{ display: "none" }} />
//                 {pdfFile ? (
//                   <><div style={{ fontSize: 28, marginBottom: 10 }}>📄</div><div style={{ fontSize: 12, fontWeight: 700, color: "#22c55e", fontFamily: "Space Mono, monospace", marginBottom: 6 }}>{pdfFile.name}</div><div style={{ fontSize: 10, color: "rgba(255,255,255,0.25)", fontFamily: "Space Mono, monospace" }}>{(pdfFile.size / 1024).toFixed(1)} KB · CLICK TO CHANGE FILE</div></>
//                 ) : (
//                   <><div style={{ fontSize: 28, marginBottom: 10, opacity: 0.4 }}>⬆</div><div style={{ fontSize: 11, fontWeight: 700, color: "rgba(255,255,255,0.4)", fontFamily: "Space Mono, monospace", marginBottom: 8, letterSpacing: "0.1em" }}>DROP PDF OR CLICK TO BROWSE</div><div style={{ fontSize: 10, color: "rgba(255,255,255,0.2)", fontFamily: "Space Mono, monospace" }}>MAX 50MB · SELECTABLE TEXT PDF REQUIRED</div></>
//                 )}
//               </div>
//               <div style={{ padding: "10px 16px", background: "rgba(56,189,248,0.03)", border: "1px solid rgba(56,189,248,0.08)", borderRadius: 6, marginBottom: 16, fontSize: 10, color: "rgba(56,189,248,0.4)", fontFamily: "Space Mono, monospace" }}>
//                 🔒 SHA-256 FINGERPRINTED · FILES NOT STORED · 20-MODULE FORENSIC PIPELINE
//               </div>
//               {pdfLoading && (
//                 <div style={{ marginBottom: 16, padding: "14px 16px", background: "rgba(56,189,248,0.04)", border: "1px solid rgba(56,189,248,0.1)", borderRadius: 8 }}>
//                   <span style={{ fontSize: 10, color: "rgba(56,189,248,0.6)", fontFamily: "Space Mono, monospace" }}>⟳ {step}</span>
//                 </div>
//               )}
//               <button onClick={runPDF} disabled={pdfLoading || !pdfFile} className="glow-btn"
//                 style={{ width: "100%", padding: "15px 24px", background: pdfLoading || !pdfFile ? "rgba(255,255,255,0.02)" : "rgba(56,189,248,0.08)", border: `1px solid ${pdfLoading || !pdfFile ? "rgba(255,255,255,0.04)" : "rgba(56,189,248,0.25)"}`, borderRadius: 8, color: pdfLoading || !pdfFile ? "rgba(255,255,255,0.2)" : "#38bdf8", fontSize: 10, fontWeight: 700, letterSpacing: "0.3em", textTransform: "uppercase", cursor: pdfLoading || !pdfFile ? "not-allowed" : "pointer", fontFamily: "Space Mono, monospace", transition: "all 0.2s", position: "relative", overflow: "hidden" }}>
//                 {!pdfLoading && pdfFile && <div style={{ position: "absolute", top: 0, left: "-100%", right: 0, bottom: 0, background: "linear-gradient(90deg, transparent, rgba(56,189,248,0.06), transparent)", animation: "shimmer 3s infinite" }} />}
//                 {pdfLoading ? "⟳ FORENSIC ANALYSIS RUNNING..." : "EXECUTE 20-MODULE FORENSIC SCAN ◈"}
//               </button>
//               {pdfDone && pdfMeta && (
//                 <div style={{ marginTop: 24, padding: "22px", background: "rgba(0,0,0,0.5)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 10 }}>
//                   <div style={{ fontSize: 9, color: "rgba(56,189,248,0.5)", letterSpacing: "0.3em", fontFamily: "Space Mono, monospace", marginBottom: 14 }}>PAPER FORENSIC METADATA</div>
//                   <div style={{ fontSize: 15, fontWeight: 700, color: "#fff", marginBottom: 16 }}>{pdfMeta.paper_title}</div>
//                   <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16, marginBottom: 16 }}>
//                     {[{ label: "PAGES", value: pdfMeta.page_count }, { label: "FIGURES", value: pdfMeta.figure_count }, { label: "SIZE KB", value: pdfMeta.file_size_kb }].map(({ label, value }) => (
//                       <div key={label} style={{ textAlign: "center", padding: "12px", background: "rgba(56,189,248,0.04)", borderRadius: 6, border: "1px solid rgba(56,189,248,0.08)" }}>
//                         <div style={{ fontSize: 20, fontWeight: 900, color: "#38bdf8", fontFamily: "Space Mono, monospace" }}>{value}</div>
//                         <div style={{ fontSize: 8, color: "rgba(255,255,255,0.25)", letterSpacing: "0.25em", marginTop: 4, fontFamily: "Space Mono, monospace" }}>{label}</div>
//                       </div>
//                     ))}
//                   </div>
//                   <div style={{ fontSize: 10, padding: "10px 14px", background: "rgba(0,0,0,0.6)", borderRadius: 6, fontFamily: "Space Mono, monospace", color: "rgba(255,255,255,0.3)", marginBottom: 14, wordBreak: "break-all" }}>
//                     SHA-256 › {pdfMeta.sha256.slice(0, 40)}...
//                   </div>
//                   {pdfMeta.top_flags.length > 0 && (
//                     <div>
//                       <div style={{ fontSize: 9, color: "rgba(239,68,68,0.5)", letterSpacing: "0.3em", fontFamily: "Space Mono, monospace", marginBottom: 10 }}>TOP INTEGRITY FLAGS</div>
//                       {pdfMeta.top_flags.map((f, i) => (
//                         <div key={i} style={{ fontSize: 10, color: "rgba(255,255,255,0.4)", padding: "7px 12px", borderLeft: "2px solid rgba(239,68,68,0.3)", marginBottom: 5, lineHeight: 1.6, fontFamily: "Space Mono, monospace", background: "rgba(239,68,68,0.03)", borderRadius: "0 4px 4px 0" }}>{f}</div>
//                       ))}
//                     </div>
//                   )}
//                   <div style={{ fontSize: 9, color: "rgba(255,255,255,0.15)", fontFamily: "Space Mono, monospace", marginTop: 14 }}>{pdfMeta.analyzed_by}</div>
//                 </div>
//               )}
//             </div>
//           )}
//         </div>

//         {/* OVERALL SCORE */}
//         {activeDone && activeResults.length > 0 && (
//           <div style={{ background: "rgba(8,12,20,0.98)", border: `1px solid ${overallColor}18`, borderRadius: 14, padding: 32, marginBottom: 16, position: "relative", overflow: "hidden" }}>
//             <div style={{ position: "absolute", top: 0, right: 0, width: 300, height: 300, background: `radial-gradient(circle at top right, ${overallColor}06 0%, transparent 60%)`, pointerEvents: "none" }} />
//             <div style={{ fontSize: 9, color: "rgba(255,255,255,0.2)", letterSpacing: "0.35em", textTransform: "uppercase", fontFamily: "Space Mono, monospace", marginBottom: 24 }}>
//               AGGREGATE INTEGRITY ASSESSMENT — {activeResults.length} DIMENSIONS
//             </div>
//             <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", flexWrap: "wrap", gap: 28 }}>
//               <div>
//                 <div style={{ fontSize: 72, fontWeight: 900, lineHeight: 0.9, color: overallColor, fontFamily: "Space Mono, monospace", letterSpacing: "-0.05em", marginBottom: 16 }}>
//                   {Math.round(overall * 100)}%
//                 </div>
//                 <Badge level={overallLevel} />
//                 <div style={{ marginTop: 12, fontSize: 10, color: "rgba(255,255,255,0.2)", fontFamily: "Space Mono, monospace", maxWidth: 220, lineHeight: 1.6 }}>
//                   {overallLevel === "low" ? "No major integrity concerns detected." : overallLevel === "medium" ? "Some signals require attention before publication." : "Significant concerns detected. Expert review required."}
//                 </div>
//               </div>
//               <div style={{ display: "flex", flexDirection: "column", gap: 8, minWidth: 220, maxWidth: 280 }}>
//                 {activeResults.map((r, i) => {
//                   const c = r.risk_level?.toLowerCase() === "critical" ? "#ef4444" : r.risk_level?.toLowerCase() === "high" ? "#f97316" : r.risk_level?.toLowerCase() === "medium" ? "#eab308" : "#22c55e";
//                   return (
//                     <div key={i} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12 }}>
//                       <span style={{ fontSize: 10, color: "rgba(255,255,255,0.3)", fontFamily: "Space Mono, monospace", flex: 1, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{r.module}</span>
//                       <span style={{ fontSize: 10, fontWeight: 700, fontFamily: "Space Mono, monospace", color: c, minWidth: 32, textAlign: "right" }}>{Math.round(r.risk_score * 100)}%</span>
//                     </div>
//                   );
//                 })}
//               </div>
//             </div>
//             <div style={{ marginTop: 24, paddingTop: 16, borderTop: "1px solid rgba(255,255,255,0.04)", fontSize: 9, color: "rgba(255,255,255,0.18)", fontFamily: "Space Mono, monospace", letterSpacing: "0.15em" }}>
//               {totalFlags} TOTAL ANOMALIES · {activeResults.length} DIMENSIONS ANALYZED · SciPeerAI v2.0.0
//             </div>
//           </div>
//         )}

//         {/* DOWNLOAD REPORT BUTTON */}
//         {activeDone && activeResults.length > 0 && (
//           <button onClick={generateReport} className="dl-btn"
//             style={{ width: "100%", marginBottom: 20, padding: "14px 24px", background: "rgba(34,197,94,0.08)", border: "1px solid rgba(34,197,94,0.25)", borderRadius: 8, color: "#22c55e", fontSize: 10, fontWeight: 700, letterSpacing: "0.3em", textTransform: "uppercase", cursor: "pointer", fontFamily: "Space Mono, monospace", transition: "all 0.2s" }}>
//             ↓ DOWNLOAD FORENSIC REPORT — PDF
//           </button>
//         )}

//         {activeDone && activeResults.length > 0 && (
//           <div style={{ fontSize: 9, color: "rgba(255,255,255,0.18)", letterSpacing: "0.35em", textTransform: "uppercase", fontFamily: "Space Mono, monospace", marginBottom: 16 }}>
//             DETAILED FORENSIC REPORT — MODULE BY MODULE
//           </div>
//         )}

//         {activeResults.map((r, i) => (
//           <ModuleCard key={i} r={r} index={i} isPhase5={PHASE5_IDS.has(MODULES.find(m => m.label === r.module)?.id || "")} />
//         ))}

//         {/* FOOTER */}
//         <div style={{ textAlign: "center", marginTop: 80, paddingTop: 28, borderTop: "1px solid rgba(255,255,255,0.03)" }}>
//           <div style={{ fontSize: 9, color: "rgba(255,255,255,0.12)", fontFamily: "Space Mono, monospace", letterSpacing: "0.2em", lineHeight: 2 }}>
//             ENGINEERED BY{" "}
//             <a href="https://sameer-nadeem-portfolio.vercel.app" target="_blank" rel="noreferrer"
//               style={{ color: "rgba(56,189,248,0.3)", textDecoration: "none", transition: "color 0.2s" }}
//               onMouseEnter={(e) => (e.currentTarget.style.color = "#38bdf8")}
//               onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(56,189,248,0.3)")}>
//               SAMEER NADEEM
//             </a>
//             {" "}// SciPeerAI v2.0.0 // 20 MODULES // 180 TESTS // BUILDING INTELLIGENCE
//           </div>
//         </div>

//       </div>
//     </div>
//   );
// }
"use client";

import { useState, useRef, useEffect } from "react";
import axios from "axios";
import jsPDF from "jspdf";

const API = "https://abu-sameer-66-scipeerai-api.hf.space";

interface Flag {
  flag_type: string; severity: string; description: string;
  evidence: string; suggestion: string; issue?: string;
}
interface Result {
  module: string; risk_level: string; risk_score: number;
  summary: string; flags: Flag[]; flags_count: number;
}
interface PDFMeta {
  paper_title: string; page_count: number; figure_count: number;
  file_size_kb: number; sha256: string; overall_score: number;
  overall_risk: string; integrity_verdict: string;
  replication_probability: number; replication_level: string;
  top_flags: string[]; analyzed_by: string;
}

const MODULES = [
  { id:"statistics",            label:"Statistical Audit",           endpoint:"/api/v1/analyze/statistics",       desc:"p-hacking · sample size · round numbers"         },
  { id:"methodology",           label:"Methodology Checker",         endpoint:"/api/v1/analyze/methodology",      desc:"causation · control groups · timeframe"           },
  { id:"citations",             label:"Citation Integrity",          endpoint:"/api/v1/analyze/citations",        desc:"self-citation · unsupported claims"               },
  { id:"reproducibility",       label:"Reproducibility Scan",        endpoint:"/api/v1/analyze/reproducibility",  desc:"code · data · ethics · preregistration"           },
  { id:"novelty",               label:"Novelty Scorer",              endpoint:"/api/v1/analyze/novelty",          desc:"literature search · novelty estimation"           },
  { id:"grim",                  label:"GRIM Test",                   endpoint:"/api/v1/analyze/grim",             desc:"impossible means · data fabrication"              },
  { id:"sprite",                label:"SPRITE Test",                 endpoint:"/api/v1/analyze/sprite",           desc:"impossible distributions · SD verification"       },
  { id:"granularity",           label:"Granularity Analyzer",        endpoint:"/api/v1/analyze/granularity",      desc:"digit preference · Benford law · round numbers"   },
  { id:"pcurve",                label:"P-Curve Analyzer",            endpoint:"/api/v1/analyze/pcurve",           desc:"publication bias · p-value clustering"            },
  { id:"effect_size",           label:"Effect Size Validator",       endpoint:"/api/v1/analyze/effect_size",      desc:"Cohen d · power analysis · inflated effects"      },
  { id:"retraction",            label:"Retraction Checker",          endpoint:"/api/v1/analyze/retraction",       desc:"retracted citations · CrossRef live API"          },
  { id:"cartel",                label:"Citation Cartel",             endpoint:"/api/v1/analyze/cartel",           desc:"citation rings · network manipulation"            },
  { id:"llm",                   label:"LLM Detector",                endpoint:"/api/v1/analyze/llm",              desc:"AI-generated text · burstiness · phrases"         },
  { id:"fraud_fingerprint",     label:"Fraud Fingerprinting",        endpoint:"/api/v1/analyze/fraud_fingerprint",desc:"writing DNA · style shift · authorship anomaly"   },
  { id:"temporal_anomaly",      label:"Temporal Anomaly",            endpoint:"/api/v1/analyze/temporal_anomaly", desc:"citation paradox · false recency · timeline"      },
  { id:"citation_dna",          label:"Citation DNA",                endpoint:"/api/v1/analyze/citation_dna",     desc:"network concentration · journal diversity"        },
  { id:"data_fingerprint",      label:"Data Fingerprint",            endpoint:"/api/v1/analyze/data_fingerprint", desc:"fabrication · terminal digit · impossible values" },
  { id:"peer_review",           label:"Peer Review Score",           endpoint:"/api/v1/analyze/peer_review",      desc:"fast acceptance · predatory signals · conflict"   },
  { id:"ai_spectrum",           label:"AI-Human Spectrum",           endpoint:"/api/v1/analyze/ai_spectrum",      desc:"GPT-4 · Claude · Gemini attribution · ratio"      },
];

function RiskBar({ score, level }: { score: number; level: string }) {
  const color = level==="critical"?"#ef4444":level==="high"?"#f97316":level==="medium"?"#eab308":"#22c55e";
  const [w,setW]=useState(0);
  useEffect(()=>{const t=setTimeout(()=>setW(score*100),120);return()=>clearTimeout(t);},[score]);
  return (
    <div style={{width:"100%"}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:5}}>
        <span style={{fontSize:9,color:"rgba(255,255,255,0.2)",letterSpacing:"0.2em",textTransform:"uppercase",fontFamily:"Space Mono, monospace"}}>INTEGRITY RISK</span>
        <span style={{fontSize:13,fontWeight:800,color,fontFamily:"Space Mono, monospace"}}>{Math.round(score*100)}%</span>
      </div>
      <div style={{height:2,background:"rgba(255,255,255,0.04)",borderRadius:1,overflow:"hidden"}}>
        <div style={{height:"100%",width:`${w}%`,background:`linear-gradient(90deg,${color}55,${color})`,borderRadius:1,transition:"width 1.4s cubic-bezier(0.4,0,0.2,1)"}} />
      </div>
    </div>
  );
}

function Badge({ level }: { level: string }) {
  const m:Record<string,{bg:string;t:string;b:string}> = {
    critical:{bg:"rgba(239,68,68,0.1)",t:"#ef4444",b:"rgba(239,68,68,0.3)"},
    high:{bg:"rgba(249,115,22,0.1)",t:"#f97316",b:"rgba(249,115,22,0.3)"},
    medium:{bg:"rgba(234,179,8,0.1)",t:"#eab308",b:"rgba(234,179,8,0.3)"},
    low:{bg:"rgba(34,197,94,0.1)",t:"#22c55e",b:"rgba(34,197,94,0.3)"},
  };
  const s=m[level?.toLowerCase()]||m.low;
  return <span style={{background:s.bg,color:s.t,border:`1px solid ${s.b}`,padding:"2px 10px",borderRadius:3,fontSize:9,fontWeight:700,letterSpacing:"0.18em",textTransform:"uppercase",fontFamily:"Space Mono, monospace"}}>{level?.toUpperCase()}</span>;
}

function FlagItem({ flag }: { flag: Flag }) {
  const [open,setOpen]=useState(false);
  const sev=flag.severity?.toLowerCase();
  const col=sev==="high"?"#ef4444":sev==="medium"?"#eab308":"#22c55e";
  return (
    <div style={{border:`1px solid ${col}14`,borderLeft:`2px solid ${col}44`,borderRadius:6,marginBottom:6,overflow:"hidden"}}>
      <button onClick={()=>setOpen(!open)} style={{width:"100%",display:"flex",alignItems:"center",justifyContent:"space-between",padding:"9px 14px",background:"transparent",border:"none",cursor:"pointer",textAlign:"left"}}>
        <div style={{display:"flex",alignItems:"center",gap:9}}>
          <span style={{width:4,height:4,borderRadius:"50%",background:col,flexShrink:0}} />
          <span style={{fontSize:9,fontWeight:700,color:"rgba(255,255,255,0.6)",letterSpacing:"0.1em",textTransform:"uppercase",fontFamily:"Space Mono, monospace"}}>{flag.flag_type.replace(/_/g," ")}</span>
          <span style={{fontSize:8,padding:"1px 6px",borderRadius:2,background:`${col}12`,color:col,fontWeight:700,letterSpacing:"0.1em",textTransform:"uppercase"}}>{sev}</span>
        </div>
        <span style={{color:"rgba(255,255,255,0.1)",fontSize:9}}>{open?"▲":"▼"}</span>
      </button>
      {open&&(
        <div style={{padding:"0 14px 12px",borderTop:"1px solid rgba(255,255,255,0.03)"}}>
          <p style={{fontSize:11,color:"rgba(255,255,255,0.4)",lineHeight:1.8,marginTop:10,marginBottom:0}}>{flag.description||flag.issue}</p>
          {flag.evidence&&<div style={{marginTop:8,padding:"8px 12px",background:"rgba(0,0,0,0.5)",borderRadius:4,fontFamily:"Space Mono, monospace",fontSize:9,borderLeft:"2px solid rgba(125,211,252,0.2)"}}><span style={{color:"rgba(125,211,252,0.5)"}}>EVIDENCE › </span><span style={{color:"rgba(255,255,255,0.3)"}}>{flag.evidence}</span></div>}
          {flag.suggestion&&<div style={{marginTop:5,padding:"8px 12px",background:"rgba(0,0,0,0.3)",borderRadius:4,fontSize:9,borderLeft:"2px solid rgba(134,239,172,0.2)"}}><span style={{color:"rgba(134,239,172,0.5)",fontFamily:"Space Mono, monospace"}}>SUGGESTION › </span><span style={{color:"rgba(255,255,255,0.3)"}}>{flag.suggestion}</span></div>}
        </div>
      )}
    </div>
  );
}

function ModuleCard({ r, i }: { r: Result; i: number }) {
  const lvl=r.risk_level?.toLowerCase();
  const acc=lvl==="critical"?"#ef4444":lvl==="high"?"#f97316":lvl==="medium"?"#eab308":"#22c55e";
  return (
    <div style={{background:"rgba(7,11,18,0.97)",border:`1px solid rgba(255,255,255,${lvl==="critical"?"0.1":"0.04"})`,borderRadius:12,padding:"22px 26px",marginBottom:10,position:"relative",overflow:"hidden"}}>
      <div style={{position:"absolute",top:0,right:0,width:150,height:150,background:`radial-gradient(circle at top right,${acc}05 0%,transparent 65%)`,pointerEvents:"none"}} />
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:16,flexWrap:"wrap",gap:8}}>
        <div>
          <div style={{fontSize:8,color:"rgba(56,189,248,0.38)",letterSpacing:"0.35em",textTransform:"uppercase",fontFamily:"Space Mono, monospace",marginBottom:7}}>ANALYSIS — {String(i+1).padStart(2,"0")}</div>
          <h3 style={{fontSize:17,fontWeight:700,color:"rgba(255,255,255,0.9)",letterSpacing:"-0.02em",margin:0}}>{r.module}</h3>
        </div>
        <Badge level={r.risk_level} />
      </div>
      <div style={{marginBottom:16}}><RiskBar score={r.risk_score} level={r.risk_level} /></div>
      <p style={{fontSize:11,color:"rgba(255,255,255,0.32)",lineHeight:1.8,marginBottom:14,fontFamily:"Space Mono, monospace"}}>{r.summary}</p>
      {r.flags.length===0
        ?<div style={{display:"flex",alignItems:"center",gap:7,fontSize:9,color:"rgba(34,197,94,0.6)",fontFamily:"Space Mono, monospace",letterSpacing:"0.08em"}}><span>✓</span><span>NO ANOMALIES DETECTED IN THIS DIMENSION</span></div>
        :<><div style={{fontSize:8,color:"rgba(255,255,255,0.14)",letterSpacing:"0.28em",textTransform:"uppercase",fontFamily:"Space Mono, monospace",marginBottom:8}}>{r.flags_count} ANOMAL{r.flags_count===1?"Y":"IES"} FLAGGED</div>{r.flags.map((f,j)=><FlagItem key={j} flag={f} />)}</>
      }
    </div>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div style={{textAlign:"center"}}>
      <div style={{fontSize:22,fontWeight:900,color:"#fff",fontFamily:"Space Mono, monospace",letterSpacing:"-0.03em"}}>{value}</div>
      <div style={{fontSize:8,color:"rgba(255,255,255,0.18)",letterSpacing:"0.25em",textTransform:"uppercase",marginTop:4,fontFamily:"Space Mono, monospace"}}>{label}</div>
    </div>
  );
}

function ScanLine() {
  return (
    <div style={{position:"absolute",top:0,left:0,right:0,bottom:0,pointerEvents:"none",overflow:"hidden",borderRadius:12}}>
      <div style={{position:"absolute",left:0,right:0,height:"1px",background:"linear-gradient(90deg,transparent,rgba(56,189,248,0.1),transparent)",animation:"scanline 5s linear infinite"}} />
    </div>
  );
}

function ReplicationCard({ prob, level }: { prob: number; level: string }) {
  const pct = Math.round(prob * 100);
  const lvlLow = level?.toLowerCase();
  const col = lvlLow === "high" ? "#22c55e" : lvlLow === "moderate" ? "#eab308" : lvlLow === "low" ? "#f97316" : "#ef4444";
  const [w, setW] = useState(0);
  useEffect(() => { const t = setTimeout(() => setW(pct), 180); return () => clearTimeout(t); }, [pct]);
  return (
    <div style={{background:"rgba(7,11,18,0.97)",border:`1px solid ${col}22`,borderRadius:12,padding:"22px 26px",marginBottom:10,position:"relative",overflow:"hidden"}}>
      <div style={{position:"absolute",top:0,right:0,width:180,height:180,background:`radial-gradient(circle at top right,${col}06 0%,transparent 65%)`,pointerEvents:"none"}} />
      <div style={{fontSize:8,color:"rgba(56,189,248,0.38)",letterSpacing:"0.35em",textTransform:"uppercase",fontFamily:"Space Mono, monospace",marginBottom:7}}>ML PREDICTION — MODULE 21</div>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:18,flexWrap:"wrap",gap:8}}>
        <h3 style={{fontSize:17,fontWeight:700,color:"rgba(255,255,255,0.9)",letterSpacing:"-0.02em",margin:0}}>Replication Probability Score</h3>
        <span style={{background:`${col}14`,color:col,border:`1px solid ${col}44`,padding:"2px 10px",borderRadius:3,fontSize:9,fontWeight:700,letterSpacing:"0.18em",textTransform:"uppercase",fontFamily:"Space Mono, monospace"}}>{level?.toUpperCase()}</span>
      </div>
      <div style={{display:"flex",alignItems:"flex-end",gap:14,marginBottom:14}}>
        <div style={{fontSize:52,fontWeight:900,color:col,fontFamily:"Space Mono, monospace",lineHeight:1,letterSpacing:"-0.04em"}}>{pct}%</div>
        <div style={{paddingBottom:6}}>
          <div style={{fontSize:9,color:"rgba(255,255,255,0.2)",fontFamily:"Space Mono, monospace",letterSpacing:"0.1em"}}>REPLICATION</div>
          <div style={{fontSize:9,color:"rgba(255,255,255,0.2)",fontFamily:"Space Mono, monospace",letterSpacing:"0.1em"}}>PROBABILITY</div>
        </div>
      </div>
      <div style={{marginBottom:14}}>
        <div style={{display:"flex",justifyContent:"space-between",marginBottom:5}}>
          <span style={{fontSize:9,color:"rgba(255,255,255,0.2)",letterSpacing:"0.2em",textTransform:"uppercase",fontFamily:"Space Mono, monospace"}}>REPLICATION CONFIDENCE</span>
          <span style={{fontSize:13,fontWeight:800,color:col,fontFamily:"Space Mono, monospace"}}>{pct}%</span>
        </div>
        <div style={{height:2,background:"rgba(255,255,255,0.04)",borderRadius:1,overflow:"hidden"}}>
          <div style={{height:"100%",width:`${w}%`,background:`linear-gradient(90deg,${col}55,${col})`,borderRadius:1,transition:"width 1.4s cubic-bezier(0.4,0,0.2,1)"}} />
        </div>
      </div>
      <p style={{fontSize:11,color:"rgba(255,255,255,0.32)",lineHeight:1.8,fontFamily:"Space Mono, monospace"}}>
        {lvlLow==="high"
          ? "Strong replication indicators detected. This paper shows consistent methodology and statistical patterns that support independent replication."
          : lvlLow==="moderate"
          ? "Moderate replication likelihood. Some integrity signals present — careful review advised before building on these findings."
          : lvlLow==="low"
          ? "Multiple integrity signals reduce replication confidence. Independent verification recommended before citation."
          : "Serious integrity concerns identified. Replication is unlikely without access to raw data and author cooperation."}
      </p>
      <div style={{marginTop:14,display:"flex",alignItems:"center",gap:7,fontSize:8,color:`${col}88`,fontFamily:"Space Mono, monospace",letterSpacing:"0.1em"}}>
        <span>◈</span>
        <span>ML MODEL — LOGREG TRAINED ON 444 PAPERS · SCIIPEERBENCH v1.1</span>
      </div>
    </div>
  );
}

function DlBtn({ onClick }: { onClick: () => void }) {
  const [hov,setHov]=useState(false);
  return (
    <div style={{display:"flex",justifyContent:"center",margin:"4px 0"}}>
      <button onClick={onClick}
        onMouseEnter={()=>setHov(true)}
        onMouseLeave={()=>setHov(false)}
        style={{
          padding:"10px 28px",
          background:hov?"rgba(34,197,94,0.12)":"rgba(34,197,94,0.06)",
          border:`1px solid ${hov?"rgba(34,197,94,0.5)":"rgba(34,197,94,0.25)"}`,
          borderRadius:6,color:"#22c55e",
          fontSize:10,fontWeight:700,letterSpacing:"0.25em",textTransform:"uppercase",
          cursor:"pointer",fontFamily:"Space Mono, monospace",
          transition:"all 0.2s",display:"flex",alignItems:"center",gap:8,
        }}>
        <span style={{fontSize:12}}>↓</span>
        <span>Download Forensic Report</span>
      </button>
    </div>
  );
}

export default function Home() {
  const [text,setText]=useState("");
  const [author,setAuthor]=useState("");
  const [loading,setLoading]=useState(false);
  const [results,setResults]=useState<Result[]>([]);
  const [done,setDone]=useState(false);
  const [step,setStep]=useState("");
  const [stepIdx,setStepIdx]=useState(0);
  const [mode,setMode]=useState<"text"|"pdf">("text");
  const [pdfFile,setPdfFile]=useState<File|null>(null);
  const [pdfLoading,setPdfLoading]=useState(false);
  const [pdfResults,setPdfResults]=useState<Result[]>([]);
  const [pdfMeta,setPdfMeta]=useState<PDFMeta|null>(null);
  const [pdfDone,setPdfDone]=useState(false);
  const [drag,setDrag]=useState(false);
  const fileRef=useRef<HTMLInputElement>(null);
  const [notice,setNotice]=useState("");

  const notify=(m:string)=>{setNotice(m);setTimeout(()=>setNotice(""),4000);};
  const activeR=mode==="text"?results:pdfResults;
  const activeDone=mode==="text"?done:pdfDone;
  const avg=activeR.length?activeR.reduce((a,b)=>a+b.risk_score,0)/activeR.length:0;
  const avLvl=avg>=0.7?"critical":avg>=0.4?"high":avg>=0.2?"medium":"low";
  const avCol=avLvl==="critical"?"#ef4444":avLvl==="high"?"#f97316":avLvl==="medium"?"#eab308":"#22c55e";
  const totF=activeR.reduce((a,b)=>a+b.flags_count,0);

  // ── PDF REPORT ─────────────────────────────────────────────────────────────
  const genPDF = () => {
    const doc = new jsPDF({orientation:"portrait",unit:"mm",format:"a4"});
    const W=210, M=20;
    let y=0;

    const navy:[number,number,number]    = [15,25,50];
    const blue:[number,number,number]    = [30,80,180];
    const slate:[number,number,number]   = [80,95,120];
    const lightbg:[number,number,number] = [245,247,252];
    const white:[number,number,number]   = [255,255,255];
    const crit:[number,number,number]    = [200,30,30];
    const high:[number,number,number]    = [200,90,20];
    const med:[number,number,number]     = [160,110,0];
    const low:[number,number,number]     = [20,140,60];
    const border:[number,number,number]  = [210,215,228];

    const levelColor = (l:string):[number,number,number] => {
      const k=l?.toUpperCase();
      return k==="CRITICAL"?crit:k==="HIGH"?high:k==="MEDIUM"?med:low;
    };

    const setFill = (c:[number,number,number])=>doc.setFillColor(c[0],c[1],c[2]);
    const setTxt  = (c:[number,number,number])=>doc.setTextColor(c[0],c[1],c[2]);
    const setDraw = (c:[number,number,number])=>doc.setDrawColor(c[0],c[1],c[2]);
    const hline=(ey:number,col=border)=>{setDraw(col);doc.setLineWidth(0.2);doc.line(M,ey,W-M,ey);};
    const wrapText=(t:string,maxW:number,sz:number):string[]=>{doc.setFontSize(sz);return doc.splitTextToSize(t,maxW);};

    // ── PAGE 1 — COVER ──────────────────────────────────────────────────────
    setFill(white); doc.rect(0,0,W,297,"F");
    setFill(navy);  doc.rect(0,0,W,18,"F");
    doc.setFontSize(9); doc.setFont("helvetica","bold"); setTxt(white);
    doc.text("SCIPEERAI",M,11);
    doc.setFontSize(7); doc.setFont("helvetica","normal"); setTxt([180,195,220]);
    doc.text("SCIENTIFIC INTEGRITY ANALYSIS PLATFORM  v2.1.0",M+26,11);
    doc.setFontSize(7); setTxt([160,175,200]);
    doc.text(new Date().toLocaleDateString("en-US",{year:"numeric",month:"long",day:"numeric"}),W-M,11,{align:"right"});
    setFill(blue); doc.rect(0,18,W,2,"F");
    y=38;

    doc.setFontSize(22); doc.setFont("helvetica","bold"); setTxt(navy);
    doc.text("Scientific Integrity",M,y); y+=10;
    doc.text("Forensic Report",M,y); y+=8;
    doc.setFontSize(10); doc.setFont("helvetica","normal"); setTxt(slate);
    doc.text("Automated 21-Dimension Integrity Analysis + ML Replication Prediction",M,y); y+=16;
    hline(y,blue.map(v=>v+100) as [number,number,number]); y+=8;

    // Paper card
    setFill(lightbg); doc.roundedRect(M,y,W-M*2,42,3,3,"F");
    setDraw(border); doc.setLineWidth(0.3); doc.roundedRect(M,y,W-M*2,42,3,3,"S");
    setFill(blue); doc.roundedRect(M,y,4,42,1,1,"F");
    doc.setFontSize(7); doc.setFont("helvetica","bold"); setTxt(blue);
    doc.text("PAPER UNDER ANALYSIS",M+9,y+9);
    if(pdfMeta){
      doc.setFontSize(11); doc.setFont("helvetica","bold"); setTxt(navy);
      const titleLines=wrapText(pdfMeta.paper_title,W-M*2-14,11);
      titleLines.slice(0,2).forEach((tl,ti)=>{doc.text(tl,M+9,y+17+ti*6);});
      doc.setFontSize(8); doc.setFont("helvetica","normal"); setTxt(slate);
      doc.text(`${pdfMeta.page_count} pages  ·  ${pdfMeta.figure_count} figures  ·  ${pdfMeta.file_size_kb} KB`,M+9,y+32);
      doc.setFontSize(6.5); setTxt([140,155,175]);
      doc.text(`Integrity Hash (SHA-256): ${pdfMeta.sha256.slice(0,52)}...`,M+9,y+38);
    }
    y+=50;

    // Overall score panel
    const ov=activeR.length?activeR.reduce((a,b)=>a+b.risk_score,0)/activeR.length:0;
    const ovP=Math.round(ov*100);
    const lv=ovP>=70?"CRITICAL":ovP>=40?"HIGH":ovP>=20?"MEDIUM":"LOW";
    const sc=levelColor(lv);
    setFill(lightbg); doc.roundedRect(M,y,W-M*2,38,3,3,"F");
    setDraw(border); doc.setLineWidth(0.3); doc.roundedRect(M,y,W-M*2,38,3,3,"S");
    setFill(sc); doc.roundedRect(M,y,4,38,1,1,"F");
    doc.setFontSize(7); doc.setFont("helvetica","bold"); setTxt(sc);
    doc.text("AGGREGATE INTEGRITY SCORE",M+9,y+9);
    doc.setFontSize(28); doc.setFont("helvetica","bold"); setTxt(sc);
    doc.text(`${ovP}%`,M+9,y+25);
    const scoreW=doc.getTextWidth(`${ovP}%`);
    doc.setFontSize(10); doc.setFont("helvetica","bold"); setTxt(sc);
    doc.text(lv,M+9+scoreW+3,y+25);
    doc.setFontSize(8); doc.setFont("helvetica","normal"); setTxt(slate);
    doc.text(`${activeR.length} dimensions analyzed  ·  ${totF} anomalies flagged`,M+9,y+32);
    setFill([220,225,235]); doc.roundedRect(M+100,y+18,W-M*2-105,4,1,1,"F");
    setFill(sc); doc.roundedRect(M+100,y+18,(W-M*2-105)*(ovP/100),4,1,1,"F");
    y+=46;

    // Replication probability box
    if(pdfMeta && pdfMeta.replication_probability !== undefined){
      const repPct=Math.round(pdfMeta.replication_probability*100);
      const repLvl=pdfMeta.replication_level?.toUpperCase()||"UNKNOWN";
      const repC:Record<string,[number,number,number]>={
        "HIGH":[20,140,60],"MODERATE":[160,110,0],"LOW":[200,90,20],"VERY LOW":[200,30,30]
      };
      const rc2:([number,number,number])=repC[repLvl]||[100,100,100];
      setFill(lightbg); doc.roundedRect(M,y,W-M*2,28,3,3,"F");
      setDraw(border); doc.setLineWidth(0.3); doc.roundedRect(M,y,W-M*2,28,3,3,"S");
      setFill(rc2); doc.roundedRect(M,y,4,28,1,1,"F");
      doc.setFontSize(7); doc.setFont("helvetica","bold"); setTxt(rc2);
      doc.text("ML REPLICATION PROBABILITY — MODULE 21",M+9,y+8);
      doc.setFontSize(18); doc.setFont("helvetica","bold"); setTxt(rc2);
      doc.text(`${repPct}%`,M+9,y+21);
      const repW=doc.getTextWidth(`${repPct}%`);
      doc.setFontSize(8); doc.setFont("helvetica","bold"); setTxt(rc2);
      doc.text(repLvl,M+9+repW+3,y+21);
      doc.setFontSize(7); doc.setFont("helvetica","normal"); setTxt(slate);
      doc.text("LogReg model · SciPeerBench v1.1 · 444 papers · 19 integrity signals",M+80,y+21);
      y+=34;
    }

    if(pdfMeta?.integrity_verdict){
      doc.setFontSize(8); doc.setFont("helvetica","italic"); setTxt(slate);
      const vlines=wrapText(`"${pdfMeta.integrity_verdict}"`,W-M*2,8);
      vlines.slice(0,2).forEach((vl,vi)=>{doc.text(vl,M,y+vi*5);});
      y+=vlines.slice(0,2).length*5+6;
    }
    hline(y); y+=8;

    // Module summary table
    doc.setFontSize(9); doc.setFont("helvetica","bold"); setTxt(navy);
    doc.text("MODULE SUMMARY",M,y); y+=6;
    setFill(navy); doc.rect(M,y,W-M*2,7,"F");
    doc.setFontSize(7); doc.setFont("helvetica","bold"); setTxt(white);
    doc.text("MODULE",M+3,y+4.8);
    doc.text("RISK LEVEL",M+90,y+4.8);
    doc.text("SCORE",M+125,y+4.8);
    doc.text("FLAGS",M+148,y+4.8);
    doc.text("STATUS",M+163,y+4.8);
    y+=7;

    activeR.forEach((r,i)=>{
      if(y>272){return;}
      const rP=Math.round(r.risk_score*100);
      const rL=r.risk_level?.toUpperCase()||"LOW";
      const rc=levelColor(rL);
      const rowBg:boolean=i%2===0;
      if(rowBg){setFill(lightbg); doc.rect(M,y,W-M*2,6,"F");}
      setDraw(border); doc.setLineWidth(0.1); doc.rect(M,y,W-M*2,6,"S");
      doc.setFontSize(7); doc.setFont("helvetica","normal"); setTxt(navy);
      doc.text(r.module.slice(0,30),M+3,y+4.2);
      setFill(rc.map(v=>Math.min(255,v+180)) as [number,number,number]);
      doc.roundedRect(M+88,y+1,28,4,1,1,"F");
      doc.setFontSize(6); doc.setFont("helvetica","bold"); setTxt(rc);
      doc.text(rL,M+102,y+4.2,{align:"center"});
      doc.setFontSize(7); doc.setFont("helvetica","bold"); setTxt(rc);
      doc.text(`${rP}%`,M+130,y+4.2,{align:"center"});
      doc.setFontSize(7); doc.setFont("helvetica","normal"); setTxt(slate);
      doc.text(`${r.flags_count}`,M+153,y+4.2,{align:"center"});
      setFill(rc); doc.circle(M+168,y+3,1.5,"F");
      y+=6;
    });

    // ── PAGE 2 — DETAILED ───────────────────────────────────────────────────
    doc.addPage();
    setFill(white); doc.rect(0,0,W,297,"F");
    setFill(navy); doc.rect(0,0,W,14,"F");
    setFill(blue); doc.rect(0,14,W,1.5,"F");
    doc.setFontSize(8); doc.setFont("helvetica","bold"); setTxt(white);
    doc.text("DETAILED MODULE ANALYSIS",M,9.5);
    doc.setFontSize(7); doc.setFont("helvetica","normal"); setTxt([160,175,200]);
    doc.text(`SciPeerAI v2.1.0  ·  ${activeR.length} Modules  ·  ${totF} Anomalies Flagged`,W-M,9.5,{align:"right"});
    y=22;

    activeR.forEach((r,i)=>{
      const rP=Math.round(r.risk_score*100);
      const rL=r.risk_level?.toUpperCase()||"LOW";
      const rc=levelColor(rL);
      const sumLines=wrapText(r.summary,W-M*2-16,8);
      const flagsH=r.flags_count>0?r.flags.slice(0,3).reduce((acc,f)=>{
        const dlines=wrapText(f.description||f.issue||"",W-M*2-28,7.5);
        const elines=f.evidence?wrapText(f.evidence,W-M*2-32,7):[];
        const slines=f.suggestion?wrapText(f.suggestion,W-M*2-32,7):[];
        return acc+12+dlines.length*4.5+elines.length*4+slines.length*4+4;
      },8):0;
      const cardH=Math.max(28,20+sumLines.length*4.5+flagsH);

      if(y+cardH>280){
        doc.addPage();
        setFill(white); doc.rect(0,0,W,297,"F");
        setFill(navy); doc.rect(0,0,W,14,"F");
        setFill(blue); doc.rect(0,14,W,1.5,"F");
        doc.setFontSize(8); doc.setFont("helvetica","bold"); setTxt(white);
        doc.text("DETAILED MODULE ANALYSIS — CONTINUED",M,9.5);
        doc.setFontSize(7); setTxt([160,175,200]);
        doc.text(`SciPeerAI v2.1.0`,W-M,9.5,{align:"right"});
        y=22;
      }

      setFill(lightbg); doc.roundedRect(M,y,W-M*2,cardH,2,2,"F");
      setDraw(border); doc.setLineWidth(0.2); doc.roundedRect(M,y,W-M*2,cardH,2,2,"S");
      setFill(rc); doc.roundedRect(M,y,3.5,cardH,1,1,"F");
      doc.setFontSize(7); doc.setFont("helvetica","bold"); setTxt(blue);
      doc.text(`${String(i+1).padStart(2,"0")}`,M+8,y+7);
      doc.setFontSize(10); doc.setFont("helvetica","bold"); setTxt(navy);
      doc.text(r.module,M+18,y+7);
      setFill(rc.map(v=>Math.min(255,v+185)) as [number,number,number]);
      doc.roundedRect(W-M-38,y+2,36,8,2,2,"F");
      doc.setFontSize(7); doc.setFont("helvetica","bold"); setTxt(rc);
      doc.text(`${rP}%  ${rL}`,W-M-20,y+7.2,{align:"center"});
      setFill([210,215,225]); doc.roundedRect(M+8,y+11,W-M*2-14,2.5,0.5,0.5,"F");
      if(rP>0){setFill(rc); doc.roundedRect(M+8,y+11,(W-M*2-14)*(rP/100),2.5,0.5,0.5,"F");}
      doc.setFontSize(8); doc.setFont("helvetica","normal"); setTxt(slate);
      let cy=y+17.5;
      sumLines.forEach(sl=>{doc.text(sl,M+8,cy);cy+=4.5;});

      if(r.flags_count>0&&r.flags.length>0){
        cy+=2;
        doc.setFontSize(7); doc.setFont("helvetica","bold"); setTxt(rc);
        doc.text(`${r.flags_count} ANOMAL${r.flags_count===1?"Y":"IES"} DETECTED:`,M+8,cy);
        cy+=5;
        r.flags.slice(0,3).forEach((f)=>{
          const sev=f.severity?.toUpperCase()||"LOW";
          const fc=levelColor(sev);
          setFill(fc.map(v=>Math.min(255,v+190)) as [number,number,number]);
          doc.roundedRect(M+8,cy-3,W-M*2-12,3.5,0.5,0.5,"F");
          doc.setFontSize(6.5); doc.setFont("helvetica","bold"); setTxt(fc);
          doc.text(`▶ ${(f.flag_type||"").replace(/_/g," ").toUpperCase()}  [${sev}]`,M+10,cy);
          cy+=5;
          const desc=f.description||f.issue||"";
          if(desc){
            const dlines=wrapText(desc,W-M*2-18,7.5);
            doc.setFontSize(7.5); doc.setFont("helvetica","normal"); setTxt(navy);
            dlines.slice(0,3).forEach(dl=>{doc.text(dl,M+12,cy);cy+=4.5;});
          }
          if(f.evidence){
            const elines=wrapText(`Evidence: ${f.evidence}`,W-M*2-22,7);
            setFill([235,240,252]); doc.roundedRect(M+10,cy-1,W-M*2-16,elines.slice(0,2).length*4+3,1,1,"F");
            doc.setFontSize(7); doc.setFont("helvetica","italic"); setTxt(blue);
            elines.slice(0,2).forEach(el=>{doc.text(el,M+13,cy+1.5);cy+=4;});
            cy+=2;
          }
          if(f.suggestion){
            const slines=wrapText(`→ Recommendation: ${f.suggestion}`,W-M*2-22,7);
            setFill([235,250,240]); doc.roundedRect(M+10,cy-1,W-M*2-16,slines.slice(0,2).length*4+3,1,1,"F");
            doc.setFontSize(7); doc.setFont("helvetica","italic"); setTxt([20,130,60]);
            slines.slice(0,2).forEach(sl=>{doc.text(sl,M+13,cy+1.5);cy+=4;});
            cy+=2;
          }
          cy+=2;
        });
      }
      y+=cardH+4;
    });

    // ── FINAL PAGE — RECOMMENDATIONS ────────────────────────────────────────
    doc.addPage();
    setFill(white); doc.rect(0,0,W,297,"F");
    setFill(navy); doc.rect(0,0,W,14,"F");
    setFill(blue); doc.rect(0,14,W,1.5,"F");
    doc.setFontSize(8); doc.setFont("helvetica","bold"); setTxt(white);
    doc.text("EXECUTIVE RECOMMENDATIONS",M,9.5);
    y=24;

    const critMods=activeR.filter(r=>["critical","high"].includes(r.risk_level?.toLowerCase()));
    const medMods=activeR.filter(r=>r.risk_level?.toLowerCase()==="medium");

    if(critMods.length>0){
      doc.setFontSize(9); doc.setFont("helvetica","bold"); setTxt(crit);
      doc.text("IMMEDIATE ACTION REQUIRED",M,y); y+=6;
      critMods.forEach((r,i)=>{
        if(y>260)return;
        const rc=levelColor(r.risk_level?.toUpperCase()||"LOW");
        setFill(rc.map(v=>Math.min(255,v+190)) as [number,number,number]);
        doc.roundedRect(M,y,W-M*2,20,2,2,"F");
        setDraw(rc.map(v=>Math.min(255,v+130)) as [number,number,number]);
        doc.setLineWidth(0.2); doc.roundedRect(M,y,W-M*2,20,2,2,"S");
        setFill(rc); doc.roundedRect(M,y,3.5,20,1,1,"F");
        doc.setFontSize(8); doc.setFont("helvetica","bold"); setTxt(rc);
        doc.text(`${String(i+1).padStart(2,"0")}. ${r.module}  —  ${r.risk_level?.toUpperCase()}  (${Math.round(r.risk_score*100)}%)`,M+8,y+8);
        if(r.flags.length>0){
          const desc=r.flags[0].description||r.flags[0].issue||r.summary||"";
          const dlines=wrapText(desc,W-M*2-14,7.5);
          doc.setFontSize(7.5); doc.setFont("helvetica","normal"); setTxt(navy);
          doc.text(dlines[0]||"",M+8,y+15);
        }
        y+=24;
      });
    }

    if(medMods.length>0){
      y+=4;
      doc.setFontSize(9); doc.setFont("helvetica","bold"); setTxt(med);
      doc.text("REVIEW BEFORE SUBMISSION",M,y); y+=6;
      medMods.forEach((r,i)=>{
        if(y>260)return;
        setFill([252,248,232]); doc.roundedRect(M,y,W-M*2,13,2,2,"F");
        setDraw([220,200,100]); doc.setLineWidth(0.2); doc.roundedRect(M,y,W-M*2,13,2,2,"S");
        setFill(med); doc.roundedRect(M,y,3.5,13,1,1,"F");
        doc.setFontSize(7.5); doc.setFont("helvetica","bold"); setTxt(navy);
        doc.text(`${r.module}  (${Math.round(r.risk_score*100)}%)`,M+8,y+5.5);
        doc.setFontSize(7); doc.setFont("helvetica","normal"); setTxt(slate);
        const sl=wrapText(r.summary,W-M*2-14,7);
        doc.text(sl[0]||"",M+8,y+10.5);
        y+=17;
      });
    }

    y+=6; hline(y); y+=8;
    doc.setFontSize(9); doc.setFont("helvetica","bold"); setTxt(navy);
    doc.text("STANDARD CHECKLIST FOR AUTHORS",M,y); y+=8;
    const checks=[
      ["critical","Reproducibility: Provide GitHub repository link or data availability statement"],
      ["high",    "Effect Sizes: Report Cohen's d, r, or η² for all primary outcomes"],
      ["medium",  "References: Include DOIs for retraction database verification"],
      ["medium",  "Citations: Diversify references beyond a narrow author/journal cluster"],
      ["low",     "Pre-registration: Register hypothesis before data collection (OSF recommended)"],
      ["low",     "Statistics: Report exact p-values; avoid p < 0.05 without effect sizes"],
      ["low",     "Methods: Ensure all claims are backed by a control or comparison condition"],
    ];
    checks.forEach(([severity,text])=>{
      if(y>276)return;
      const cc=levelColor(severity.toUpperCase());
      setFill(cc); doc.circle(M+2,y-0.5,1.5,"F");
      doc.setFontSize(7.5); doc.setFont("helvetica","normal"); setTxt(navy);
      const lines=wrapText(text,W-M*2-8,7.5);
      doc.text(lines[0]||"",M+7,y); y+=5;
    });

    // Footer all pages
    const pages=doc.getNumberOfPages();
    for(let p=1;p<=pages;p++){
      doc.setPage(p);
      setFill(lightbg); doc.rect(0,284,W,13,"F");
      hline(284,border);
      doc.setFontSize(6.5); doc.setFont("helvetica","normal"); setTxt(slate);
      doc.text("SciPeerAI  ·  Engineered by Sameer Nadeem  ·  v2.1.0  ·  21 Modules  ·  194 Tests  ·  Bahawalpur, Pakistan",M,291);
      doc.text(`Page ${p} of ${pages}`,W-M,291,{align:"right"});
    }

    const fname=(pdfMeta?.paper_title||"analysis").replace(/[^a-zA-Z0-9]/g,"_").slice(0,45);
    doc.save(`SciPeerAI_Report_${fname}.pdf`);
    notify("✓ Forensic report downloaded.");
  };

  // ── Text scan ─────────────────────────────────────────────────────────────
  const run=async()=>{
    if(text.trim().length<50){notify("Minimum 50 characters required.");return;}
    setLoading(true);setResults([]);setDone(false);setStepIdx(0);
    const out:Result[]=[];
    for(let i=0;i<MODULES.length;i++){
      const m=MODULES[i];setStep(m.label);setStepIdx(i+1);
      try{
        await new Promise(r=>setTimeout(r,600));
        const p:Record<string,string>={text};
        if(m.id==="citations") p.author_name=author;
        if(m.id==="methodology") p.abstract="";
        if(m.id==="novelty") p.title="";
        const{data}=await axios.post(`${API}${m.endpoint}`,p,{timeout:35000,headers:{"Content-Type":"application/json"}});
        out.push({
          module:m.label,risk_level:data.risk_level,
          risk_score:data.risk_score??data.reproducibility_score??data.novelty_score??data.grim_score??data.sprite_score??data.granularity_score??data.pcurve_score??data.effect_score??data.retraction_score??data.cartel_score??data.llm_score??data.fingerprint_score??data.temporal_score??data.dna_risk_score??data.manipulation_score??data.spectrum_score??0,
          summary:data.summary,flags:data.flags||[],flags_count:data.flags_count||0
        });
      }catch{notify(`${m.label} unavailable.`);}
    }
    setResults(out);setDone(true);setLoading(false);setStep("");setStepIdx(0);
    notify("✓ Analysis complete — 19 dimensions processed.");
  };

  // ── PDF scan ──────────────────────────────────────────────────────────────
  const runPDF=async()=>{
    if(!pdfFile){notify("Please select a PDF file.");return;}
    setPdfLoading(true);setPdfResults([]);setPdfMeta(null);setPdfDone(false);
    setStep("Running 21-module forensic analysis...");
    try{
      const fd=new FormData();fd.append("file",pdfFile);
      const{data}=await axios.post(`${API}/api/v1/analyze/full-pdf`,fd,{timeout:180000,headers:{"Content-Type":"multipart/form-data"}});
      setPdfResults((data.modules||[]).map((m:any)=>({
        module:m.module,risk_level:m.risk_level,risk_score:m.risk_score,
        summary:m.summary,flags:[],flags_count:m.flags_count
      })));
      setPdfMeta({
        paper_title:data.paper_title,
        page_count:data.page_count,
        figure_count:data.figure_count,
        file_size_kb:data.file_size_kb,
        sha256:data.sha256,
        overall_score:data.overall_score,
        overall_risk:data.overall_risk,
        integrity_verdict:data.integrity_verdict,
        replication_probability:data.replication_probability??0.5,
        replication_level:data.replication_level??"UNKNOWN",
        top_flags:data.top_flags||[],
        analyzed_by:data.analyzed_by,
      });
      setPdfDone(true);
      notify("✓ PDF analysis complete — 21 modules executed.");
    }catch(e:any){notify(e?.response?.data?.detail||"PDF analysis failed. Retry.");}
    setPdfLoading(false);setStep("");
  };

  const onFile=(e:React.ChangeEvent<HTMLInputElement>)=>{const f=e.target.files?.[0];if(f){setPdfFile(f);setPdfDone(false);setPdfResults([]);setPdfMeta(null);}};
  const onDrop=(e:React.DragEvent)=>{e.preventDefault();setDrag(false);const f=e.dataTransfer.files?.[0];if(f&&f.name.endsWith(".pdf")){setPdfFile(f);setPdfDone(false);setPdfResults([]);setPdfMeta(null);}else notify("Only PDF files accepted.");};

  return (
    <div style={{minHeight:"100vh",background:"#060a10",color:"#fff",fontFamily:"system-ui,sans-serif"}}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&display=swap');
        *{box-sizing:border-box;margin:0;padding:0;}
        body{background:#060a10;}
        textarea,input{font-family:'Space Mono',monospace!important;}
        textarea::placeholder,input::placeholder{color:rgba(255,255,255,0.1)!important;}
        textarea:focus,input:focus{outline:none;}
        ::-webkit-scrollbar{width:2px;}
        ::-webkit-scrollbar-track{background:transparent;}
        ::-webkit-scrollbar-thumb{background:rgba(56,189,248,0.12);border-radius:1px;}
        @keyframes scanline{0%{top:-2px}100%{top:100%}}
        @keyframes pulse{0%,100%{opacity:1;box-shadow:0 0 8px #22c55e}50%{opacity:.3;box-shadow:0 0 3px #22c55e}}
        @keyframes shimmer{0%{transform:translateX(-100%)}100%{transform:translateX(100%)}}
        @keyframes fadeIn{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}
        .gb:hover:not(:disabled){background:rgba(56,189,248,0.13)!important;box-shadow:0 0 20px rgba(56,189,248,0.1)!important;}
        .nl:hover{color:#38bdf8!important;}
        .mc:hover{border-color:rgba(56,189,248,0.16)!important;background:rgba(56,189,248,0.025)!important;}
      `}</style>

      {notice&&<div style={{position:"fixed",top:20,right:20,zIndex:999,padding:"10px 18px",background:"rgba(4,8,14,0.98)",border:"1px solid rgba(56,189,248,0.2)",borderRadius:6,fontSize:10,color:"rgba(255,255,255,0.65)",backdropFilter:"blur(20px)",fontFamily:"Space Mono, monospace",letterSpacing:"0.05em",maxWidth:320}}>{notice}</div>}

      <div style={{maxWidth:780,margin:"0 auto",padding:"0 24px 100px"}}>

        {/* NAV */}
        <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"26px 0 22px",borderBottom:"1px solid rgba(255,255,255,0.03)",marginBottom:64}}>
          <div style={{display:"flex",alignItems:"center",gap:10}}>
            <div style={{width:5,height:5,borderRadius:"50%",background:"#22c55e",animation:"pulse 2.5s ease-in-out infinite"}} />
            <span style={{fontSize:9,color:"rgba(255,255,255,0.18)",letterSpacing:"0.3em",textTransform:"uppercase",fontFamily:"Space Mono, monospace"}}>SYSTEM ONLINE // INTEGRITY ENGINE v2.1 ACTIVE</span>
          </div>
          <div style={{display:"flex",gap:24}}>
            {[{l:"API",h:`${API}/docs`},{l:"GitHub",h:"https://github.com/Abu-Sameer-66/SciPeerAI"},{l:"Portfolio",h:"https://sameer-nadeem-portfolio.vercel.app"}].map(x=>(
              <a key={x.l} href={x.h} target="_blank" rel="noreferrer" className="nl" style={{fontSize:9,color:"rgba(255,255,255,0.18)",textDecoration:"none",letterSpacing:"0.12em",textTransform:"uppercase",fontFamily:"Space Mono, monospace",transition:"color 0.2s"}}>{x.l} ↗</a>
            ))}
          </div>
        </div>

        {/* HERO */}
        <div style={{marginBottom:72}}>
          <div style={{fontSize:9,color:"rgba(56,189,248,0.38)",letterSpacing:"0.5em",textTransform:"uppercase",fontFamily:"Space Mono, monospace",marginBottom:20}}>/// PROTOCOL: SCIENTIFIC INTEGRITY ANALYSIS</div>
          <h1 style={{fontSize:"clamp(50px,9vw,86px)",fontWeight:900,lineHeight:0.9,letterSpacing:"-0.045em",marginBottom:24,color:"#fff"}}>SciPeer<span style={{color:"#38bdf8"}}>AI</span></h1>
          <p style={{fontSize:14,color:"rgba(255,255,255,0.25)",lineHeight:1.9,maxWidth:500,marginBottom:36,fontFamily:"Space Mono, monospace",letterSpacing:"0.02em"}}>
            Upload a PDF or paste paper text. Receive a structured forensic integrity report across 21 independent analysis dimensions — including ML-based replication probability — in seconds.
          </p>
          <div style={{display:"flex",padding:"18px 0",borderTop:"1px solid rgba(255,255,255,0.04)",borderBottom:"1px solid rgba(255,255,255,0.04)"}}>
            {[{v:"21",l:"Modules"},{v:"194",l:"Tests"},{v:"22",l:"Endpoints"},{v:"Live",l:"Deployed"}].map((s,i)=>(
              <div key={i} style={{flex:1,textAlign:"center",borderRight:i<3?"1px solid rgba(255,255,255,0.04)":"none",padding:"0 14px"}}>
                <Stat value={s.v} label={s.l} />
              </div>
            ))}
          </div>
        </div>

        {/* MODULE GRID */}
        <div style={{marginBottom:48}}>
          <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:14}}>
            <span style={{fontSize:8,color:"rgba(255,255,255,0.13)",letterSpacing:"0.4em",textTransform:"uppercase",fontFamily:"Space Mono, monospace"}}>ANALYSIS DIMENSIONS — 21 MODULES</span>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:8}}>
            {MODULES.map((m,idx)=>(
              <div key={m.id} className="mc" style={{padding:"12px 14px",background:"rgba(255,255,255,0.015)",border:"1px solid rgba(255,255,255,0.04)",borderRadius:7,transition:"all 0.2s"}}>
                <div style={{fontSize:8,color:"rgba(56,189,248,0.32)",letterSpacing:"0.22em",fontFamily:"Space Mono, monospace",marginBottom:5}}>MODULE {String(idx+1).padStart(2,"0")}</div>
                <div style={{fontSize:11,fontWeight:700,color:"rgba(255,255,255,0.72)",marginBottom:4}}>{m.label}</div>
                <div style={{fontSize:9,color:"rgba(255,255,255,0.18)",lineHeight:1.5}}>{m.desc}</div>
              </div>
            ))}
            {/* Module 21 — special ML card */}
            <div className="mc" style={{padding:"12px 14px",background:"rgba(34,197,94,0.03)",border:"1px solid rgba(34,197,94,0.12)",borderRadius:7,transition:"all 0.2s",gridColumn:"span 1"}}>
              <div style={{display:"flex",alignItems:"center",gap:6,marginBottom:5}}>
                <div style={{fontSize:8,color:"rgba(34,197,94,0.5)",letterSpacing:"0.22em",fontFamily:"Space Mono, monospace"}}>MODULE 20</div>
                <span style={{fontSize:7,padding:"1px 5px",background:"rgba(34,197,94,0.1)",color:"#22c55e",borderRadius:2,fontFamily:"Space Mono, monospace",fontWeight:700,letterSpacing:"0.1em"}}>ML</span>
              </div>
              <div style={{fontSize:11,fontWeight:700,color:"rgba(255,255,255,0.72)",marginBottom:4}}>Replication Predictor</div>
              <div style={{fontSize:9,color:"rgba(255,255,255,0.18)",lineHeight:1.5}}>ML model · 19 signals · replication probability</div>
            </div>
          </div>
        </div>

        {/* TABS */}
        <div style={{marginBottom:28}}>
          <div style={{display:"flex",marginBottom:16,border:"1px solid rgba(255,255,255,0.05)",borderRadius:9,overflow:"hidden"}}>
            {(["text","pdf"]as const).map(m=>(
              <button key={m} onClick={()=>setMode(m)} style={{flex:1,padding:"12px 0",background:mode===m?"rgba(56,189,248,0.07)":"transparent",border:"none",borderRight:m==="text"?"1px solid rgba(255,255,255,0.05)":"none",color:mode===m?"#38bdf8":"rgba(255,255,255,0.18)",fontSize:9,fontWeight:700,letterSpacing:"0.3em",textTransform:"uppercase",fontFamily:"Space Mono, monospace",cursor:"pointer",transition:"all 0.2s"}}>
                {m==="text"?"◈ TEXT INPUT":"⬆ PDF UPLOAD"}
              </button>
            ))}
          </div>

          {mode==="text"&&(
            <div style={{background:"rgba(7,11,18,0.98)",border:"1px solid rgba(255,255,255,0.05)",borderRadius:12,padding:26,position:"relative",overflow:"hidden"}}>
              <ScanLine />
              <div style={{fontSize:8,color:"rgba(56,189,248,0.32)",letterSpacing:"0.3em",textTransform:"uppercase",fontFamily:"Space Mono, monospace",marginBottom:10}}>PAPER TEXT *</div>
              <textarea value={text} onChange={e=>setText(e.target.value)} placeholder="Paste abstract, methods, results, or full paper text..." rows={9}
                style={{width:"100%",resize:"vertical",background:"rgba(0,0,0,0.45)",border:"1px solid rgba(255,255,255,0.05)",borderRadius:7,padding:"12px 14px",color:"rgba(255,255,255,0.7)",fontSize:12,lineHeight:1.8,transition:"border-color 0.2s",fontFamily:"Space Mono, monospace"}}
                onFocus={e=>e.target.style.borderColor="rgba(56,189,248,0.22)"}
                onBlur={e=>e.target.style.borderColor="rgba(255,255,255,0.05)"} />
              <div style={{fontSize:8,color:"rgba(56,189,248,0.32)",letterSpacing:"0.3em",textTransform:"uppercase",fontFamily:"Space Mono, monospace",marginBottom:10,marginTop:18}}>AUTHOR NAME — OPTIONAL</div>
              <input value={author} onChange={e=>setAuthor(e.target.value)} placeholder="e.g. Sameer Nadeem"
                style={{width:"100%",background:"rgba(0,0,0,0.45)",border:"1px solid rgba(255,255,255,0.05)",borderRadius:7,padding:"11px 14px",color:"rgba(255,255,255,0.7)",fontSize:12,transition:"border-color 0.2s",fontFamily:"Space Mono, monospace"}}
                onFocus={e=>e.target.style.borderColor="rgba(56,189,248,0.22)"}
                onBlur={e=>e.target.style.borderColor="rgba(255,255,255,0.05)"} />
              {loading&&(
                <div style={{marginTop:16,padding:"12px 14px",background:"rgba(56,189,248,0.03)",border:"1px solid rgba(56,189,248,0.08)",borderRadius:7}}>
                  <div style={{display:"flex",justifyContent:"space-between",marginBottom:7}}>
                    <span style={{fontSize:9,color:"rgba(56,189,248,0.5)",fontFamily:"Space Mono, monospace"}}>⟳ {step}</span>
                    <span style={{fontSize:9,color:"rgba(56,189,248,0.3)",fontFamily:"Space Mono, monospace"}}>{stepIdx} / {MODULES.length}</span>
                  </div>
                  <div style={{height:1,background:"rgba(56,189,248,0.07)",borderRadius:1,overflow:"hidden"}}>
                    <div style={{height:"100%",width:`${(stepIdx/MODULES.length)*100}%`,background:"#38bdf8",borderRadius:1,transition:"width 0.6s ease"}} />
                  </div>
                </div>
              )}
              <button onClick={run} disabled={loading} className="gb"
                style={{width:"100%",marginTop:14,padding:"14px 24px",background:loading?"rgba(255,255,255,0.02)":"rgba(56,189,248,0.07)",border:`1px solid ${loading?"rgba(255,255,255,0.03)":"rgba(56,189,248,0.2)"}`,borderRadius:7,color:loading?"rgba(255,255,255,0.14)":"#38bdf8",fontSize:9,fontWeight:700,letterSpacing:"0.3em",textTransform:"uppercase",cursor:loading?"not-allowed":"pointer",fontFamily:"Space Mono, monospace",transition:"all 0.2s",position:"relative",overflow:"hidden"}}>
                {!loading&&<div style={{position:"absolute",top:0,left:"-100%",right:0,bottom:0,background:"linear-gradient(90deg,transparent,rgba(56,189,248,0.05),transparent)",animation:"shimmer 3.5s infinite"}} />}
                {loading?`ANALYZING — ${step}`:"INITIALIZE 19-MODULE INTEGRITY SCAN ◈"}
              </button>
            </div>
          )}

          {mode==="pdf"&&(
            <div style={{background:"rgba(7,11,18,0.98)",border:"1px solid rgba(255,255,255,0.05)",borderRadius:12,padding:26,position:"relative",overflow:"hidden"}}>
              <ScanLine />
              <div onDragOver={e=>{e.preventDefault();setDrag(true);}} onDragLeave={()=>setDrag(false)} onDrop={onDrop} onClick={()=>fileRef.current?.click()}
                style={{border:`2px dashed ${drag?"rgba(56,189,248,0.4)":pdfFile?"rgba(34,197,94,0.35)":"rgba(255,255,255,0.06)"}`,borderRadius:9,padding:"40px 24px",textAlign:"center",cursor:"pointer",background:drag?"rgba(56,189,248,0.02)":pdfFile?"rgba(34,197,94,0.02)":"rgba(0,0,0,0.22)",transition:"all 0.2s",marginBottom:16}}>
                <input ref={fileRef} type="file" accept=".pdf" onChange={onFile} style={{display:"none"}} />
                {pdfFile?(<><div style={{fontSize:24,marginBottom:8}}>📄</div><div style={{fontSize:11,fontWeight:700,color:"#22c55e",fontFamily:"Space Mono, monospace",marginBottom:5}}>{pdfFile.name}</div><div style={{fontSize:9,color:"rgba(255,255,255,0.2)",fontFamily:"Space Mono, monospace"}}>{(pdfFile.size/1024).toFixed(1)} KB · CLICK TO CHANGE</div></>)
                :(<><div style={{fontSize:24,marginBottom:8,opacity:0.3}}>⬆</div><div style={{fontSize:10,fontWeight:700,color:"rgba(255,255,255,0.28)",fontFamily:"Space Mono, monospace",marginBottom:6,letterSpacing:"0.1em"}}>DROP PDF OR CLICK TO BROWSE</div><div style={{fontSize:9,color:"rgba(255,255,255,0.14)",fontFamily:"Space Mono, monospace"}}>MAX 50MB · SELECTABLE TEXT REQUIRED</div></>)}
              </div>
              <div style={{padding:"9px 14px",background:"rgba(56,189,248,0.02)",border:"1px solid rgba(56,189,248,0.07)",borderRadius:5,marginBottom:14,fontSize:9,color:"rgba(56,189,248,0.32)",fontFamily:"Space Mono, monospace"}}>
                🔒 SHA-256 FINGERPRINTED · NOT STORED · 21-MODULE FORENSIC PIPELINE + ML REPLICATION
              </div>
              {pdfLoading&&<div style={{marginBottom:14,padding:"12px 14px",background:"rgba(56,189,248,0.03)",border:"1px solid rgba(56,189,248,0.08)",borderRadius:7}}><span style={{fontSize:9,color:"rgba(56,189,248,0.5)",fontFamily:"Space Mono, monospace"}}>⟳ {step}</span></div>}
              <button onClick={runPDF} disabled={pdfLoading||!pdfFile} className="gb"
                style={{width:"100%",padding:"14px 24px",background:pdfLoading||!pdfFile?"rgba(255,255,255,0.02)":"rgba(56,189,248,0.07)",border:`1px solid ${pdfLoading||!pdfFile?"rgba(255,255,255,0.03)":"rgba(56,189,248,0.2)"}`,borderRadius:7,color:pdfLoading||!pdfFile?"rgba(255,255,255,0.14)":"#38bdf8",fontSize:9,fontWeight:700,letterSpacing:"0.3em",textTransform:"uppercase",cursor:pdfLoading||!pdfFile?"not-allowed":"pointer",fontFamily:"Space Mono, monospace",transition:"all 0.2s",position:"relative",overflow:"hidden"}}>
                {!pdfLoading&&pdfFile&&<div style={{position:"absolute",top:0,left:"-100%",right:0,bottom:0,background:"linear-gradient(90deg,transparent,rgba(56,189,248,0.05),transparent)",animation:"shimmer 3.5s infinite"}} />}
                {pdfLoading?"⟳ FORENSIC ANALYSIS RUNNING...":"EXECUTE 21-MODULE FORENSIC SCAN ◈"}
              </button>

              {pdfDone&&pdfMeta&&(
                <div style={{marginTop:20,padding:"20px",background:"rgba(0,0,0,0.4)",border:"1px solid rgba(255,255,255,0.05)",borderRadius:9,animation:"fadeIn 0.4s ease"}}>
                  <div style={{fontSize:8,color:"rgba(56,189,248,0.42)",letterSpacing:"0.3em",fontFamily:"Space Mono, monospace",marginBottom:12}}>PAPER FORENSIC METADATA</div>
                  <div style={{fontSize:14,fontWeight:700,color:"rgba(255,255,255,0.88)",marginBottom:14}}>{pdfMeta.paper_title}</div>
                  <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:10,marginBottom:12}}>
                    {[{l:"PAGES",v:pdfMeta.page_count},{l:"FIGURES",v:pdfMeta.figure_count},{l:"SIZE KB",v:pdfMeta.file_size_kb}].map(({l,v})=>(
                      <div key={l} style={{textAlign:"center",padding:"10px",background:"rgba(56,189,248,0.03)",borderRadius:5,border:"1px solid rgba(56,189,248,0.07)"}}>
                        <div style={{fontSize:18,fontWeight:900,color:"#38bdf8",fontFamily:"Space Mono, monospace"}}>{v}</div>
                        <div style={{fontSize:7,color:"rgba(255,255,255,0.18)",letterSpacing:"0.25em",marginTop:3,fontFamily:"Space Mono, monospace"}}>{l}</div>
                      </div>
                    ))}
                  </div>

                  {/* Replication probability highlight */}
                  {pdfMeta.replication_probability !== undefined && (()=>{
                    const rp=Math.round(pdfMeta.replication_probability*100);
                    const rl=pdfMeta.replication_level?.toLowerCase();
                    const rc=rl==="high"?"#22c55e":rl==="moderate"?"#eab308":rl==="low"?"#f97316":"#ef4444";
                    return (
                      <div style={{marginBottom:12,padding:"14px 16px",background:`${rc}08`,border:`1px solid ${rc}25`,borderRadius:7}}>
                        <div style={{fontSize:8,color:`${rc}88`,letterSpacing:"0.3em",fontFamily:"Space Mono, monospace",marginBottom:8}}>ML REPLICATION PROBABILITY — MODULE 21</div>
                        <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",gap:16}}>
                          <div style={{fontSize:36,fontWeight:900,color:rc,fontFamily:"Space Mono, monospace",lineHeight:1}}>{rp}%</div>
                          <div style={{flex:1}}>
                            <div style={{display:"flex",justifyContent:"space-between",marginBottom:4}}>
                              <span style={{fontSize:9,color:"rgba(255,255,255,0.2)",fontFamily:"Space Mono, monospace"}}>REPLICATION CONFIDENCE</span>
                              <span style={{fontSize:9,fontWeight:700,color:rc,fontFamily:"Space Mono, monospace"}}>{pdfMeta.replication_level?.toUpperCase()}</span>
                            </div>
                            <div style={{height:3,background:"rgba(255,255,255,0.06)",borderRadius:2,overflow:"hidden"}}>
                              <div style={{height:"100%",width:`${rp}%`,background:`linear-gradient(90deg,${rc}66,${rc})`,borderRadius:2,transition:"width 1.2s ease"}} />
                            </div>
                            <div style={{fontSize:8,color:"rgba(255,255,255,0.16)",fontFamily:"Space Mono, monospace",marginTop:5}}>
                              LogReg · SciPeerBench v1.1 · 444 papers · 19 integrity signals
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })()}

                  <div style={{fontSize:9,padding:"8px 12px",background:"rgba(0,0,0,0.5)",borderRadius:5,fontFamily:"Space Mono, monospace",color:"rgba(255,255,255,0.22)",marginBottom:12,wordBreak:"break-all"}}>SHA-256 › {pdfMeta.sha256.slice(0,42)}...</div>
                  {pdfMeta.top_flags.length>0&&(
                    <div>
                      <div style={{fontSize:8,color:"rgba(239,68,68,0.42)",letterSpacing:"0.3em",fontFamily:"Space Mono, monospace",marginBottom:8}}>TOP INTEGRITY FLAGS</div>
                      {pdfMeta.top_flags.map((f,i)=>(
                        <div key={i} style={{fontSize:9,color:"rgba(255,255,255,0.32)",padding:"6px 10px",borderLeft:"2px solid rgba(239,68,68,0.22)",marginBottom:5,lineHeight:1.6,fontFamily:"Space Mono, monospace",background:"rgba(239,68,68,0.02)",borderRadius:"0 4px 4px 0"}}>{f}</div>
                      ))}
                    </div>
                  )}
                  <div style={{fontSize:8,color:"rgba(255,255,255,0.1)",fontFamily:"Space Mono, monospace",marginTop:12}}>{pdfMeta.analyzed_by}</div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* OVERALL SCORE */}
        {activeDone&&activeR.length>0&&(
          <div style={{background:"rgba(7,11,18,0.97)",border:`1px solid ${avCol}18`,borderRadius:12,padding:"28px 28px 22px",marginBottom:12,position:"relative",overflow:"hidden",animation:"fadeIn 0.5s ease"}}>
            <div style={{position:"absolute",top:0,right:0,width:220,height:220,background:`radial-gradient(circle at top right,${avCol}06 0%,transparent 60%)`,pointerEvents:"none"}} />
            <div style={{fontSize:8,color:"rgba(255,255,255,0.12)",letterSpacing:"0.4em",textTransform:"uppercase",fontFamily:"Space Mono, monospace",marginBottom:18}}>AGGREGATE INTEGRITY ASSESSMENT — {activeR.length} DIMENSIONS</div>
            <div style={{display:"flex",alignItems:"flex-start",justifyContent:"space-between",flexWrap:"wrap",gap:24,marginBottom:20}}>
              <div>
                <div style={{fontSize:62,fontWeight:900,lineHeight:0.86,color:avCol,fontFamily:"Space Mono, monospace",letterSpacing:"-0.05em",marginBottom:12}}>{Math.round(avg*100)}%</div>
                <Badge level={avLvl} />
                <div style={{marginTop:10,fontSize:9,color:"rgba(255,255,255,0.14)",fontFamily:"Space Mono, monospace",maxWidth:185,lineHeight:1.7}}>
                  {avLvl==="low"?"No major integrity concerns across all dimensions.":avLvl==="medium"?"Some signals require attention before publication.":"Significant concerns. Expert review required."}
                </div>
              </div>
              <div style={{display:"flex",flexDirection:"column",gap:5,minWidth:195,maxWidth:245}}>
                {activeR.map((r,i)=>{
                  const c=r.risk_level?.toLowerCase()==="critical"?"#ef4444":r.risk_level?.toLowerCase()==="high"?"#f97316":r.risk_level?.toLowerCase()==="medium"?"#eab308":"#22c55e";
                  const pct=Math.round(r.risk_score*100);
                  return (
                    <div key={i} style={{display:"flex",alignItems:"center",gap:8}}>
                      <span style={{fontSize:8,color:"rgba(255,255,255,0.2)",fontFamily:"Space Mono, monospace",flex:1,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{r.module}</span>
                      <div style={{width:44,height:2,background:"rgba(255,255,255,0.06)",borderRadius:1,overflow:"hidden",flexShrink:0}}>
                        <div style={{height:"100%",width:`${pct}%`,background:c,borderRadius:1}} />
                      </div>
                      <span style={{fontSize:8,fontWeight:700,fontFamily:"Space Mono, monospace",color:c,minWidth:26,textAlign:"right"}}>{pct}%</span>
                    </div>
                  );
                })}
              </div>
            </div>
            <div style={{paddingTop:14,borderTop:"1px solid rgba(255,255,255,0.03)",display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:12}}>
              <span style={{fontSize:8,color:"rgba(255,255,255,0.12)",fontFamily:"Space Mono, monospace",letterSpacing:"0.12em"}}>
                {totF} ANOMALIES · {activeR.length} DIMENSIONS · SciPeerAI v2.1.0
              </span>
              <DlBtn onClick={genPDF} />
            </div>
          </div>
        )}

        {activeDone&&activeR.length>0&&(
          <div style={{fontSize:8,color:"rgba(255,255,255,0.12)",letterSpacing:"0.4em",textTransform:"uppercase",fontFamily:"Space Mono, monospace",marginBottom:12}}>
            DETAILED FORENSIC REPORT — MODULE BY MODULE
          </div>
        )}

        {/* Module cards — show replication card first if PDF mode */}
        {mode==="pdf"&&pdfDone&&pdfMeta&&pdfMeta.replication_probability!==undefined&&(
          <ReplicationCard prob={pdfMeta.replication_probability} level={pdfMeta.replication_level} />
        )}

        {activeR.map((r,i)=>(
          <ModuleCard key={i} r={r} i={i} />
        ))}

        {activeDone&&activeR.length>0&&(
          <div style={{marginTop:16,paddingTop:16,borderTop:"1px solid rgba(255,255,255,0.04)"}}>
            <DlBtn onClick={genPDF} />
          </div>
        )}

        {/* FOOTER */}
        <div style={{textAlign:"center",marginTop:64,paddingTop:22,borderTop:"1px solid rgba(255,255,255,0.025)"}}>
          <div style={{fontSize:8,color:"rgba(255,255,255,0.09)",fontFamily:"Space Mono, monospace",letterSpacing:"0.2em",lineHeight:2}}>
            ENGINEERED BY{" "}
            <a href="https://sameer-nadeem-portfolio.vercel.app" target="_blank" rel="noreferrer"
              style={{color:"rgba(56,189,248,0.22)",textDecoration:"none",transition:"color 0.2s"}}
              onMouseEnter={e=>(e.currentTarget.style.color="#38bdf8")}
              onMouseLeave={e=>(e.currentTarget.style.color="rgba(56,189,248,0.22)")}>
              SAMEER NADEEM
            </a>
            {" "}// SciPeerAI v2.1.0 // 21 MODULES // 194 TESTS // BUILDING INTELLIGENCE
          </div>
        </div>
      </div>
    </div>
  );
}