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
                        href="https://t.me/yourchannel"
                        target="_blank"
                        rel="noreferrer"
                        className="location__icon"
                    >
                        <FontAwesomeIcon icon={faTelegramPlane} />
                    </a>
                    <a
                        href="https://instagram.com/yourprofile"
                        target="_blank"
                        rel="noreferrer"
                        className="location__icon"
                    >
                        <FontAwesomeIcon icon={faInstagram} />
                    </a>
                    <a
                        href="https://facebook.com/yourpage"
                        target="_blank"
                        rel="noreferrer"
                        className="location__icon"
                    >
                        <FontAwesomeIcon icon={faFacebook} />
                    </a>
                    <a
                        href="https://www.tiktok.com/@yourprofile"
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
