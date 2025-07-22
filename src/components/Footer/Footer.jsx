import React from 'react';
import './Footer.css';
import logo from '../../assets/logo.png';
import { useTranslation } from 'react-i18next';

function Footer() {
    const { t } = useTranslation();

    return (
        <footer className="footer">
            <div className="footer__container">
                <img src={logo} alt="Roslyna Karpat" className="footer__logo" />

                <div className="footer__nav-wrapper">
                    <nav className="footer__nav">
                        <a href="/catalog">{t('footer.nav.catalog')}</a>
                        <a href="/about">{t('footer.nav.about')}</a>
                        <a href="/contacts">{t('footer.nav.contacts')}</a>
                        <a href="/reviews">{t('footer.nav.reviews')}</a>
                        <a href="/blog">{t('footer.nav.blog')}</a>
                    </nav>

                    <nav className="footer__nav footer__nav--secondary">
                        <a href="/terms">{t('footer.nav.terms')}</a>
                        <a href="/privacy">{t('footer.nav.privacy')}</a>
                        <a href="/certificates">{t('footer.nav.certificates')}</a>
                        <a href="/return-policy">{t('footer.nav.return')}</a>
                    </nav>
                </div>

                <p className="footer__copyright">
                    © RoslynaKarpath. 2025. {t('footer.rights')}
                </p>
            </div>
        </footer>
    );
}

export default Footer;
