import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import './StatsSection.css';

function StatsSection() {
    const { t } = useTranslation();

    const stats = [
        {
            label: t('stats.item1'),
            value: 1000,
            suffix: '+',
        },
        {
            label: t('stats.item2'),
            value: 95,
            suffix: '%',
        },
        {
            label: t('stats.item3'),
            value: 100,
            suffix: '%',
        },
    ];

    return (
        <section className="stats-section">
            {stats.map((stat, i) => (
                <StatBox
                    key={i}
                    label={stat.label}
                    value={stat.value}
                    suffix={stat.suffix}
                    delay={i * 200}
                />
            ))}
        </section>
    );
}

function StatBox({ label, value, suffix, delay }) {
    const [count, setCount] = useState(0);
    const [isVisible, setIsVisible] = useState(false);
    const ref = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.unobserve(entry.target);
                }
            },
            { threshold: 0.3 }
        );

        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        if (!isVisible) return;

        const duration = 1500;
        const steps = 60;
        const increment = Math.ceil(value / steps);
        const interval = duration / steps;

        const timer = setInterval(() => {
            setCount((prev) => {
                if (prev + increment >= value) {
                    clearInterval(timer);
                    return value;
                }
                return prev + increment;
            });
        }, interval);

        return () => clearInterval(timer);
    }, [isVisible, value]);

    return (
        <div
            ref={ref}
            className={`stat-box ${isVisible ? 'visible' : ''}`}
            style={{ transitionDelay: `${delay}ms` }}
        >
            <p className="stat-box__label">{label}</p>
            <div className="stat-box__number">
                {count}
                {suffix}
            </div>
        </div>
    );
}

export default StatsSection;
