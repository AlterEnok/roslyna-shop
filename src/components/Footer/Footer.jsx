import React from 'react';
import './Footer.css';
import logo from '../../assets/logo.png';
import { Link } from "react-router-dom";
import { HashLink } from "react-router-hash-link";




import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTelegramPlane, faInstagram, faFacebook, faTiktok } from '@fortawesome/free-brands-svg-icons';

function Footer() {
    return (
        <footer className="footer">
            <div className="footer__container">
                <div className="footer__top">


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


                    <div className="footer__nav-wrapper">
                        <nav className="footer__nav">
                            <h4 className="footer__title">Правова інформація</h4>
                            <Link to="/terms">Умови використання</Link>
                            <Link to="/privacy">Політика конфіденційності</Link>
                            <Link to="/certificates">Сертифікати</Link>
                            <Link to="/returns">Повернення та обмін</Link>
                        </nav>

                        <nav className="footer__nav">
                            <h4 className="footer__title">Допомога</h4>
                            <Link to="/catalog">Каталог</Link>
                            <Link to="/about">Про нас</Link>
                            <HashLink
                                to="/#reviews"
                                smooth
                                className="footer__link"
                            >
                                Відгуки
                            </HashLink>
                            <Link to="/contact">Контакти</Link>
                        </nav>



                    </div>


                    <div className="footer__blog">
                        <h4 className="footer__title">Дізнатися про останні оновлення товарів</h4>
                        <Link to="/blog" className="footer__blog-btn">Блог</Link>
                    </div>
                </div>


                <p className="footer__copyright">
                    © RoslynaKarpath. 2025. All rights reserved. Designed by <a href="https://www.novateamweb.com" target="_blank" rel="noreferrer">NovaTeam</a>.
                </p>
            </div>
        </footer>
    );
}

export default Footer;
