import { useEffect, useState } from 'react';

/**
 * Smoothly animates a numeric value using requestAnimationFrame.
 * Supports cubic ease-out and optional locale formatting.
 */
export default function AnimatedNumber({ value = 0, duration = 800, formatLocale = false }) {
    const target = Number(value) || 0;
    const [display, setDisplay] = useState(0);

    useEffect(() => {
        let animationFrameId;
        let startTime = null;

        const animate = (timestamp) => {
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / duration, 1);
            const easeOut = 1 - Math.pow(1 - progress, 3);
            setDisplay(Math.round(easeOut * target));

            if (progress < 1) {
                animationFrameId = requestAnimationFrame(animate);
            }
        };

        animationFrameId = requestAnimationFrame(animate);
        return () => {
            if (animationFrameId) cancelAnimationFrame(animationFrameId);
        };
    }, [target, duration]);

    return <>{formatLocale ? display.toLocaleString() : display}</>;
}
