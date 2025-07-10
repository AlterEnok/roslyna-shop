import React from 'react';
import './ContactTicker.css';

function ContactTicker() {
    return (
        <div className="ticker-wrapper">
            <div className="ticker-container">
                <div className="ticker-track">
                    <div className="ticker-item">order@karpatplant.com.ua</div>
                    <div className="ticker-item">ПН-ПТ 9:00 - 18:00</div>
                    <div className="ticker-item">(095) 760-95-17</div>

                    {/* Повтор для бесконечной прокрутки */}
                    <div className="ticker-item">order@karpatplant.com.ua</div>
                    <div className="ticker-item">ПН-ПТ 9:00 - 18:00</div>
                    <div className="ticker-item">(095) 760-95-17</div>
                </div>
            </div>
        </div>
    );
}

export default ContactTicker;
