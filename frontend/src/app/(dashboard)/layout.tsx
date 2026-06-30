import Sidebar from "@/components/Sidebar";
import StatsBar from "@/components/StatsBar";
import CommandBar from "@/components/CommandBar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="app-layout">
      <Sidebar />
      
      <div className="center-stage">
        {/* Top Command Bar */}
        <div className="top-nav">
          <CommandBar />
          <div style={{ flex: 1 }}></div>
          <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
            <span className="mono text-muted">WORKSPACE SYNCED</span>
            <span className="mono text-muted">|</span>
            <div className="mono text-primary" style={{ display: 'flex', alignItems: 'center' }}>
              <span style={{ width: '6px', height: '6px', background: 'var(--accent-emerald)', borderRadius: '50%', marginRight: '6px' }}></span>
              ONLINE
            </div>
          </div>
        </div>

        {/* Live Stats Bar */}
        <StatsBar />

        <main style={{ flex: 1, overflowY: 'auto' }}>
          {children}
        </main>
      </div>
    </div>
  );
}

