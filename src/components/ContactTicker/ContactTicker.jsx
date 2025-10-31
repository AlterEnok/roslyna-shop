import React from 'react';
import './ContactTicker.css';

function ContactTicker() {
    return (
        <div className="ticker-wrapper">
            <div className="ticker-container">
                <div className="ticker-track">
                    <div className="ticker-item">tanusya09@gmail.com</div>
                    <div className="ticker-item">Пн–Пт: 10:00 – 18:00</div>
                    <div className="ticker-item">+38 (097) 134-57-97</div>

                    <div className="ticker-item">tanusya09@gmail.com</div>
                    <div className="ticker-item">Пн–Пт: 10:00 – 18:00</div>
                    <div className="ticker-item">+38 (097) 134-57-97</div>
                </div>
            </div>
        </div>
    );
}

export default ContactTicker;
