import React from "react";
import "./ContactPage.css";
import Footer from "../../components/Footer/Footer";
import heroImg from "../../assets/hero-contact.jpg";
import mapUkraine from "../../assets/ukraine-map.svg";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTelegramPlane, faInstagram, faFacebook, faTiktok } from "@fortawesome/free-brands-svg-icons";

function ContactPage() {
    return (
        <section className="contact-page">
            {/* 🔹 Верхушка */}
            <div
                className="contact-hero"
                style={{ backgroundImage: `url(${heroImg})` }}
            >
                <div className="contact-hero__overlay">
                    <h1 className="contact-title">Контакти</h1>
                </div>
                <div className="contact-bottom-overlay"></div>
            </div>

            {/* 🔹 Блок контактов */}
            <div className="contact-info">
                <div className="contact-card big">
                    <span className="contact-label">Пошта</span>
                    <p className="contact-value">
                        <a href="mailto:tanusya09@gmail.com">tanusya09@gmail.com</a>
                    </p>
                </div>

                <div className="contact-row">
                    <div className="contact-card">
                        <span className="contact-label">Телефон</span>
                        <p className="contact-value">
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

                {/* 🔹 Соцсети */}
                <div className="contact-socials">
                    <a href="https://t.me/" target="_blank" rel="noopener noreferrer">
                        <FontAwesomeIcon icon={faTelegramPlane} />
                    </a>
                    <a href="https://instagram.com/" target="_blank" rel="noopener noreferrer">
                        <FontAwesomeIcon icon={faInstagram} />
                    </a>
                    <a href="https://tiktok.com/" target="_blank" rel="noopener noreferrer">
                        <FontAwesomeIcon icon={faTiktok} />
                    </a>
                    <a href="https://facebook.com/" target="_blank" rel="noopener noreferrer">
                        <FontAwesomeIcon icon={faFacebook} />
                    </a>
                </div>
            </div>

            <div className="contact-map">
                <img src={mapUkraine} alt="Карта Украины" className="map-img" />
                <div className="map-marker">
                    <div className="map-tooltip">
                        М. Зборів<br />
                        Тернопільська область
                    </div>
                </div>
            </div>

            <Footer />
        </section>
    );
}

export default ContactPage;
