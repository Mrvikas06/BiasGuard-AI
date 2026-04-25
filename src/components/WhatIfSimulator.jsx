import { useState } from 'react';
import { runWhatIf } from '../utils/biasEngine';

export default function WhatIfSimulator({ applicant }) {
    const [results, setResults] = useState(null);
    const [open, setOpen] = useState(false);

    if (!applicant) return null;

    const run = () => { setResults(runWhatIf(applicant)); setOpen(true); };

    const maxScore = results ? Math.max(...results.map(r => r.score)) : 0;
    const minScore = results ? Math.min(...results.map(r => r.score)) : 0;
    const swing = maxScore - minScore;
    const flips = results ? results.filter(r => r.decision !== results.find(x => x.isOriginal)?.decision).length : 0;

    return (
        <div className="card p-6 anim-up" style={{ animationDelay: '0.3s' }}>
            <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center"
                        style={{ background: 'rgba(96,165,250,0.1)' }}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#60a5fa" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" /><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
                        </svg>
                    </div>
                    <div>
                        <h2 className="heading text-sm font-bold">What-If Simulator</h2>
                        <p style={{ fontSize: '0.6875rem', color: 'rgba(228,228,231,0.3)' }}>Counterfactual fairness test</p>
                    </div>
                </div>
                <button onClick={run} className="btn-primary px-5 py-2.5 text-[0.75rem] flex items-center gap-2">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <polygon points="5 3 19 12 5 21 5 3" />
                    </svg>
                    Simulate
                </button>
            </div>

            {open && results && (
                <div className="anim-in">
                    {/* Summary */}
                    <div className="grid grid-cols-3 gap-2.5 mb-4">
                        <div className="stat">
                            <p style={{ fontSize: '1.125rem', fontWeight: 900, color: '#f4f4f5', fontVariantNumeric: 'tabular-nums' }}>{swing}</p>
                            <p style={{ fontSize: '0.5rem', color: 'rgba(228,228,231,0.25)', textTransform: 'uppercase', letterSpacing: '0.1em', marginTop: 2 }}>Point Swing</p>
                        </div>
                        <div className="stat">
                            <p style={{ fontSize: '1.125rem', fontWeight: 900, color: '#f4f4f5', fontVariantNumeric: 'tabular-nums' }}>{results.length}</p>
                            <p style={{ fontSize: '0.5rem', color: 'rgba(228,228,231,0.25)', textTransform: 'uppercase', letterSpacing: '0.1em', marginTop: 2 }}>Scenarios</p>
                        </div>
                        <div className="stat">
                            <p style={{ fontSize: '1.125rem', fontWeight: 900, fontVariantNumeric: 'tabular-nums', color: flips > 0 ? '#f87171' : '#4ade80' }}>{flips}</p>
                            <p style={{ fontSize: '0.5rem', color: 'rgba(228,228,231,0.25)', textTransform: 'uppercase', letterSpacing: '0.1em', marginTop: 2 }}>Decision Flips</p>
                        </div>
                    </div>

                    {/* Table */}
                    <div className="rounded-xl overflow-hidden" style={{ border: '1px solid rgba(255,255,255,0.04)' }}>
                        <table className="sim-table">
                            <thead>
                                <tr>
                                    <th>Gender</th>
                                    <th>Location</th>
                                    <th className="text-center">Score</th>
                                    <th className="text-center">Outcome</th>
                                    <th className="text-right">Delta</th>
                                </tr>
                            </thead>
                            <tbody>
                                {results.map((r, i) => (
                                    <tr key={i} className={r.isOriginal ? 'current' : ''}>
                                        <td>
                                            <div className="flex items-center gap-2">
                                                <span style={{ color: '#f4f4f5', fontWeight: 500 }}>{r.gender}</span>
                                                {r.isOriginal && (
                                                    <span className="tag tag-purple text-[0.5rem] py-0 px-1.5">YOU</span>
                                                )}
                                            </div>
                                        </td>
                                        <td>{r.location}</td>
                                        <td className="text-center">
                                            <div className="flex items-center justify-center gap-2">
                                                <span style={{ fontWeight: 800, color: '#e4e4e7', fontVariantNumeric: 'tabular-nums' }}>{r.score}</span>
                                                <div className="w-12 h-1.5 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.06)' }}>
                                                    <div className="h-full rounded-full anim-progress" style={{
                                                        width: `${r.score}%`,
                                                        background: r.decision === 'Approved' ? 'linear-gradient(90deg, #22c55e, #4ade80)' : 'linear-gradient(90deg, #ef4444, #f87171)',
                                                        animationDelay: `${0.4 + i * 0.05}s`,
                                                        boxShadow: r.decision === 'Approved' ? '0 0 6px rgba(74,222,128,0.3)' : '0 0 6px rgba(248,113,113,0.3)',
                                                    }} />
                                                </div>
                                            </div>
                                        </td>
                                        <td className="text-center">
                                            <span className={`tag text-[0.625rem] ${r.decision === 'Approved' ? 'tag-green' : 'tag-red'}`}>{r.decision}</span>
                                        </td>
                                        <td className="text-right">
                                            {r.scoreDiff === 0 ? (
                                                <span style={{ color: 'rgba(228,228,231,0.2)' }}>—</span>
                                            ) : (
                                                <span style={{ fontWeight: 800, fontVariantNumeric: 'tabular-nums', color: r.scoreDiff > 0 ? '#4ade80' : '#f87171' }}>
                                                    {r.scoreDiff > 0 ? '+' : ''}{r.scoreDiff}
                                                </span>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Finding */}
                    <div className="alert alert-yellow mt-4">
                        <div className="flex items-start gap-3">
                            <span className="text-base">⚠️</span>
                            <div>
                                <p style={{ fontSize: '0.8125rem', color: '#e4e4e7', lineHeight: 1.6 }}>
                                    <span className="font-bold">Key Finding:</span> Sensitive attributes cause a <span style={{ fontWeight: 800, color: '#fbbf24', fontVariantNumeric: 'tabular-nums' }}>{swing}-point</span> swing
                                    across {results.length} combinations, with <span style={{ fontWeight: 800, fontVariantNumeric: 'tabular-nums', color: flips > 0 ? '#f87171' : '#4ade80' }}>{flips} flip{flips !== 1 ? 's' : ''}</span>.
                                    {flips > 0 && ' This indicates systemic disparate impact.'}
                                </p>
                                <p style={{ fontSize: '0.5625rem', color: 'rgba(228,228,231,0.25)', marginTop: 8 }}>Recommendation: Retrain with demographic parity constraints.</p>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
