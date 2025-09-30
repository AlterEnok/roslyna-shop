import './Hero.css';
import { useEffect, useState } from 'react';
import { Link as ScrollLink } from "react-scroll";
import { Link } from 'react-router-dom';
import heroVideo from '../../assets/background.mp4';

function Hero() {
    const [isVisible, setIsVisible] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setIsVisible(true), 100);
        return () => clearTimeout(timer);
    }, []);

    // 🔥 блокировка скролла, когда модалка открыта
    useEffect(() => {
        if (isModalOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }
    }, [isModalOpen]);

    return (
        <section className="hero">
            <video className="hero__video" autoPlay muted loop playsInline>
                <source src={heroVideo} type="video/mp4" />
                Your browser does not support the video tag.
            </video>
            <div className="hero__overlay--top"></div>
            <div className="hero__overlay"></div>

            <div className={`hero__content ${isVisible ? 'show' : ''}`}>
                <h1 className="hero__title">Рослина Карпат</h1>
                <p className="hero__text">
                    «Сила карпатських трав у кожній капсулі — здоров’я, енергія та індивідуальний підбір«
                </p>
                <Link to="/catalog" className="hero__button">
                    Купити зараз
                </Link>

                <div className="hero__footer-links">
                    <ScrollLink
                        to="reviews"
                        smooth={true}
                        duration={600}
                        offset={-80}
                        className="hero__footer-link"
                    >
                        Відгуки
                    </ScrollLink>
                    <Link to="/blog" className="hero__footer-link">Блог</Link>
                    <button
                        className="hero__footer-link btn-link"
                        onClick={() => setIsModalOpen(true)}
                    >
                        Партнерство
                    </button>
                    <Link to="/blog" className="hero__footer-link">Індивідуальний підбір</Link>
                </div>

            </div>

            {/* 🔥 модалка */}
            {isModalOpen && (
                <div className="modal-overlay" onClick={() => setIsModalOpen(false)}>
                    <div className="modal" onClick={(e) => e.stopPropagation()}>
                        <button className="modal-close" onClick={() => setIsModalOpen(false)}>×</button>
                        <h2>Залиште заявку щоб стати партнером</h2>
                        <form className="modal-form">
                            <input type="text" placeholder="Ваше ім’я" required />
                            <input type="tel" placeholder="Ваш номер телефону" required />
                            <textarea placeholder="Ваше повідомлення" rows="4" required></textarea>
                            <button type="submit">Надіслати</button>
                        </form>
                    </div>
                </div>
            )}
        </section>
    );
}

export default Hero;
