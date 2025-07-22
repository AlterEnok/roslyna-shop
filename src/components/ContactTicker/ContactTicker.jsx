import React from 'react';
import './ContactTicker.css';
import { useTranslation } from 'react-i18next';

function ContactTicker() {
    const { t } = useTranslation();

    return (
        <div className="ticker-wrapper">
            <div className="ticker-container">
                <div className="ticker-track">
                    <div className="ticker-item">order@karpatplant.com.ua</div>
                    <div className="ticker-item">{t('ticker.work_time')}</div>
                    <div className="ticker-item">{t('ticker.phone')}</div>

                    <div className="ticker-item">order@karpatplant.com.ua</div>
                    <div className="ticker-item">{t('ticker.work_time')}</div>
                    <div className="ticker-item">{t('ticker.phone')}</div>
                </div>
            </div>
        </div>
    );
}

export default ContactTicker;
