import { useEffect, useState } from 'react';

function AnimNum({ target, duration = 1200 }) {
    const [val, setVal] = useState(0);
    useEffect(() => {
        let start = 0;
        const step = Math.max(1, Math.ceil(target / (duration / 16)));
        const t = setInterval(() => {
            start += step;
            if (start >= target) { setVal(target); clearInterval(t); }
            else setVal(start);
        }, 16);
        return () => clearInterval(t);
    }, [target, duration]);
    return <>{val.toLocaleString()}</>;
}

const KPIS = [
    {
        label: 'Total Scans',
        value: 1220,
        trend: '+12%',
        trendType: 'up',
        color: '#a855f7',
        bg: 'rgba(168, 85, 247, 0.12)',
        glow: 'rgba(168, 85, 247, 0.3)',
        icon: (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#a855f7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
            </svg>
        ),
    },
    {
        label: 'Bias Detected',
        value: 47,
        trend: '+8 this week',
        trendType: 'warn',
        color: '#fbbf24',
        bg: 'rgba(251, 191, 36, 0.12)',
        glow: 'rgba(251, 191, 36, 0.3)',
        icon: (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fbbf24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
                <line x1="12" y1="9" x2="12" y2="13" /><line x1="12" y1="17" x2="12.01" y2="17" />
            </svg>
        ),
    },
    {
        label: 'Risk Score',
        value: 72,
        suffix: '/100',
        isGauge: true,
        color: '#60a5fa',
        bg: 'rgba(96, 165, 250, 0.12)',
        glow: 'rgba(96, 165, 250, 0.3)',
        icon: (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#60a5fa" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
            </svg>
        ),
    },
    {
        label: 'Models Audited',
        value: 15,
        trend: 'All passed',
        trendType: 'up',
        color: '#4ade80',
        bg: 'rgba(74, 222, 128, 0.12)',
        glow: 'rgba(74, 222, 128, 0.3)',
        icon: (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#4ade80" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" />
            </svg>
        ),
    },
];

export default function KPICards() {
    return (
        <div className="kpi-grid">
            {KPIS.map((kpi, i) => (
                <div key={kpi.label} className="kpi-card anim-up" style={{ animationDelay: `${i * 0.08}s` }}>
                    <div className="kpi-icon" style={{ background: kpi.bg }}>
                        {kpi.icon}
                        <div style={{
                            position: 'absolute', inset: -4, borderRadius: 16,
                            background: kpi.bg, filter: 'blur(12px)', opacity: 0.5, zIndex: -1,
                        }} />
                    </div>
                    <div className="kpi-label">{kpi.label}</div>
                    <div className="kpi-value" style={{ display: 'flex', alignItems: 'baseline', gap: 4 }}>
                        <AnimNum target={kpi.value} />
                        {kpi.suffix && <span style={{ fontSize: '0.875rem', color: 'rgba(228,228,231,0.35)', fontWeight: 600 }}>{kpi.suffix}</span>}
                    </div>
                    {kpi.trend && (
                        <div className={`kpi-trend ${kpi.trendType}`}>
                            {kpi.trendType === 'up' && (
                                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                                    <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
                                </svg>
                            )}
                            {kpi.trendType === 'warn' && (
                                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                                    <line x1="12" y1="9" x2="12" y2="13" /><line x1="12" y1="17" x2="12.01" y2="17" />
                                </svg>
                            )}
                            {kpi.trend}
                        </div>
                    )}
                    {kpi.isGauge && (
                        <div style={{ marginTop: 12 }}>
                            <div className="progress-track" style={{ height: 8, borderRadius: 4 }}>
                                <div className="progress-fill anim-progress"
                                    style={{
                                        width: `${kpi.value}%`,
                                        background: `linear-gradient(90deg, ${kpi.color}, ${kpi.color}88)`,
                                        borderRadius: 4,
                                        animationDelay: '0.4s',
                                        boxShadow: `0 0 10px ${kpi.glow}`,
                                    }} />
                            </div>
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
}
