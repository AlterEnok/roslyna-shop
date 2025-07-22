import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import './LanguagePopup.css';

function LanguagePopup() {
    const [isVisible, setIsVisible] = useState(false);
    const { i18n, t } = useTranslation();

    useEffect(() => {
        const wasChosen = localStorage.getItem('lang_was_chosen');
        if (!wasChosen) {
            setIsVisible(true);
        }
    }, []);

    const selectLang = (langCode) => {
        i18n.changeLanguage(langCode).then(() => {
            localStorage.setItem('lang_was_chosen', langCode);
            setIsVisible(false);
        });
    };

    const handleReopen = () => {
        setIsVisible(true);
    };

    return (
        <>
            {isVisible && (
                <div className="lang-popup">
                    <div className="lang-popup__box">
                        <h2>{t('choose_language')}</h2>
                        <button onClick={() => selectLang('uk')}>Українська</button>
                        <button onClick={() => selectLang('en')}>English</button>
                    </div>
                </div>
            )}

            {/* Постоянный флажок, чтобы заново открыть */}
            <div className="lang-popup__trigger" onClick={handleReopen}>
                🌍
            </div>
        </>
    );
}

export default LanguagePopup;
