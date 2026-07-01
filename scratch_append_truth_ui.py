import sys

file_path = 'frontend/src/app/(dashboard)/startups/[id]/page.tsx'
with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

start_marker = '{activeTab === "truth engine" && ('
end_marker = '</div>\n        </div>\n\n        {/* Right Column'

start_idx = content.find(start_marker)
end_idx = content.find(end_marker)

new_content = """{activeTab === "truth engine" && (
              <div className="panel" style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                {!metrics?.truth_data ? (
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "40px", gap: "16px" }}>
                    <div style={{ width: "48px", height: "48px", borderRadius: "24px", background: "rgba(56,189,248,0.1)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--accent-blue)", fontSize: "24px" }}>
                      👁️
                    </div>
                    <div className="mono" style={{ fontSize: "14px", color: "var(--text-primary)", letterSpacing: "0.05em" }}>DEAL TRUTH ENGINE</div>
                    <div className="text-muted" style={{ fontSize: "12px", textAlign: "center", maxWidth: "350px" }}>
                      Run an AI audit cross-referencing founder claims, pitch decks, meeting transcripts, and public data to generate a verification scorecard.
                    </div>
                    <button className="btn btn-primary" style={{ marginTop: "8px" }} disabled={stageUpdating} onClick={async () => {
                      setStageUpdating(true);
                      try {
                        const res = await apiFetch("/api/truth-engine", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ startup_id: Number(id) }) });
                        setMetrics({ ...metrics, truth_data: res });
                      } catch (e) {
                        console.error(e);
                        alert("Error running truth engine");
                      }
                      setStageUpdating(false);
                    }}>
                      {stageUpdating ? "RUNNING AUDIT..." : "RUN VERIFICATION AUDIT"}
                    </button>
                  </div>
                ) : (
                  <>
                    <div className="panel-header" style={{ color: "var(--accent-blue)" }}>
                      AI Due Diligence Scorecard
                      <span className="mono" style={{ float: "right", fontSize: "12px", color: "var(--accent-emerald)" }}>CONFIDENCE: {metrics.truth_data.confidence_score}/100</span>
                    </div>
                    
                    <div>
                      <div className="mono" style={{ fontSize: "11px", color: "var(--accent-emerald)", marginBottom: "8px" }}>✓ VERIFIED CLAIMS</div>
                      <ul style={{ fontSize: "13px", color: "var(--text-primary)", paddingLeft: "20px", margin: 0 }}>
                        {metrics.truth_data.verified_claims?.map((c: string, i: number) => <li key={i} style={{ marginBottom: "6px" }}>{c}</li>)}
                      </ul>
                    </div>

                    <div style={{ marginTop: "16px" }}>
                      <div className="mono" style={{ fontSize: "11px", color: "var(--accent-amber)", marginBottom: "8px" }}>⚠ UNSUPPORTED CLAIMS</div>
                      <ul style={{ fontSize: "13px", color: "var(--text-primary)", paddingLeft: "20px", margin: 0 }}>
                        {metrics.truth_data.unsupported_claims?.map((c: string, i: number) => <li key={i} style={{ marginBottom: "6px" }}>{c}</li>)}
                      </ul>
                    </div>

                    <div style={{ marginTop: "16px" }}>
                      <div className="mono" style={{ fontSize: "11px", color: "var(--accent-red)", marginBottom: "8px" }}>✗ CONTRADICTIONS</div>
                      <ul style={{ fontSize: "13px", color: "var(--text-primary)", paddingLeft: "20px", margin: 0 }}>
                        {metrics.truth_data.contradictions?.map((c: string, i: number) => <li key={i} style={{ marginBottom: "6px" }}>{c}</li>)}
                      </ul>
                    </div>

                    <div style={{ marginTop: "16px", padding: "16px", background: "var(--bg-main)", borderRadius: "6px" }}>
                      <div className="mono" style={{ fontSize: "11px", color: "var(--accent-violet)", marginBottom: "8px" }}>? RECOMMENDED INVESTOR QUESTIONS</div>
                      <ul style={{ fontSize: "13px", color: "var(--text-primary)", paddingLeft: "20px", margin: 0 }}>
                        {metrics.truth_data.investor_questions?.map((c: string, i: number) => <li key={i} style={{ marginBottom: "6px" }}>{c}</li>)}
                      </ul>
                    </div>
                  </>
                )}
              </div>
            )}
"""

final_content = content[:start_idx] + new_content + content[end_idx:]

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(final_content)

print('Success')
