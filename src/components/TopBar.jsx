export default function TopBar() {
    return (
        <header className="topbar">
            <div>
                <h1 className="topbar-title">BiasGuard Dashboard</h1>
                <div className="topbar-subtitle">
                    <span className="live-dot" />
                    <span>Last scanned: 2 mins ago</span>
                    <span style={{ color: '#4ade80', fontWeight: 700 }}>· Live</span>
                </div>
            </div>

            <div className="topbar-search">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="rgba(228,228,231,0.25)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
                <input type="text" placeholder="Search models, audits, reports..." />
            </div>

            <div className="topbar-actions">
                {/* Notification with badge */}
                <div style={{ position: 'relative' }}>
                    <button className="topbar-btn" title="Notifications">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" /><path d="M13.73 21a2 2 0 0 1-3.46 0" />
                        </svg>
                    </button>
                    <span style={{
                        position: 'absolute', top: 4, right: 4, width: 8, height: 8, borderRadius: '50%',
                        background: '#f87171', boxShadow: '0 0 8px rgba(248,113,113,0.5)', border: '2px solid #0f0f1a'
                    }} />
                </div>
                <button className="topbar-btn" title="Settings">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9c.26.604.852.997 1.51 1H21a2 2 0 0 1 0 4h-.09c-.658.003-1.25.396-1.51 1z" />
                    </svg>
                </button>
                <div style={{
                    width: 38, height: 38, borderRadius: 12,
                    background: 'linear-gradient(135deg, #7c3aed, #a855f7)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: '#fff', fontSize: '0.7rem', fontWeight: 800, cursor: 'pointer',
                    boxShadow: '0 2px 12px rgba(124,58,237,0.3)',
                    letterSpacing: '0.02em',
                }}>
                    VK
                </div>
            </div>
        </header>
    );
}
