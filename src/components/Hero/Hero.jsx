import './Hero.css';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import heroVideo from '../../assets/background.mp4';

function Hero() {
    const [isVisible, setIsVisible] = useState(false);
    const { t } = useTranslation();

    useEffect(() => {
        const timer = setTimeout(() => setIsVisible(true), 100);
        return () => clearTimeout(timer);
    }, []);

    return (
        <section className="hero">
            <video className="hero__video" autoPlay muted loop playsInline>
                <source src={heroVideo} type="video/mp4" />
                Your browser does not support the video tag.
            </video>
            <div className="hero__overlay--top"></div>
            <div className="hero__overlay"></div>

            <div className={`hero__content ${isVisible ? 'show' : ''}`}>
                <h1 className="hero__title">ROSLYNA KARPAT</h1>
                <p className="hero__text">
                    {t('hero.description')}
                </p>
                <Link to="/catalog" className="hero__button">
                    {t('hero.buy_now')}
                </Link>

                <div className="hero__footer-links">
                    <Link to="/reviews" className="hero__footer-link">{t('hero.reviews')}</Link>
                    <Link to="/blog" className="hero__footer-link">{t('hero.blog')}</Link>
                </div>
            </div>
        </section>
    );
}

export default Hero;
