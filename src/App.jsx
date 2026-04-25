import { useState, useCallback } from 'react';
import Sidebar from './components/Sidebar';
import TopBar from './components/TopBar';
import KPICards from './components/KPICards';
import BiasChart from './components/BiasChart';
import AlertsPanel from './components/AlertsPanel';
import AuditTable from './components/AuditTable';
import InputForm from './components/InputForm';
import DecisionCard from './components/DecisionCard';
import BiasScoreMeter from './components/BiasScoreMeter';
import ExplanationPanel from './components/ExplanationPanel';
import WhatIfSimulator from './components/WhatIfSimulator';
import GeminiInsights from './components/GeminiInsights';
import { simulateDecision, detectBias } from './utils/biasEngine';
import { analyzeWithGemini } from './utils/gemini';

export default function App() {
  const [applicant, setApplicant] = useState(null);
  const [result, setResult] = useState(null);
  const [biasData, setBiasData] = useState(null);
  const [geminiAnalysis, setGeminiAnalysis] = useState(null);
  const [geminiLoading, setGeminiLoading] = useState(false);

  const handleSubmit = useCallback(async (formData) => {
    setApplicant(formData);
    const simResult = simulateDecision(formData);
    const biasResult = detectBias(formData);
    setResult(simResult);
    setBiasData(biasResult);
    setGeminiAnalysis(null);
    setGeminiLoading(true);
    try {
      const analysis = await analyzeWithGemini(formData, simResult, biasResult);
      setGeminiAnalysis(analysis);
    } catch (e) {
      setGeminiAnalysis({ success: false, text: 'Failed to connect to Gemini AI.' });
    } finally {
      setGeminiLoading(false);
    }
  }, []);

  return (
    <div className="dashboard-layout">
      <Sidebar />

      <div className="dashboard-main">
        <TopBar />

        <div className="dashboard-content">
          {/* KPIs */}
          <KPICards />

          {/* Chart + Alerts */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-5">
            <div className="lg:col-span-2">
              <BiasChart />
            </div>
            <div className="lg:col-span-1">
              <AlertsPanel />
            </div>
          </div>

          {/* Audit Table */}
          <AuditTable />

          {/* ═══════ BIAS AUDIT TOOL ═══════ */}
          <div style={{ marginTop: 28, paddingTop: 28, borderTop: '1px solid rgba(255,255,255,0.04)' }}>
            <div className="section-title anim-up" style={{ animationDelay: '0.4s' }}>
              <div className="icon" style={{ background: 'rgba(168, 85, 247, 0.1)' }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#a855f7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
              </div>
              Run Bias Audit
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
              {/* Left: Form */}
              <div className="lg:col-span-4 xl:col-span-3">
                <InputForm onSubmit={handleSubmit} />

                {result && (
                  <div className="card p-5 anim-up mt-4" style={{ animationDelay: '0.12s' }}>
                    <div className="flex items-center justify-between mb-3">
                      <span className="label">Score Breakdown</span>
                      <span style={{ fontSize: '0.5rem', color: 'rgba(228,228,231,0.25)', fontVariantNumeric: 'tabular-nums' }}>audit #{Math.floor(Math.random() * 9000) + 1000}</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2.5">
                      {[
                        { v: result.totalScore, l: 'Total', c: '#f4f4f5' },
                        { v: result.baseScore, l: 'Base', c: 'rgba(228,228,231,0.6)' },
                        { v: `+${result.locationBias}`, l: 'Loc. Bias', c: result.locationBias > 0 ? '#fbbf24' : '#4ade80' },
                        { v: `+${result.genderBias}`, l: 'Gen. Bias', c: result.genderBias > 0 ? '#fbbf24' : '#4ade80' },
                      ].map(({ v, l, c }) => (
                        <div key={l} className="stat anim-in" style={{ animationDelay: '0.2s' }}>
                          <p style={{ fontSize: '1.25rem', fontWeight: 900, color: c, fontVariantNumeric: 'tabular-nums' }}>{v}</p>
                          <p style={{ fontSize: '0.5rem', color: 'rgba(228,228,231,0.25)', marginTop: 4, textTransform: 'uppercase', letterSpacing: '0.1em' }}>{l}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Right: Results */}
              <div className="lg:col-span-8 xl:col-span-9">
                {!result && (
                  <div className="card p-12 text-center anim-in relative overflow-hidden" style={{ minHeight: '40vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    {/* Ambient glow */}
                    <div style={{
                      position: 'absolute', top: '20%', left: '50%', transform: 'translateX(-50%)',
                      width: 300, height: 300, borderRadius: '50%',
                      background: 'radial-gradient(circle, rgba(124,58,237,0.06), transparent 70%)',
                      pointerEvents: 'none'
                    }} />

                    {/* Shield watermark */}
                    <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', pointerEvents: 'none', opacity: 0.03 }}>
                      <svg width="200" height="200" viewBox="0 0 24 24" fill="none" stroke="#a855f7" strokeWidth="0.3">
                        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                      </svg>
                    </div>

                    <div style={{ position: 'relative', zIndex: 1 }}>
                      <div style={{
                        width: 56, height: 56, margin: '0 auto 20px', borderRadius: 16,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        background: 'rgba(168,85,247,0.1)',
                        boxShadow: '0 0 30px rgba(168,85,247,0.15)',
                      }}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#a855f7" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                        </svg>
                      </div>
                      <h3 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#f4f4f5', marginBottom: 8, letterSpacing: '-0.02em' }}>Ready to Audit</h3>
                      <p style={{ fontSize: '0.875rem', color: 'rgba(228,228,231,0.4)', maxWidth: 420, margin: '0 auto 24px', lineHeight: 1.6 }}>
                        Submit an applicant profile to run a complete bias analysis across 6 demographic vectors.
                      </p>

                      {/* Feature pills */}
                      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 8, marginBottom: 24 }}>
                        {['Gender Analysis', 'Location Parity', 'Score Decomposition', 'What-If Testing', 'Impact Scoring', 'Fairness Certification'].map((f) => (
                          <span key={f} style={{
                            fontSize: '0.6875rem', color: 'rgba(228,228,231,0.5)', padding: '6px 14px', borderRadius: 8,
                            background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.04)',
                          }}>
                            {f}
                          </span>
                        ))}
                      </div>

                      {/* Status legend */}
                      <div style={{ display: 'flex', justifyContent: 'center', gap: 28 }}>
                        {[
                          { c: '#4ade80', l: 'Fair (0-25)' },
                          { c: '#fbbf24', l: 'Slight (26-50)' },
                          { c: '#f87171', l: 'High (51+)' },
                        ].map(({ c, l }) => (
                          <span key={l} style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.6875rem', color: 'rgba(228,228,231,0.35)' }}>
                            <span style={{ width: 8, height: 8, borderRadius: '50%', background: c, boxShadow: `0 0 8px ${c}40` }} />
                            {l}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {result && (
                  <>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <DecisionCard result={result} />
                      <BiasScoreMeter biasData={biasData} />
                    </div>
                    <div className="mt-4">
                      <ExplanationPanel biasData={biasData} />
                    </div>
                    <div className="mt-4">
                      {geminiLoading && !geminiAnalysis && (
                        <div className="card p-6 anim-up" style={{ animationDelay: '0.35s' }}>
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-lg flex items-center justify-center"
                              style={{ background: 'linear-gradient(135deg, rgba(124,58,237,0.2), rgba(168,85,247,0.1))', boxShadow: '0 0 20px rgba(124,58,237,0.15)' }}>
                              <span style={{ fontSize: '0.875rem' }}>✨</span>
                            </div>
                            <div>
                              <p className="heading text-sm font-bold">Gemini AI is analyzing...</p>
                              <p style={{ fontSize: '0.6875rem', color: 'rgba(228,228,231,0.3)' }}>Generating fairness report with Google Gemini 2.0 Flash</p>
                            </div>
                            <div style={{ marginLeft: 'auto', display: 'flex', gap: 3 }}>
                              {[0, 1, 2].map(i => (
                                <span key={i} style={{
                                  width: 6, height: 6, borderRadius: '50%', background: '#a855f7',
                                  animation: `glowPulse 1s ease-in-out ${i * 0.2}s infinite`,
                                }} />
                              ))}
                            </div>
                          </div>
                        </div>
                      )}
                      <GeminiInsights analysis={geminiAnalysis} />
                    </div>
                    <div className="mt-4">
                      <WhatIfSimulator applicant={applicant} />
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer style={{ padding: '20px 28px', borderTop: '1px solid rgba(255,255,255,0.04)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{
              width: 20, height: 20, borderRadius: 6,
              background: 'linear-gradient(135deg, #7c3aed, #a855f7)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 0 10px rgba(124,58,237,0.25)',
            }}>
              <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
            </div>
            <span style={{ fontSize: '0.6875rem', color: 'rgba(228,228,231,0.25)' }}>© 2026 BiasGuard AI · Built for Fairness</span>
          </div>
          <div style={{ display: 'flex', gap: 20 }}>
            {['Privacy', 'Terms', 'Security', 'Docs'].map(t => (
              <span key={t} style={{ fontSize: '0.6875rem', color: 'rgba(228,228,231,0.25)', cursor: 'pointer', transition: 'color 0.2s' }}>{t}</span>
            ))}
          </div>
        </footer>
      </div>
    </div>
  );
}
