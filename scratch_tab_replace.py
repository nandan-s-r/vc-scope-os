import sys

file_path = 'frontend/src/app/(dashboard)/startups/[id]/page.tsx'
with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

start_marker = '{/* Deep Content area */}'
end_marker = '{/* ── RIGHT COLUMN: TELEMETRY & TASKS ── */}'

start_idx = content.find(start_marker)
end_idx = content.find(end_marker)

if start_idx == -1 or end_idx == -1:
    print('Failed to find markers')
    sys.exit(1)

new_content = """{/* Deep Content area */}
          <div style={{ flex: 1, overflowY: "auto", padding: "24px", display: "flex", flexDirection: "column", gap: "20px" }}>
            
            {activeTab === "overview" && (
              <>
                <div className="panel">
                  <div className="panel-header" style={{ color: "var(--accent-violet)" }}>
                    Automated Investment Thesis Summary
                  </div>
                  <p style={{ fontSize: "14px", color: "var(--text-primary)", lineHeight: 1.6, whiteSpace: "pre-wrap" }}>
                    {core.description || "No deal description available."}
                  </p>
                  <div style={{ marginTop: "16px", paddingTop: "12px", borderTop: "1px solid var(--border-subtle)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span className="mono" style={{ fontSize: "10px", color: "var(--text-muted)" }}>ALGORITHMIC INVESTMENT VERDICT:</span>
                    <span className="mono" style={{ fontSize: "11px", fontWeight: "bold", color: core.investment_verdict === "INVEST" ? "var(--accent-emerald)" : "var(--accent-amber)" }}>
                      {core.investment_verdict || "HOLD / REVIEW"}
                    </span>
                  </div>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "12px" }}>
                  <div className="panel" style={{ textAlign: "center", padding: "16px" }}>
                    <div className="mono text-muted" style={{ fontSize: "9px", marginBottom: "4px" }}>ARR RUN RATE</div>
                    <div style={{ fontSize: "18px", fontWeight: 700 }}>{core.revenue_arr || "N/A"}</div>
                  </div>
                  <div className="panel" style={{ textAlign: "center", padding: "16px" }}>
                    <div className="mono text-muted" style={{ fontSize: "9px", marginBottom: "4px" }}>GROWTH RATE</div>
                    <div style={{ fontSize: "18px", fontWeight: 700, color: "var(--accent-emerald)" }}>{metrics?.revenue_growth_pct || "N/A"}</div>
                  </div>
                  <div className="panel" style={{ textAlign: "center", padding: "16px" }}>
                    <div className="mono text-muted" style={{ fontSize: "9px", marginBottom: "4px" }}>TARGET VALUATION</div>
                    <div style={{ fontSize: "18px", fontWeight: 700 }}>{core.valuation || "N/A"}</div>
                  </div>
                </div>
              </>
            )}

            {activeTab === "founders" && (
                <div className="panel">
                  <div className="panel-header" style={{ color: "var(--accent-blue)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span>Founder Intelligence Profiles</span>
                    <button
                      onClick={() => {
                        setEditingFounder(null);
                        setFounderForm({ name: "", title: "", email: "", background: "", linkedin: "" });
                        setIsAddingFounder(true);
                      }}
                      style={{
                        background: "var(--bg-surface)",
                        border: "1px solid var(--border-subtle)",
                        color: "var(--text-primary)",
                        padding: "2px 8px",
                        borderRadius: "4px",
                        fontSize: "10px",
                        cursor: "pointer",
                        fontFamily: "var(--font-mono, monospace)"
                      }}
                    >
                      + ADD FOUNDER
                    </button>
                  </div>
                  {founders && founders.length > 0 ? (
                    founders.map((f) => (
                      <div key={f.id} style={{ marginBottom: "16px", borderLeft: "2px solid var(--border-subtle)", paddingLeft: "16px" }}>
                        <div style={{ fontSize: "14px", fontWeight: "bold", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                          <span>
                            {f.name} <span style={{ fontSize: "11px", fontWeight: "normal", color: "var(--text-muted)" }}>— {f.title}</span>
                          </span>
                          <div style={{ display: "flex", gap: "8px" }}>
                            <button
                              onClick={() => {
                                setEditingFounder(f);
                                setFounderForm({
                                  name: f.name || "",
                                  title: f.title || "",
                                  email: f.email || "",
                                  background: f.background || "",
                                  linkedin: f.linkedin || ""
                                });
                                setIsAddingFounder(true);
                              }}
                              style={{ background: "none", border: "none", color: "var(--accent-blue)", cursor: "pointer", fontSize: "10px" }}
                              className="mono"
                            >
                              EDIT
                            </button>
                            <button
                              onClick={() => handleDeleteFounder(f.id)}
                              style={{ background: "none", border: "none", color: "var(--accent-red)", cursor: "pointer", fontSize: "10px" }}
                              className="mono"
                            >
                              DELETE
                            </button>
                          </div>
                        </div>
                        <p style={{ fontSize: "12px", color: "var(--text-secondary)", marginTop: "6px", lineHeight: 1.5 }}>
                          {f.background || "No background portfolio analysis mapped."}
                        </p>
                        <div style={{ display: "flex", gap: "20px", marginTop: "8px", fontSize: "10px" }} className="mono">
                          <div>
                            <span style={{ color: "var(--text-muted)" }}>TRUST SCORE:</span>{" "}
                            <span style={{ color: "var(--accent-emerald)", fontWeight: "bold" }}>{f.trust_score || "85"}/100</span>
                          </div>
                          <div>
                            <span style={{ color: "var(--text-muted)" }}>RESPONSIVENESS:</span>{" "}
                            <span style={{ color: "var(--accent-blue)", fontWeight: "bold" }}>{f.responsiveness_score || "90"}/100</span>
                          </div>
                          {f.email && (
                            <div>
                              <span style={{ color: "var(--text-muted)" }}>EMAIL:</span>{" "}
                              <span style={{ color: "white" }}>{f.email}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    ))
                  ) : (
                    <div style={{ fontSize: "12px", color: "var(--text-muted)", fontStyle: "italic", padding: "10px 0" }}>No founders mapped.</div>
                  )}
                </div>
            )}

            {activeTab === "diligence" && (
              <div className="panel" style={{ textAlign: "center", padding: "40px", border: "1px dashed var(--border-subtle)", borderRadius: "4px" }}>
                <div style={{ fontSize: "24px", marginBottom: "8px" }}>📄</div>
                <div style={{ fontSize: "13px", fontWeight: "bold", marginBottom: "4px" }}>Diligence Data Room</div>
                <div style={{ fontSize: "11px", color: "var(--text-muted)" }}>
                  Upload pitch decks, financials, and legal docs to trigger automatic AI due diligence.
                </div>
                <button className="btn btn-primary" style={{marginTop: "12px"}}>UPLOAD DOC</button>
              </div>
            )}

            {activeTab === "notes" && (
              <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                <div className="panel" style={{ padding: "12px" }}>
                  <textarea 
                    placeholder="Log a new CRM note..."
                    value={newNoteContent}
                    onChange={(e) => setNewNoteContent(e.target.value)}
                    style={{ width: "100%", background: "transparent", border: "none", color: "white", outline: "none", fontSize: "13px", minHeight: "60px", resize: "vertical" }}
                  />
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "8px" }}>
                    <select 
                      className="mono"
                      value={noteType}
                      onChange={(e) => setNoteType(e.target.value)}
                      style={{ background: "var(--bg-main)", border: "1px solid var(--border-subtle)", color: "var(--text-muted)", padding: "4px 8px", fontSize: "10px", borderRadius: "4px" }}
                    >
                      <option value="manual">Manual Note</option>
                      <option value="call">Call Log</option>
                      <option value="email">Email Sync</option>
                    </select>
                    <button onClick={handleAddNote} className="btn btn-primary" style={{ padding: "4px 12px", fontSize: "10px" }} disabled={!newNoteContent.trim()}>SAVE NOTE</button>
                  </div>
                </div>

                {history && history.length > 0 ? (
                  history
                    .map((m) => (
                      <div key={m.id} className="panel" style={{ display: "flex", flexDirection: "column", gap: "8px", borderLeft: m.type === "meeting" ? "2px solid var(--accent-emerald)" : "2px solid var(--accent-violet)" }}>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                          <span style={{ fontWeight: "bold", color: m.type === "meeting" ? "var(--accent-emerald)" : "var(--accent-violet)" }}>{m.title || m.type.upper()}</span>
                          <span className="mono" style={{ fontSize: "10px", color: "var(--text-muted)" }}>
                            {m.date ? new Date(m.date).toLocaleDateString() : "N/A"}
                          </span>
                        </div>
                        <p style={{ fontSize: "12px", color: "var(--text-secondary)", lineHeight: 1.5, margin: 0 }}>
                          {m.summary || m.content || "No automated summary for this stream."}
                        </p>
                        {m.transcript && (
                          <details style={{ marginTop: "6px" }}>
                            <summary style={{ cursor: "pointer", fontSize: "10px", color: "var(--accent-blue)", fontWeight: "bold" }}>
                              Expand Transcript Streams
                            </summary>
                            <pre className="mono" style={{ fontSize: "10px", background: "var(--bg-main)", padding: "10px", border: "1px solid var(--border-subtle)", borderRadius: "4px", marginTop: "6px", whiteSpace: "pre-wrap", overflowX: "auto", lineHeight: 1.5 }}>
                              {m.transcript}
                            </pre>
                          </details>
                        )}
                      </div>
                    ))
                ) : (
                  <div style={{ fontSize: "12px", color: "var(--text-muted)", fontStyle: "italic", textAlign: "center", padding: "20px" }}>
                    No CRM history recorded yet.
                  </div>
                )}
              </div>
            )}

            {activeTab === "truth engine" && (
              <div className="panel" style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "40px", gap: "16px" }}>
                <div style={{ width: "48px", height: "48px", borderRadius: "24px", background: "rgba(56,189,248,0.1)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--accent-blue)", fontSize: "24px" }}>
                  👁️
                </div>
                <div className="mono" style={{ fontSize: "14px", color: "var(--text-primary)", letterSpacing: "0.05em" }}>DEAL TRUTH ENGINE</div>
                <div className="text-muted" style={{ fontSize: "12px", textAlign: "center", maxWidth: "350px" }}>
                  Run an AI audit cross-referencing founder claims, pitch decks, meeting transcripts, and public data to generate a verification scorecard.
                </div>
                <button className="btn btn-primary" style={{ marginTop: "8px" }} onClick={() => {
                  alert("Truth Engine Audit started... (Backend processing)");
                }}>
                  RUN VERIFICATION AUDIT
                </button>
              </div>
            )}
          </div>
        </div>

        """

final_content = content[:start_idx] + new_content + content[end_idx:]

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(final_content)

print('File updated successfully.')
