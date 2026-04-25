import { useEffect, useState } from 'react';

function AnimNum({ value, duration = 900 }) {
    const [d, setD] = useState(0);
    useEffect(() => {
        let s = 0; const e = parseInt(value);
        const step = Math.max(1, Math.ceil(e / (duration / 16)));
        const t = setInterval(() => { s += step; if (s >= e) { setD(e); clearInterval(t); } else setD(s); }, 16);
        return () => clearInterval(t);
    }, [value, duration]);
    return <>{d}</>;
}

export default function BiasScoreMeter({ biasData }) {
    if (!biasData) return null;
    const { biasScore, label, severity, isCertified } = biasData;

    const p = {
        fair: { c: '#4ade80', cls: 'tag-green', glow: 'rgba(74,222,128,0.3)' },
        slight: { c: '#fbbf24', cls: 'tag-yellow', glow: 'rgba(251,191,36,0.3)' },
        high: { c: '#f87171', cls: 'tag-red', glow: 'rgba(248,113,113,0.3)' },
    }[severity];

    const r = 42, c = 2 * Math.PI * r;

    return (
        <div className="card card-highlight p-6 anim-up" style={{ animationDelay: '0.16s' }}>
            <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center"
                        style={{ background: `${p.c}18` }}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={p.c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                        </svg>
                    </div>
                    <h2 className="heading text-sm font-bold">Bias Score</h2>
                </div>
                <span className={`tag ${p.cls}`}>{label}</span>
            </div>

            <div className="flex flex-col items-center py-2">
                {/* Main gauge */}
                <div className="relative w-36 h-36 mb-4">
                    <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                        <circle cx="50" cy="50" r={r} fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="6" />
                        <circle cx="50" cy="50" r={r} fill="none" stroke={p.c} strokeWidth="6" strokeLinecap="round"
                            strokeDasharray={c} strokeDashoffset={c * (1 - biasScore / 100)}
                            className="anim-gauge"
                            style={{ filter: `drop-shadow(0 0 6px ${p.glow})` }} />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <span style={{ fontSize: '1.875rem', fontWeight: 900, color: p.c, fontVariantNumeric: 'tabular-nums', textShadow: `0 0 20px ${p.glow}` }}>
                            <AnimNum value={biasScore} />
                        </span>
                        <span style={{ fontSize: '0.5625rem', color: 'rgba(228,228,231,0.3)' }}>/100</span>
                    </div>
                </div>

                {/* Metrics */}
                <div className="w-full grid grid-cols-3 gap-2 mt-2">
                    {[
                        { v: biasScore, l: 'Score', color: p.c },
                        { v: biasData.explanations.length, l: 'Findings', color: 'rgba(228,228,231,0.7)' },
                        { v: isCertified ? '✓' : '✗', l: 'Certified', color: isCertified ? '#4ade80' : '#f87171' },
                    ].map(({ v, l, color }) => (
                        <div key={l} className="stat">
                            <p style={{ fontSize: '1rem', fontWeight: 900, color, fontVariantNumeric: 'tabular-nums' }}>{v}</p>
                            <p style={{ fontSize: '0.5rem', color: 'rgba(228,228,231,0.25)', marginTop: 2, textTransform: 'uppercase', letterSpacing: '0.1em' }}>{l}</p>
                        </div>
                    ))}
                </div>

                {/* Certification */}
                {isCertified && (
                    <div className="mt-4 w-full p-3.5 rounded-xl flex items-center gap-3 anim-slide"
                        style={{ animationDelay: '0.8s', background: 'rgba(74,222,128,0.06)', border: '1px solid rgba(74,222,128,0.1)' }}>
                        <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                            style={{ background: 'rgba(74,222,128,0.1)' }}>
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#4ade80" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                                <polyline points="9 12 11.5 14.5 16 9.5" />
                            </svg>
                        </div>
                        <div>
                            <p style={{ fontSize: '0.75rem', fontWeight: 700, color: '#4ade80' }}>Fairness Certified</p>
                            <p style={{ fontSize: '0.5625rem', color: 'rgba(228,228,231,0.35)' }}>Score within (&lt;25) threshold</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
