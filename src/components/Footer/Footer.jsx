import React from 'react';
import './Footer.css';
import logo from '../../assets/logo.png';
import { Link } from "react-router-dom";
import { useScrollToSection } from "../../hooks/useScrollToSection";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTelegramPlane, faInstagram, faFacebook, faTiktok } from '@fortawesome/free-brands-svg-icons';

function Footer() {
    const scrollToSection = useScrollToSection();

    return (
        <footer className="footer">
            <div className="footer__container">
                <div className="footer__top">

                    {/* --- Лого и описание --- */}
                    <div className="footer__brand">
                        <Link to="/" className="footer__logo-link">
                            <img src={logo} alt="Roslyna Karpat" className="footer__logo" />
                        </Link>
                        <p className="footer__desc">
                            Карпатські трави, що оздоровлюють організм, допомагають судинам,
                            відновити ШКТ та добре себе почувати і гарно виглядати.
                            <span className="footer__desc-gap">
                                Офіційний дистрибʼютор компанії Рослина Карпат в Україні.
                            </span>
                        </p>

                        <div className="footer__socials">
                            <a href="https://www.instagram.com/tanya.opryshko?igsh=MXZwYWExcTYzZXhpcQ%3D%3D&utm_source=qr" target="_blank" rel="noreferrer">
                                <FontAwesomeIcon icon={faInstagram} />
                            </a>
                            <a href="https://t.me/tanya_oprysko" target="_blank" rel="noreferrer">
                                <FontAwesomeIcon icon={faTelegramPlane} />
                            </a>
                            <a href="https://www.tiktok.com/@tanya_opryshko?_t=ZM-90pcwNzlzcO&_r=1" target="_blank" rel="noreferrer">
                                <FontAwesomeIcon icon={faTiktok} />
                            </a>
                            <a href="https://www.facebook.com/share/1CcrzFPKiq/?mibextid=wwXIfr" target="_blank" rel="noreferrer">
                                <FontAwesomeIcon icon={faFacebook} />
                            </a>
                        </div>
                    </div>

                    {/* --- Навигация --- */}
                    <div className="footer__nav-wrapper">
                        <nav className="footer__nav">
                            <h4 className="footer__title">Правова інформація</h4>
                            <Link to="/terms">Умови використання</Link>
                            <Link to="/privacy">Політика конфіденційності</Link>
                            <Link to="/certificates">Сертифікати</Link>
                            <Link to="/return">Повернення та обмін</Link>
                        </nav>

                        <nav className="footer__nav">
                            <h4 className="footer__title">Допомога</h4>
                            <Link to="/catalog">Каталог</Link>
                            <Link to="/about">Про нас</Link>


                            <button
                                type="button"
                                className="footer__link"
                                onClick={() => scrollToSection("reviews")}
                            >
                                Відгуки
                            </button>

                            <Link to="/contact">Контакти</Link>
                        </nav>
                    </div>


                    <div className="footer__blog">
                        <h4 className="footer__title">Дізнатися про останні оновлення товарів</h4>
                        <Link to="/blog" className="footer__blog-btn">Блог</Link>

                        <div className="footer__schedule">
                            <h4 className="footer__title">Графік роботи</h4>
                            <p>Понеділок — П’ятниця: з 10:00 до 18:00</p>
                            <p>Відправлення здійснюється в той самий день, якщо замовлення оформлене до 15:00</p>
                        </div>

                    </div>
                </div>

                <p className="footer__copyright">
                    © Карпатські трави. 2025. Усі права захищені. Розроблено студією {" "}
                    <a href="https://www.novateamweb.com" target="_blank" rel="noreferrer">NovaTeam</a>.
                </p>
            </div>
        </footer>
    );
}

export default Footer;
