import { useEffect, useState } from 'react';

function AnimatedNumber({ value, duration = 800 }) {
    const [display, setDisplay] = useState(0);
    useEffect(() => {
        let start = 0;
        const end = parseInt(value);
        if (start === end) { setDisplay(end); return; }
        const step = Math.ceil(end / (duration / 16));
        const timer = setInterval(() => {
            start += step;
            if (start >= end) { setDisplay(end); clearInterval(timer); }
            else setDisplay(start);
        }, 16);
        return () => clearInterval(timer);
    }, [value, duration]);
    return <>{display}</>;
}

export default function DecisionCard({ result }) {
    if (!result) return null;
    const approved = result.decision === 'Approved';
    const { breakdown, totalScore, baseScore } = result;

    const items = [
        { key: 'education', label: 'Education', max: 25 },
        { key: 'experience', label: 'Experience', max: 40 },
        { key: 'locationBias', label: 'Location Bias', max: 15, bias: true },
        { key: 'genderBias', label: 'Gender Bias', max: 10, bias: true },
    ];

    const ringColor = approved ? '#4ade80' : '#f87171';
    const glowColor = approved ? 'rgba(74,222,128,0.25)' : 'rgba(248,113,113,0.25)';

    return (
        <div className="card card-highlight p-6 anim-up" style={{ animationDelay: '0.1s' }}>
            {/* Header */}
            <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center"
                        style={{ background: approved ? 'rgba(74,222,128,0.1)' : 'rgba(248,113,113,0.1)' }}>
                        {approved ? (
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#4ade80" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                        ) : (
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#f87171" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
                        )}
                    </div>
                    <h2 className="heading text-sm font-bold">Decision</h2>
                </div>
                <span className={`tag ${approved ? 'tag-green' : 'tag-red'}`}>{result.decision}</span>
            </div>

            {/* Score ring */}
            <div className="flex items-center gap-5 mb-5 p-4 rounded-xl" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.04)' }}>
                <div className="relative w-16 h-16 shrink-0">
                    <svg className="w-full h-full -rotate-90" viewBox="0 0 60 60">
                        <circle cx="30" cy="30" r="24" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="4" />
                        <circle cx="30" cy="30" r="24" fill="none"
                            stroke={ringColor} strokeWidth="4" strokeLinecap="round"
                            strokeDasharray={151} strokeDashoffset={151 * (1 - totalScore / 100)}
                            className="anim-gauge"
                            style={{ filter: `drop-shadow(0 0 4px ${glowColor})` }} />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                        <span style={{ fontSize: '1.125rem', fontWeight: 900, color: '#f4f4f5', fontVariantNumeric: 'tabular-nums' }}><AnimatedNumber value={totalScore} /></span>
                    </div>
                </div>
                <div className="flex-1">
                    <p style={{ fontSize: '0.75rem', color: 'rgba(228,228,231,0.5)', marginBottom: 4 }}>Composite Score</p>
                    <p style={{ fontSize: '0.6875rem', color: 'rgba(228,228,231,0.35)' }}>
                        Base <span style={{ fontWeight: 800, color: '#e4e4e7', fontVariantNumeric: 'tabular-nums' }}>{baseScore}</span> + Bias <span style={{ fontWeight: 800, color: '#fbbf24', fontVariantNumeric: 'tabular-nums' }}>+{totalScore - baseScore}</span>
                    </p>
                </div>
            </div>

            {/* Progress breakdown */}
            <div className="space-y-3.5">
                {items.map(({ key, label, max, bias }) => {
                    const pts = breakdown[key]?.points ?? 0;
                    const pct = Math.min((pts / max) * 100, 100);
                    return (
                        <div key={key}>
                            <div className="flex items-center justify-between mb-1.5">
                                <span style={{ fontSize: '0.6875rem', color: 'rgba(228,228,231,0.45)' }}>{label}</span>
                                <span style={{ fontSize: '0.6875rem', fontWeight: 800, fontVariantNumeric: 'tabular-nums', color: bias && pts > 0 ? '#fbbf24' : 'rgba(228,228,231,0.5)' }}>+{pts}</span>
                            </div>
                            <div className="progress-track">
                                <div className="progress-fill anim-progress" style={{
                                    width: `${pct}%`,
                                    background: bias && pts > 0 ? 'linear-gradient(90deg, #f59e0b, #fbbf24)' : 'linear-gradient(90deg, #7c3aed, #a855f7)',
                                    animationDelay: '0.3s',
                                    boxShadow: bias && pts > 0 ? '0 0 8px rgba(245,158,11,0.3)' : '0 0 8px rgba(124,58,237,0.3)',
                                }} />
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
