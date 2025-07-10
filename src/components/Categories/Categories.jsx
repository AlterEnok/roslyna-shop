import './Categories.css';
import { useEffect, useRef, useState } from 'react';
import gelImg from '../../assets/gel.jpg';
import oilImg from '../../assets/oil.jpg';
import herbsImg from '../../assets/herbs.jpg';
import capsulesImg from '../../assets/capsules.jpg';

const categories = [
    { title: 'Гелі', image: gelImg },
    { title: 'Настоянки', image: oilImg },
    { title: 'Трави', image: herbsImg },
    { title: 'Капсули', image: capsulesImg },
];

function Categories() {
    const sectionRef = useRef(null);
    const [visibleIndexes, setVisibleIndexes] = useState([]);

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

    return (
        <section className="categories" ref={sectionRef}>
            <h2 className="categories__title">Головні категорії</h2>
            <div className="categories__grid">
                {categories.map((cat, index) => (
                    <div
                        key={index}
                        className={`category-card ${visibleIndexes.includes(index) ? 'fade-in' : ''}`}
                        data-index={index}
                        style={{ transitionDelay: `${index * 0.2}s` }}
                    >
                        <img src={cat.image} alt={cat.title} className="category-card__img" />
                        <div className="category-card__label">{cat.title}</div>
                    </div>
                ))}
            </div>
        </section>
    );
}

export default Categories;
