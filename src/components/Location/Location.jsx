import React from 'react';
import './Location.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTelegramPlane, faInstagram } from '@fortawesome/free-brands-svg-icons';
import bgImage from '../../assets/zakarpath.jpg';
import { useTranslation } from 'react-i18next';

function LocationSection() {
    const { t } = useTranslation();

    return (
        <section
            className="location"
            style={{ backgroundImage: `url(${bgImage})` }}
        >
            <div className="location__overlay">
                <h2 className="location__title">{t('location.title')}</h2>
                <div className="location__icons">
                    <a href="https://t.me/yourchannel" target="_blank" rel="noreferrer" className="location__icon">
                        <FontAwesomeIcon icon={faTelegramPlane} />
                    </a>
                    <a href="https://instagram.com/yourprofile" target="_blank" rel="noreferrer" className="location__icon">
                        <FontAwesomeIcon icon={faInstagram} />
                    </a>
                </div>
                <p className="location__place">{t('location.address')}</p>
            </div>
        </section>
    );
}

export default LocationSection;
