const BIAS_DATA = [
    { type: 'Gender', value: 68, color: 'gender' },
    { type: 'Race', value: 45, color: 'race' },
    { type: 'Age', value: 32, color: 'age' },
    { type: 'Disability', value: 18, color: 'disability' },
];

const TREND_POINTS = [32, 28, 45, 38, 52, 47, 55, 60, 48, 65, 58, 72];
const QUICK_STATS = [
    { label: 'Avg Score', value: '40.8', sub: 'across vectors', color: '#a855f7' },
    { label: 'Worst', value: 'Gender', sub: '68% bias rate', color: '#f87171' },
    { label: 'Best', value: 'Disability', sub: '18% bias rate', color: '#4ade80' },
    { label: 'Trend', value: '+12%', sub: 'vs last month', color: '#fbbf24' },
];

function Sparkline() {
    const w = 100, h = 36, max = Math.max(...TREND_POINTS), min = Math.min(...TREND_POINTS);
    const pts = TREND_POINTS.map((v, i) => {
        const x = (i / (TREND_POINTS.length - 1)) * w;
        const y = h - ((v - min) / (max - min)) * (h - 4) - 2;
        return `${x},${y}`;
    });
    const line = pts.join(' ');
    const area = `0,${h} ${line} ${w},${h}`;

    return (
        <svg width="100%" height={h} viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none">
            <defs>
                <linearGradient id="sparkGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#a855f7" stopOpacity="0.3" />
                    <stop offset="100%" stopColor="#a855f7" stopOpacity="0" />
                </linearGradient>
                <linearGradient id="lineGrad" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#7c3aed" />
                    <stop offset="100%" stopColor="#c084fc" />
                </linearGradient>
            </defs>
            <polygon points={area} fill="url(#sparkGrad)" />
            <polyline points={line} fill="none" stroke="url(#lineGrad)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                style={{ filter: 'drop-shadow(0 0 4px rgba(168,85,247,0.4))' }} />
            {/* End dot */}
            <circle cx={w} cy={parseFloat(pts[pts.length - 1].split(',')[1])} r="3" fill="#c084fc"
                style={{ filter: 'drop-shadow(0 0 6px rgba(192,132,252,0.6))' }} />
        </svg>
    );
}

export default function BiasChart() {
    return (
        <div className="dash-card anim-up" style={{ animationDelay: '0.25s', height: '100%', display: 'flex', flexDirection: 'column' }}>
            <div className="dash-card-header">
                <div>
                    <div className="dash-card-title">Bias Analysis Overview</div>
                    <div className="dash-card-subtitle">Distribution across 4 demographic vectors</div>
                </div>
                <button className="btn-ghost" style={{ padding: '6px 14px' }}>
                    <span style={{ fontSize: '0.6875rem' }}>View Details →</span>
                </button>
            </div>

            {/* Bar chart */}
            <div className="bias-chart">
                {BIAS_DATA.map((item, i) => (
                    <div key={item.type} className="chart-bar-row anim-slide" style={{ animationDelay: `${0.35 + i * 0.1}s` }}>
                        <span className="chart-label">{item.type}</span>
                        <div className="chart-bar-track">
                            <div
                                className={`chart-bar-fill ${item.color} anim-progress`}
                                style={{ width: `${item.value}%`, animationDelay: `${0.45 + i * 0.12}s` }}
                            >
                                {item.value}%
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Legend */}
            <div style={{ display: 'flex', gap: 24, marginTop: 18, paddingTop: 16, borderTop: '1px solid rgba(255,255,255,0.04)' }}>
                {[
                    { label: 'High Risk (>50)', c: '#f87171' },
                    { label: 'Medium (25-50)', c: '#fbbf24' },
                    { label: 'Low (<25)', c: '#4ade80' },
                ].map(({ label, c }) => (
                    <span key={label} style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.6875rem', color: 'rgba(228,228,231,0.35)' }}>
                        <span style={{ width: 8, height: 8, borderRadius: 2, background: c, boxShadow: `0 0 8px ${c}40` }} />
                        {label}
                    </span>
                ))}
            </div>

            {/* ═══ TREND SECTION — fills the gap ═══ */}
            <div style={{ marginTop: 'auto', paddingTop: 20, borderTop: '1px solid rgba(255,255,255,0.04)', marginBlockStart: 20 }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
                    <div>
                        <div style={{ fontSize: '0.8125rem', fontWeight: 700, color: '#f4f4f5' }}>Bias Trend</div>
                        <div style={{ fontSize: '0.625rem', color: 'rgba(228,228,231,0.3)' }}>Last 12 months · Overall score</div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: 4 }}>
                        <span style={{ fontSize: '1.25rem', fontWeight: 900, color: '#f4f4f5', fontVariantNumeric: 'tabular-nums' }}>72</span>
                        <span style={{ fontSize: '0.625rem', color: '#f87171', fontWeight: 700 }}>↑ 12%</span>
                    </div>
                </div>
                <div className="anim-in" style={{ animationDelay: '0.6s' }}>
                    <Sparkline />
                </div>

                {/* Quick Stats Row */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 10, marginTop: 16 }}>
                    {QUICK_STATS.map((s, i) => (
                        <div key={s.label} className="anim-up" style={{
                            animationDelay: `${0.65 + i * 0.06}s`,
                            background: 'rgba(255,255,255,0.02)',
                            border: '1px solid rgba(255,255,255,0.04)',
                            borderRadius: 10,
                            padding: '12px 10px',
                            textAlign: 'center',
                            transition: 'all 0.25s ease',
                        }}>
                            <div style={{ fontSize: '0.5rem', fontWeight: 800, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(228,228,231,0.25)', marginBottom: 6 }}>
                                {s.label}
                            </div>
                            <div style={{ fontSize: '0.9375rem', fontWeight: 900, color: s.color, fontVariantNumeric: 'tabular-nums' }}>
                                {s.value}
                            </div>
                            <div style={{ fontSize: '0.5625rem', color: 'rgba(228,228,231,0.2)', marginTop: 3 }}>
                                {s.sub}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
