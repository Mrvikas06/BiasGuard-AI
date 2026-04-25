const ALERTS = [
    {
        type: 'dark',
        title: 'Algorithm bias detected',
        meta: 'GPT-4 Hiring Model · 3 min ago',
        badge: 'critical',
        badgeText: 'Critical',
        emoji: '😔',
    },
    {
        type: 'light',
        title: 'Privacy bias risk',
        meta: 'LLM Sentiment Analyzer · 12 min ago',
        badge: 'documented',
        badgeText: 'Documented',
        emoji: '🔒',
    },
    {
        type: 'dark',
        title: 'Inconsistent user experience',
        meta: 'Recommendation Engine · 28 min ago',
        badge: 'warning',
        badgeText: 'Warning',
        emoji: '⊞',
    },
    {
        type: 'accent',
        title: 'Algorithm bias in user design',
        meta: 'A/B Test Model · 1 hr ago',
        badge: 'new',
        badgeText: 'New',
        emoji: '⚡',
    },
];

export default function AlertsPanel() {
    return (
        <div className="dash-card anim-up" style={{ animationDelay: '0.3s' }}>
            <div className="dash-card-header">
                <div>
                    <div className="dash-card-title">Active Alerts</div>
                    <div className="dash-card-subtitle">{ALERTS.length} issues require attention</div>
                </div>
                <span className="tag tag-red" style={{ fontSize: '0.5625rem' }}>{ALERTS.length} Active</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
                {ALERTS.map((a, i) => (
                    <div key={i} className={`alert-card ${a.type} anim-slide`} style={{ animationDelay: `${0.35 + i * 0.08}s` }}>
                        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
                            <span style={{ fontSize: '1.2rem', lineHeight: 1, filter: 'saturate(0.8)' }}>{a.emoji}</span>
                            <div style={{ flex: 1 }}>
                                <div className="alert-title">{a.title}</div>
                                <div className="alert-meta">
                                    <span>{a.meta}</span>
                                    <span className={`alert-badge ${a.badge}`}>{a.badgeText}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Donut Chart */}
            <div style={{ marginTop: 20, padding: '16px 0 0', borderTop: '1px solid rgba(255,255,255,0.04)' }}>
                <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#f4f4f5', marginBottom: 14 }}>Bias Distribution</div>
                <div className="donut-container">
                    <svg width="110" height="110" viewBox="0 0 36 36">
                        <circle cx="18" cy="18" r="15.5" fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="3" />
                        <circle cx="18" cy="18" r="15.5" fill="none" stroke="#4ade80" strokeWidth="3.5"
                            strokeDasharray="40 60" strokeDashoffset="25" strokeLinecap="round"
                            className="anim-gauge" style={{ animationDelay: '0.5s', filter: 'drop-shadow(0 0 3px rgba(74,222,128,0.4))' }} />
                        <circle cx="18" cy="18" r="15.5" fill="none" stroke="#fbbf24" strokeWidth="3.5"
                            strokeDasharray="25 75" strokeDashoffset="85" strokeLinecap="round"
                            className="anim-gauge" style={{ animationDelay: '0.6s', filter: 'drop-shadow(0 0 3px rgba(251,191,36,0.4))' }} />
                        <circle cx="18" cy="18" r="15.5" fill="none" stroke="#f87171" strokeWidth="3.5"
                            strokeDasharray="15 85" strokeDashoffset="60" strokeLinecap="round"
                            className="anim-gauge" style={{ animationDelay: '0.7s', filter: 'drop-shadow(0 0 3px rgba(248,113,113,0.4))' }} />
                    </svg>
                    <div className="donut-legend">
                        {[
                            { label: 'Fair (< 25)', pct: '40%', c: '#4ade80' },
                            { label: 'Slight (25-50)', pct: '35%', c: '#fbbf24' },
                            { label: 'High (> 50)', pct: '25%', c: '#f87171' },
                        ].map(({ label, pct, c }) => (
                            <div key={label} className="donut-legend-item">
                                <div className="donut-legend-dot" style={{ background: c, boxShadow: `0 0 6px ${c}40` }} />
                                <span>{label}</span>
                                <span className="donut-legend-value">{pct}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
