import React from 'react';
import './Footer.css';
import logo from '../../assets/logo.png';

// FontAwesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTelegramPlane, faInstagram, faFacebook, faTiktok } from '@fortawesome/free-brands-svg-icons';

function Footer() {
    return (
        <footer className="footer">
            <div className="footer__container">
                <div className="footer__top">

                    {/* Лого + описание + соцсети */}
                    <div className="footer__brand">
                        <img src={logo} alt="Roslyna Karpat" className="footer__logo" />
                        <p className="footer__desc">
                            Карпатські трави, що оздоровлюють організм, допомагають судинам,
                            відновити ШКТ та добре себе почувати і гарно виглядати
                        </p>
                        <div className="footer__socials">
                            <a href="https://instagram.com" target="_blank" rel="noreferrer">
                                <FontAwesomeIcon icon={faInstagram} />
                            </a>
                            <a href="https://t.me" target="_blank" rel="noreferrer">
                                <FontAwesomeIcon icon={faTelegramPlane} />
                            </a>
                            <a href="https://tiktok.com" target="_blank" rel="noreferrer">
                                <FontAwesomeIcon icon={faTiktok} />
                            </a>
                            <a href="https://facebook.com" target="_blank" rel="noreferrer">
                                <FontAwesomeIcon icon={faFacebook} />
                            </a>
                        </div>
                    </div>

                    {/* Навигация */}
                    <div className="footer__nav-wrapper">
                        <nav className="footer__nav">
                            <h4 className="footer__title">Правова інформація</h4>
                            <a href="/shampoos">Умови використання</a>
                            <a href="/conditioners">Політика конфіденційності</a>
                            <a href="/masks">Сертифікати</a>
                            <a href="/oils">Повернення та обмін</a>
                        </nav>

                        <nav className="footer__nav">
                            <h4 className="footer__title">Допомога</h4>
                            <a href="/catalog">Каталог</a>
                            <a href="/about">Про нас</a>
                            <a href="#reviews">Відгуки</a>
                            <a href="/contacts">Контакти</a>
                        </nav>
                    </div>

                    {/* Блог */}
                    <div className="footer__blog">
                        <h4 className="footer__title">Дізнатися про останні оновлення товарів</h4>
                        <a href="/blog" className="footer__blog-btn">Блог</a>
                    </div>
                </div>

                {/* Копирайт */}
                <p className="footer__copyright">
                    © RoslynaKarpath. 2025. All rights reserved. Designed by <a href="https://www.novateamweb.com" target="_blank" rel="noreferrer">NovaTeam</a>.
                </p>
            </div>
        </footer>
    );
}

export default Footer;
