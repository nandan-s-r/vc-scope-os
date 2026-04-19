'use client';

import { apiFetch } from '@/lib/apiClient';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import AddStartupModal from '@/components/AddStartupModal';

interface Lead {
  id: number;
  company_name: string;
  website: string;
  description: string;
  source: string;
  signal_score: number;
  status: string;
  discovered_at: string;
}

export default function DealSourcing() {
  const [leads, setLeads]               = useState<Lead[]>([]);
  const [loading, setLoading]           = useState(true);
  const [crawlerActive, setCrawlerActive] = useState(false);
  const [screeningId, setScreeningId]   = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen]   = useState(false);

  const refreshLeads = () => {
    apiFetch('/api/leads')
      
      .then(data => { setLeads(data); setLoading(false); })
      .catch(() => setLoading(false));
  };

  useEffect(() => {
    apiFetch('/api/leads')
      
      .then(data => { setLeads(data); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  const handleCrawl = () => {
    setCrawlerActive(true);
    setTimeout(() => setCrawlerActive(false), 3000);
  };

  const handleScreen = (id: number) => {
    setScreeningId(id);
    setTimeout(() => setScreeningId(null), 2500);
  };

  const getSignalColor = (score: number) => {
    if (score >= 90) return 'var(--accent-emerald)';
    if (score >= 80) return 'var(--accent-blue)';
    return 'var(--accent-violet)';
  };

  return (
    <div style={{ padding: '12px' }}>
      <div style={{ marginBottom: '16px', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 style={{ fontSize: '14px', letterSpacing: '0' }}>Automated Deal Sourcing</h1>
          <p className="mono text-muted" style={{ fontSize: '12px' }}>AI-driven web crawlers sourcing top 1% of founders</p>
        </div>
        <div style={{ display: 'flex', gap: '8px' }}>
          <button className="btn btn-secondary" onClick={() => setIsModalOpen(true)}>
            + MANUAL ENTRY
          </button>
          <button
            className="btn btn-primary"
            onClick={handleCrawl}
            disabled={crawlerActive}
            style={{ fontSize: '10px', color: crawlerActive ? 'var(--accent-emerald)' : 'var(--text-primary)', borderColor: crawlerActive ? 'var(--accent-emerald)' : undefined }}
          >
            {crawlerActive ? '⟳ CRAWLERS RUNNING...' : 'RUN CRAWLERS'}
          </button>
        </div>
      </div>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', marginBottom: '12px' }}>
        <div className="panel" style={{ borderLeft: '2px solid var(--accent-blue)' }}>
          <div className="mono text-muted" style={{ fontSize: '9px' }}>GITHUB TRACKER</div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginTop: '4px' }}>
            <span style={{ fontSize: '16px', fontWeight: 700 }}>{leads.length} leads tracked</span>
            <span className="mono" style={{ color: 'var(--accent-emerald)', fontSize: '9px' }}>+12% vs Q2</span>
          </div>
        </div>
        <div className="panel" style={{ borderLeft: '2px solid var(--accent-violet)' }}>
          <div className="mono text-muted" style={{ fontSize: '9px' }}>HACKER NEWS MONITORS</div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginTop: '4px' }}>
            <span style={{ fontSize: '16px', fontWeight: 700 }}>2,410 companies scraped</span>
            <span className="mono" style={{ color: 'var(--accent-emerald)', fontSize: '9px' }}>ONLINE</span>
          </div>
        </div>
        <div className="panel" style={{ borderLeft: '2px solid var(--accent-amber)' }}>
          <div className="mono text-muted" style={{ fontSize: '9px' }}>FOUNDER NETWORKS</div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginTop: '4px' }}>
            <span style={{ fontSize: '16px', fontWeight: 700 }}>38 talent nodes mapped</span>
            <span className="mono" style={{ color: 'var(--accent-blue)', fontSize: '9px' }}>8 alerts</span>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="panel text-muted" style={{ textAlign: 'center', padding: '40px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
            <div style={{ width: '12px', height: '12px', border: '2px solid var(--accent-violet)', borderTopColor: 'transparent', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />
            PARSING DEEP WEB SIGNAL FEEDS...
          </div>
        </div>
      ) : (
        <div className="panel">
          <div className="panel-header">
            Raw Sourcing Signal Leads Queue
            <span className="mono" style={{ color: 'var(--accent-blue)', fontSize: '9px' }}>{leads.length} SIGNALS</span>
          </div>

          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border-subtle)', color: 'var(--text-secondary)' }}>
                <th className="mono" style={{ padding: '8px 6px', fontSize: '10px' }}>COMPANY</th>
                <th className="mono" style={{ padding: '8px 6px', fontSize: '10px' }}>SOURCE</th>
                <th className="mono" style={{ padding: '8px 6px', fontSize: '10px' }}>DESCRIPTION</th>
                <th className="mono" style={{ padding: '8px 6px', fontSize: '10px' }}>SIGNAL</th>
                <th className="mono" style={{ padding: '8px 6px', fontSize: '10px' }}>STATUS</th>
                <th className="mono" style={{ padding: '8px 6px', fontSize: '10px', textAlign: 'right' }}>ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {leads.map((l) => (
                <tr key={l.id} style={{ borderBottom: '1px solid var(--border-subtle)', cursor: 'pointer' }}
                  onMouseEnter={e => (e.currentTarget.style.background = 'var(--bg-elevated)')}
                  onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
                >
                  <td style={{ padding: '8px 6px', fontWeight: 600 }}>
                    <a href={l.website} target="_blank" rel="noopener noreferrer"
                      style={{ color: 'var(--accent-blue)', textDecoration: 'underline', textDecorationColor: 'transparent' }}
                      onMouseEnter={e => (e.currentTarget.style.textDecorationColor = 'var(--accent-blue)')}
                      onMouseLeave={e => (e.currentTarget.style.textDecorationColor = 'transparent')}
                    >
                      {l.company_name}
                    </a>
                  </td>
                  <td style={{ padding: '8px 6px' }}>
                    <span className="mono" style={{ fontSize: '9px', background: 'var(--bg-main)', padding: '2px 6px', border: '1px solid var(--border-subtle)' }}>
                      {l.source}
                    </span>
                  </td>
                  <td className="text-secondary" style={{ padding: '8px 6px', fontSize: '11px', maxWidth: '320px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {l.description}
                  </td>
                  <td className="mono" style={{ padding: '8px 6px', color: getSignalColor(l.signal_score), fontWeight: 700, fontSize: '13px' }}>
                    {l.signal_score}
                  </td>
                  <td style={{ padding: '8px 6px' }}>
                    <span className="mono" style={{
                      fontSize: '9px', padding: '2px 6px',
                      background: l.status === 'New' ? 'rgba(56,189,248,0.08)' : 'var(--bg-main)',
                      color: l.status === 'New' ? 'var(--accent-blue)' : l.status === 'Screening' ? 'var(--accent-amber)' : 'var(--text-secondary)',
                      border: '1px solid var(--border-subtle)'
                    }}>
                      {l.status}
                    </span>
                  </td>
                  <td style={{ padding: '8px 6px', textAlign: 'right' }}>
                    <div style={{ display: 'flex', gap: '6px', justifyContent: 'flex-end' }}>
                      <Link href="/outreach">
                        <button className="btn" style={{ fontSize: '9px', color: 'var(--accent-violet)', borderColor: 'rgba(129,140,248,0.3)' }}>
                          OUTREACH
                        </button>
                      </Link>
                      <button
                        className="btn"
                        style={{ fontSize: '9px', color: screeningId === l.id ? 'var(--accent-emerald)' : 'inherit', borderColor: screeningId === l.id ? 'rgba(16,185,129,0.3)' : undefined }}
                        onClick={() => handleScreen(l.id)}
                      >
                        {screeningId === l.id ? '✓ QUEUED' : 'SCREEN'}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <AddStartupModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={() => {
          refreshLeads();
        }}
      />

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}
