import './Categories.css';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import gelImg from '../../assets/gel.jpg';
import oilImg from '../../assets/oil.jpg';
import herbsImg from '../../assets/herbs.jpg';
import capsulesImg from '../../assets/capsules.jpg';

function Categories() {
    const { t } = useTranslation();
    const sectionRef = useRef(null);
    const [visibleIndexes, setVisibleIndexes] = useState([]);
    const [textVisible, setTextVisible] = useState(false);
    const navigate = useNavigate();

    const categories = [
        { title: t('categories.gels'), image: gelImg },
        { title: t('categories.tinctures'), image: oilImg },
        { title: t('categories.herbs'), image: herbsImg },
        { title: t('categories.capsules'), image: capsulesImg },
    ];

    useEffect(() => {
        const cards = document.querySelectorAll('.category-card');
        const observer = new IntersectionObserver(
            entries => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const index = Number(entry.target.dataset.index);
                        setVisibleIndexes(prev => (prev.includes(index) ? prev : [...prev, index]));
                    }
                });
            },
            { threshold: 0.4 }
        );

        cards.forEach(card => observer.observe(card));
        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        const textBlock = document.querySelector('.categories__text');
        const observer = new IntersectionObserver(
            entries => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) setTextVisible(true);
                });
            },
            { threshold: 0.3 }
        );

        if (textBlock) observer.observe(textBlock);
        return () => observer.disconnect();
    }, []);

    return (
        <section className="categories" ref={sectionRef}>
            <h2 className="categories__title">{t('categories.title')}</h2>
            <div className="categories__grid">
                {categories.map((cat, index) => (
                    <div
                        key={index}
                        className={`category-card ${visibleIndexes.includes(index) ? 'fade-in' : ''} ${index === 1 || index === 2 ? 'raised' : ''}`}
                        data-index={index}
                        style={{ transitionDelay: `${index * 0.2}s` }}
                    >
                        <img src={cat.image} alt={cat.title} className="category-card__img" />
                        <div className="category-card__label">{cat.title}</div>
                    </div>
                ))}
            </div>

            <div className={`categories__text ${textVisible ? 'text-visible' : ''}`} style={{ transitionDelay: '0.3s' }}>
                <h4>{t('categories.text_block.small_title')}</h4>
                <p>{t('categories.text_block.paragraph_1')}</p>
                <p>{t('categories.text_block.paragraph_2')}</p>
                <button className="about-button" onClick={() => navigate('/about')}>
                    {t('categories.text_block.button')}
                </button>
            </div>
        </section>
    );
}

export default Categories;
