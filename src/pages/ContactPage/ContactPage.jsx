import React from "react";
import "./ContactPage.css";
import Footer from "../../components/Footer/Footer";
import heroImg from "../../assets/hero-contact.jpg";
import mapUkraine from "../../assets/ukraine-map.svg";
import usePageTitle from "../../hooks/usePageTitle";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTelegramPlane, faInstagram, faFacebook, faTiktok } from "@fortawesome/free-brands-svg-icons";
import { Helmet } from "react-helmet-async";

function ContactPage() {
    usePageTitle("Контакти");

    return (
        <>
            <Helmet>
                <title>Контакти | Рослина Карпат</title>
                <meta
                    name="description"
                    content="Зв’яжіться з компанією 'Рослина Карпат' — натуральна продукція з Карпат. Дізнайтесь нашу адресу, телефон, email та соціальні мережі."
                />
                <meta name="keywords" content="Рослина Карпат, контакти, адреса, телефон, Instagram, Telegram, TikTok, Facebook" />
                <meta property="og:title" content="Контакти | Рослина Карпат" />
                <meta property="og:description" content="Пошта, телефон та соцмережі компанії 'Рослина Карпат'." />
                <meta property="og:image" content={heroImg} />
                <meta property="og:type" content="website" />
            </Helmet>

            <section className="contact-page">
                <div
                    className="contact-hero"
                    style={{ backgroundImage: `url(${heroImg})` }}
                >
                    <div className="contact-hero__overlay">
                        <h1 className="contact-title">Контакти</h1>
                    </div>
                    <div className="contact-bottom-overlay"></div>
                </div>

                <div className="contact-info">
                    <div className="contact-card big">
                        <span className="contact-label">Пошта</span>
                        <p className="contact-value email">
                            <a href="mailto:tanusya09@gmail.com">tanusya09@gmail.com</a>
                        </p>
                    </div>

                    <div className="contact-row">
                        <div className="contact-card">
                            <span className="contact-label">Телефон</span>
                            <p className="contact-value phone">
                                <a href="tel:+380971345797">(+380) 097 134 5797</a>
                            </p>
                        </div>
                        <div className="contact-card">
                            <span className="contact-label">Адрес</span>
                            <p className="contact-value">
                                м. Зборів, вул. 8 Березня 15/1 <br />
                                Тернопільська область
                            </p>
                        </div>
                    </div>

                    <div className="contact-socials">
                        <a href="https://t.me/tanya_oprysko" target="_blank" rel="noopener noreferrer">
                            <FontAwesomeIcon icon={faTelegramPlane} />
                        </a>
                        <a href="https://www.instagram.com/tanya.opryshko?igsh=MXZwYWExcTYzZXhpcQ%3D%3D&utm_source=qr" target="_blank" rel="noopener noreferrer">
                            <FontAwesomeIcon icon={faInstagram} />
                        </a>
                        <a href="https://www.tiktok.com/@tanya_opryshko?_t=ZM-90pcwNzlzcO&_r=1" target="_blank" rel="noopener noreferrer">
                            <FontAwesomeIcon icon={faTiktok} />
                        </a>
                        <a href="https://www.facebook.com/share/1CcrzFPKiq/?mibextid=wwXIfr" target="_blank" rel="noopener noreferrer">
                            <FontAwesomeIcon icon={faFacebook} />
                        </a>
                    </div>
                </div>

                <div className="contact-map">
                    <img src={mapUkraine} alt="Карта України" className="map-img" />
                    <div className="map-marker">
                        <div className="map-tooltip">
                            М. Зборів<br />
                            Тернопільська область
                        </div>
                    </div>
                </div>

                <Footer />
            </section>
        </>
    );
}

export default ContactPage;
