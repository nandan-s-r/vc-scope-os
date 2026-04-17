"use client";

import { apiFetch } from "@/lib/apiClient";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function StartupsDirectory() {
  const [startups, setStartups] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // We can fetch from /api/portfolio or /api/startups
    // If /api/startups doesn't return a list, we'll try /api/portfolio
    apiFetch('/api/portfolio')
      .then(data => {
        if (data.portfolio) {
          setStartups(data.portfolio);
        } else {
          setStartups(data);
        }
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div style={{ padding: "40px", color: "var(--text-muted)", fontFamily: "var(--font-mono, 'IBM Plex Mono', monospace)" }}>LOADING STARTUP DATABASE...</div>;
  }

  return (
    <div style={{ padding: "24px" }}>
      <div style={{ marginBottom: "24px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <h1 style={{ fontSize: "24px", margin: 0 }}>Startups Directory</h1>
          <div className="mono" style={{ fontSize: "11px", color: "var(--text-muted)", marginTop: "4px" }}>ALL PIPELINE ASSETS</div>
        </div>
        <button className="btn btn-primary">+ Add Startup</button>
      </div>

      <div className="panel" style={{ padding: "0" }}>
        <table className="data-table">
          <thead>
            <tr>
              <th>STARTUP</th>
              <th>SECTOR</th>
              <th>STAGE</th>
              <th>PIPELINE STAGE</th>
              <th style={{ textAlign: "right" }}>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {startups.map((s, i) => (
              <tr key={s.id || s.startup_id || i} className="hover-row">
                <td style={{ fontWeight: "bold" }}>
                  <Link href={`/startups/${s.id || s.startup_id}`} style={{ color: "var(--accent-blue)", textDecoration: "none" }}>
                    {s.name || s.startup_name}
                  </Link>
                </td>
                <td className="mono" style={{ fontSize: "11px", color: "var(--text-secondary)" }}>{s.sector || "Unclassified"}</td>
                <td className="mono" style={{ fontSize: "11px" }}>{s.stage || "N/A"}</td>
                <td>
                  <span className="tag" style={{ background: "rgba(255,255,255,0.05)" }}>
                    {s.pipeline_stage || "Sourced"}
                  </span>
                </td>
                <td style={{ textAlign: "right" }}>
                  <button 
                    onClick={() => router.push(`/startups/${s.id || s.startup_id}`)}
                    className="btn" 
                    style={{ padding: "4px 8px", fontSize: "10px" }}
                  >
                    View & Edit
                  </button>
                </td>
              </tr>
            ))}
            {startups.length === 0 && (
              <tr>
                <td colSpan={5} style={{ textAlign: "center", padding: "20px", color: "var(--text-muted)", fontStyle: "italic" }}>
                  No startups found in the database.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
