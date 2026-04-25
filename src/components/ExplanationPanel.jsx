const IMPACT = {
    high: { cls: 'alert-red', color: '#f87171', label: 'HIGH', icon: '🔴' },
    medium: { cls: 'alert-yellow', color: '#fbbf24', label: 'MEDIUM', icon: '🟡' },
    low: { cls: 'alert-green', color: '#4ade80', label: 'LOW', icon: '🟢' },
};

export default function ExplanationPanel({ biasData }) {
    if (!biasData || !biasData.explanations.length) return null;

    return (
        <div className="card p-6 anim-up" style={{ animationDelay: '0.22s' }}>
            <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center"
                        style={{ background: 'rgba(251,191,36,0.1)' }}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fbbf24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
                            <line x1="12" y1="9" x2="12" y2="13" /><line x1="12" y1="17" x2="12.01" y2="17" />
                        </svg>
                    </div>
                    <h2 className="heading text-sm font-bold">Explainability Report</h2>
                </div>
                <span style={{ fontSize: '0.5625rem', color: 'rgba(228,228,231,0.25)', fontVariantNumeric: 'tabular-nums' }}>{biasData.explanations.length} issue{biasData.explanations.length !== 1 ? 's' : ''}</span>
            </div>

            <div className="space-y-2.5">
                {biasData.explanations.map((exp, i) => {
                    const im = IMPACT[exp.impact] || IMPACT.low;
                    return (
                        <div key={i} className={`alert ${im.cls} anim-slide`} style={{ animationDelay: `${0.3 + i * 0.08}s` }}>
                            <div className="flex items-start gap-3">
                                <span className="text-sm mt-0.5">{im.icon}</span>
                                <div className="flex-1">
                                    <p style={{ fontSize: '0.8125rem', color: '#e4e4e7', lineHeight: 1.6 }}>{exp.text}</p>
                                    <div className="flex items-center gap-3 mt-2">
                                        <span style={{ fontSize: '0.5rem', fontWeight: 700, color: 'rgba(228,228,231,0.3)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>ATTR: {exp.type}</span>
                                        <span style={{ fontSize: '0.5rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em', color: im.color }}>
                                            {im.label} IMPACT
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
