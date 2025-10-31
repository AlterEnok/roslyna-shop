import React from 'react';
import './Location.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTelegramPlane, faInstagram, faFacebook, faTiktok } from '@fortawesome/free-brands-svg-icons';
import bgImage from '../../assets/zakarpath.jpg';

function LocationSection() {
    return (
        <section
            className="location"
            style={{ backgroundImage: `url(${bgImage})` }}
        >
            <div className="location__overlay">
                <h2 className="location__title">Де ми є</h2>
                <div className="location__icons">
                    <a
                        href="https://t.me/tanya_oprysko"
                        target="_blank"
                        rel="noreferrer"
                        className="location__icon"
                    >
                        <FontAwesomeIcon icon={faTelegramPlane} />
                    </a>
                    <a
                        href="https://www.instagram.com/tanya.opryshko?igsh=MXZwYWExcTYzZXhpcQ%3D%3D&utm_source=qr"
                        target="_blank"
                        rel="noreferrer"
                        className="location__icon"
                    >
                        <FontAwesomeIcon icon={faInstagram} />
                    </a>
                    <a
                        href="https://www.facebook.com/share/1CcrzFPKiq/?mibextid=wwXIfr"
                        target="_blank"
                        rel="noreferrer"
                        className="location__icon"
                    >
                        <FontAwesomeIcon icon={faFacebook} />
                    </a>
                    <a
                        href="https://www.tiktok.com/@tanya_opryshko?_t=ZM-90pcwNzlzcO&_r=1"
                        target="_blank"
                        rel="noreferrer"
                        className="location__icon"
                    >
                        <FontAwesomeIcon icon={faTiktok} />
                    </a>
                </div>

            </div>
        </section>
    );
}

export default LocationSection;
