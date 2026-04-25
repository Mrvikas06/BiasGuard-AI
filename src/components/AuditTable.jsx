const AUDITS = [
    { model: 'GPT-4 Hiring Model', date: 'Apr 25, 2026', score: 72, risk: 'high', status: 'active' },
    { model: 'LLM Sentiment Analyzer', date: 'Apr 24, 2026', score: 38, risk: 'medium', status: 'completed' },
    { model: 'Recommendation Engine v3', date: 'Apr 23, 2026', score: 15, risk: 'low', status: 'completed' },
    { model: 'Fraud Detection System', date: 'Apr 22, 2026', score: 56, risk: 'high', status: 'pending' },
    { model: 'Customer Churn Predictor', date: 'Apr 21, 2026', score: 22, risk: 'low', status: 'completed' },
    { model: 'Credit Scoring Model', date: 'Apr 20, 2026', score: 45, risk: 'medium', status: 'active' },
];

export default function AuditTable() {
    return (
        <div className="dash-card anim-up" style={{ animationDelay: '0.35s' }}>
            <div className="dash-card-header">
                <div>
                    <div className="dash-card-title">Recent Audit History</div>
                    <div className="dash-card-subtitle">Last 30 days · {AUDITS.length} audits completed</div>
                </div>
                <button className="btn-ghost" style={{ padding: '6px 14px' }}>
                    <span style={{ fontSize: '0.6875rem' }}>Export ↗</span>
                </button>
            </div>
            <div style={{ borderRadius: 14, overflow: 'hidden' }}>
                <table className="audit-table">
                    <thead>
                        <tr>
                            <th>Model Name</th>
                            <th>Scan Date</th>
                            <th>Bias Score</th>
                            <th>Risk Level</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {AUDITS.map((row, i) => (
                            <tr key={i} className="anim-slide" style={{ animationDelay: `${0.45 + i * 0.06}s` }}>
                                <td>
                                    <span style={{ fontWeight: 600, color: '#f4f4f5' }}>{row.model}</span>
                                </td>
                                <td style={{ color: 'rgba(228,228,231,0.4)' }}>{row.date}</td>
                                <td>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                        <span style={{ fontWeight: 800, fontVariantNumeric: 'tabular-nums', color: '#e4e4e7' }}>{row.score}</span>
                                        <div style={{ width: 52, height: 5, borderRadius: 3, background: 'rgba(255,255,255,0.06)', overflow: 'hidden' }}>
                                            <div className="anim-progress" style={{
                                                width: `${row.score}%`,
                                                height: '100%',
                                                borderRadius: 3,
                                                background: row.risk === 'high' ? 'linear-gradient(90deg, #ef4444, #f87171)' : row.risk === 'medium' ? 'linear-gradient(90deg, #f59e0b, #fbbf24)' : 'linear-gradient(90deg, #22c55e, #4ade80)',
                                                animationDelay: `${0.55 + i * 0.06}s`,
                                                boxShadow: row.risk === 'high' ? '0 0 8px rgba(239,68,68,0.3)' : row.risk === 'medium' ? '0 0 8px rgba(245,158,11,0.3)' : '0 0 8px rgba(34,197,94,0.3)',
                                            }} />
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <span className={`risk-badge ${row.risk}`}>
                                        {row.risk === 'high' ? '🔴' : row.risk === 'medium' ? '🟡' : '🟢'} {row.risk.charAt(0).toUpperCase() + row.risk.slice(1)}
                                    </span>
                                </td>
                                <td>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                                        <span className={`status-dot ${row.status}`} />
                                        <span style={{ fontSize: '0.75rem', color: 'rgba(228,228,231,0.5)', textTransform: 'capitalize' }}>{row.status}</span>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
