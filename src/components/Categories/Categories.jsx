import './Categories.css';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import creamImg from '../../assets/categories1.jpg';
import intimateGelImg from '../../assets/categories2.jpg';
import faceCareImg from '../../assets/categories3.jpg';
import capsulesImg from '../../assets/categories4.jpg';

function Categories() {
    const sectionRef = useRef(null);
    const [visibleIndexes, setVisibleIndexes] = useState([]);
    const [textVisible, setTextVisible] = useState(false);
    const navigate = useNavigate();

    const categories = [
        { image: creamImg },
        { image: intimateGelImg },
        { image: faceCareImg },
        { image: capsulesImg },
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
            <h2 className="categories__title">Категорії товарів</h2>
            <div className="categories__grid">
                {categories.map((cat, index) => (
                    <div
                        key={index}
                        className={`category-card ${visibleIndexes.includes(index) ? 'fade-in' : ''} ${index === 1 || index === 2 ? 'raised' : ''
                            }`}
                        data-index={index}
                        style={{ transitionDelay: `${index * 0.2}s` }}
                    >
                        <img src={cat.image} alt={`category-${index}`} className="category-card__img" />
                    </div>
                ))}
            </div>

            <div
                className={`categories__text ${textVisible ? 'text-visible' : ''}`}
                style={{ transitionDelay: '0.3s' }}
            >
                <h4>Ми сьогодні</h4>
                <p>
                    Лідерство - це сила, здатна зібрати всі частини в єдине ціле.
                    Тільки справжньому лідерові під силу побудувати сильний бізнес.
                    » (Р. Кійосаки)
                </p>
                <p>
                    Український бренд «Рослина Карпат» - потужний виробник екологічно чистої,
                    натуральної продукції із природної сировини для здоров’я та краси з багаторічним досвідом.
                    Виробництво давно має замкнутий цикл від збору сировини у високогірних диких Карпатах,
                    підготовки збору лікарських рослин - до упаковки препаратів.
                </p>
                <button className="about-button" onClick={() => navigate('/about')}>
                    Детальніше
                </button>
            </div>
        </section>
    );
}

export default Categories;
