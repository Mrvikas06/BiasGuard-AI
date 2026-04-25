import { useState, useEffect } from 'react';

export default function GeminiInsights({ analysis }) {
    const [displayed, setDisplayed] = useState('');
    const [done, setDone] = useState(false);

    useEffect(() => {
        if (!analysis) return;
        setDisplayed('');
        setDone(false);

        const text = analysis.text;
        let i = 0;
        const speed = analysis.success ? 4 : 10; // chars per tick
        const interval = setInterval(() => {
            i += speed;
            if (i >= text.length) {
                setDisplayed(text);
                setDone(true);
                clearInterval(interval);
            } else {
                setDisplayed(text.slice(0, i));
            }
        }, 12);

        return () => clearInterval(interval);
    }, [analysis]);

    if (!analysis) return null;

    // Simple markdown renderer for the AI output
    const renderMarkdown = (md) => {
        const lines = md.split('\n');
        const elements = [];
        let listItems = [];

        const flushList = () => {
            if (listItems.length > 0) {
                elements.push(
                    <ul key={`ul-${elements.length}`} style={{ margin: '8px 0', paddingLeft: 18, listStyle: 'none' }}>
                        {listItems.map((li, idx) => (
                            <li key={idx} style={{ fontSize: '0.8125rem', color: 'rgba(228,228,231,0.7)', lineHeight: 1.7, marginBottom: 4, position: 'relative', paddingLeft: 14 }}>
                                <span style={{ position: 'absolute', left: 0, color: '#a855f7' }}>•</span>
                                <span dangerouslySetInnerHTML={{ __html: formatInline(li) }} />
                            </li>
                        ))}
                    </ul>
                );
                listItems = [];
            }
        };

        const formatInline = (text) => {
            return text
                .replace(/\*\*(.*?)\*\*/g, '<strong style="color:#e4e4e7;font-weight:700">$1</strong>')
                .replace(/`(.*?)`/g, '<code style="background:rgba(139,92,246,0.15);color:#c4b5fd;padding:1px 5px;border-radius:4px;font-size:0.75rem">$1</code>');
        };

        for (let i = 0; i < lines.length; i++) {
            const line = lines[i].trim();

            if (line.startsWith('### ')) {
                flushList();
                elements.push(
                    <h4 key={`h-${i}`} style={{
                        fontSize: '0.875rem', fontWeight: 800, color: '#f4f4f5',
                        marginTop: elements.length > 0 ? 16 : 0, marginBottom: 6,
                        letterSpacing: '-0.01em',
                    }}>
                        {line.replace('### ', '')}
                    </h4>
                );
            } else if (line.startsWith('- ') || line.startsWith('* ')) {
                listItems.push(line.slice(2));
            } else if (line.match(/^\d+\.\s/)) {
                const content = line.replace(/^\d+\.\s/, '');
                listItems.push(content);
            } else if (line.length > 0) {
                flushList();
                elements.push(
                    <p key={`p-${i}`} style={{ fontSize: '0.8125rem', color: 'rgba(228,228,231,0.6)', lineHeight: 1.7, margin: '4px 0' }}
                        dangerouslySetInnerHTML={{ __html: formatInline(line) }} />
                );
            }
        }
        flushList();
        return elements;
    };

    return (
        <div className="card p-6 anim-up" style={{ animationDelay: '0.35s', position: 'relative', overflow: 'hidden' }}>
            {/* Ambient glow */}
            <div style={{
                position: 'absolute', top: -40, right: -40, width: 200, height: 200,
                borderRadius: '50%', background: 'radial-gradient(circle, rgba(124,58,237,0.06), transparent 70%)',
                pointerEvents: 'none',
            }} />

            {/* Header */}
            <div className="flex items-center justify-between mb-5" style={{ position: 'relative' }}>
                <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center"
                        style={{
                            background: 'linear-gradient(135deg, rgba(124,58,237,0.2), rgba(168,85,247,0.1))',
                            boxShadow: '0 0 20px rgba(124,58,237,0.15)',
                        }}>
                        <span style={{ fontSize: '0.875rem' }}>✨</span>
                    </div>
                    <div>
                        <h2 className="heading text-sm font-bold">Gemini AI Insights</h2>
                        <p style={{ fontSize: '0.6875rem', color: 'rgba(228,228,231,0.3)' }}>Powered by Google Gemini 2.0 Flash</p>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    {!done && (
                        <span style={{
                            display: 'inline-flex', alignItems: 'center', gap: 5,
                            fontSize: '0.5625rem', fontWeight: 700, color: '#a855f7',
                            padding: '3px 10px', borderRadius: 8,
                            background: 'rgba(168,85,247,0.1)',
                        }}>
                            <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#a855f7', animation: 'livePulse 1s ease-in-out infinite' }} />
                            Analyzing...
                        </span>
                    )}
                    {done && analysis.success && (
                        <span className="tag tag-green" style={{ fontSize: '0.5625rem' }}>✓ Complete</span>
                    )}
                    {done && !analysis.success && (
                        <span className="tag tag-red" style={{ fontSize: '0.5625rem' }}>Error</span>
                    )}
                </div>
            </div>

            {/* Content */}
            <div style={{
                background: 'rgba(255,255,255,0.02)',
                border: '1px solid rgba(255,255,255,0.04)',
                borderRadius: 14,
                padding: '16px 20px',
                minHeight: 120,
                position: 'relative',
            }}>
                {/* Top gradient bar */}
                <div style={{
                    position: 'absolute', top: 0, left: '10%', right: '10%', height: 1,
                    background: 'linear-gradient(90deg, transparent, rgba(139,92,246,0.3), transparent)',
                }} />

                {renderMarkdown(displayed)}

                {/* Cursor blink */}
                {!done && (
                    <span style={{
                        display: 'inline-block', width: 2, height: 14,
                        background: '#a855f7', marginLeft: 2, verticalAlign: 'text-bottom',
                        animation: 'glowPulse 0.8s ease-in-out infinite',
                        boxShadow: '0 0 6px rgba(168,85,247,0.5)',
                    }} />
                )}
            </div>

            {/* Footer */}
            {done && analysis.success && (
                <div style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    marginTop: 12, paddingTop: 12,
                    borderTop: '1px solid rgba(255,255,255,0.04)',
                }}>
                    <span style={{ fontSize: '0.5625rem', color: 'rgba(228,228,231,0.2)' }}>
                        Model: gemini-2.0-flash · Response generated in real-time
                    </span>
                    <div style={{ display: 'flex', gap: 6 }}>
                        <span style={{ width: 16, height: 16, borderRadius: 5, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(255,255,255,0.04)', cursor: 'pointer', fontSize: '0.5rem' }}>📋</span>
                        <span style={{ width: 16, height: 16, borderRadius: 5, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(255,255,255,0.04)', cursor: 'pointer', fontSize: '0.5rem' }}>🔄</span>
                    </div>
                </div>
            )}
        </div>
    );
}
