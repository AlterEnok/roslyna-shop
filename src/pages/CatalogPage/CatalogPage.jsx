import React, { useState, useRef } from 'react';
import ProductList from '../../components/ProductList/ProductList';
import Footer from '../../components/Footer/Footer';
import heroImg from '../../assets/catalog-hero.jpg';
import './CatalogPage.css';

import product1Img from '../../assets/product1.png';
import product2Img from '../../assets/product2.png';
import product3Img from '../../assets/product3.png';
import product4Img from '../../assets/product4.png';

import gsap from 'gsap';

// временные товары
const allProducts = [
    { id: 1, title: "Рослина карпат: 6 в одному", subtitle: "Евкаліпт, чорний горіх, пижма, розторопша", category: "Herbal", price: 2490, image: product1Img },
    { id: 2, title: "L-Карнітин PRO", subtitle: "Підтримка імунітету та енергії", category: "Herbal-complex", price: 2690, image: product2Img },
    { id: 3, title: "Журавлина СИРОП", subtitle: "Підтримка імунітету та здоров’я", category: "Herbal-syrups", price: 2590, image: product3Img },
    { id: 4, title: "Антивірин Муршине дерево", subtitle: "Підтримка імунітету та здоров’я", category: "Cosmetic balms", price: 2590, image: product4Img },
];

// категории для фильтра
const categories = [
    { value: "all", label: "Усе" },
    { value: "Herbal", label: "Фіто препарати " },
    { value: "Herbal-complex", label: "Фіто комплекси " },
    { value: "Herbal-candless", label: "Фіто свічки " },
    { value: "Herbal-syrups", label: "Фіто сиропи" },
    { value: "Natural antiseptics ", label: "Природні антисептики" },
    { value: "Cosmetic balms  ", label: "Косметичні бальзами " }

];

export default function CatalogPage({ addToCart }) {
    const [filter, setFilter] = useState("all");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 4;

    const containerRef = useRef(null);

    const filteredProducts =
        filter === "all"
            ? allProducts
            : allProducts.filter((p) => p.category === filter);

    const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentProducts = filteredProducts.slice(startIndex, startIndex + itemsPerPage);

    const handleFilterChange = (value) => {
        setFilter(value);
        setCurrentPage(1);
        scrollToTop();
    };

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const handlePageChange = (page) => {
        if (!containerRef.current) return;

        const cards = containerRef.current.children;

        gsap.to(cards, {
            y: -30,
            opacity: 0,
            stagger: 0.05,
            duration: 0.2,
            onComplete: () => {
                setCurrentPage(page);
                scrollToTop();

                setTimeout(() => {
                    const newCards = containerRef.current.children;
                    gsap.fromTo(
                        newCards,
                        { y: 30, opacity: 0 },
                        { y: 0, opacity: 1, stagger: 0.05, duration: 0.3 }
                    );
                }, 50);
            }
        });
    };

    // динамическая пагинация с "..."
    const renderPageNumbers = () => {
        const pages = [];

        if (totalPages <= 7) {
            // если страниц мало — показываем все
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i);
            }
        } else {
            // всегда первая
            pages.push(1);

            if (currentPage > 4) {
                pages.push("...");
            }

            const start = Math.max(2, currentPage - 2);
            const end = Math.min(totalPages - 1, currentPage + 2);

            for (let i = start; i <= end; i++) {
                pages.push(i);
            }

            if (currentPage < totalPages - 3) {
                pages.push("...");
            }

            // всегда последняя
            pages.push(totalPages);
        }

        return pages.map((page, idx) =>
            page === "..." ? (
                <span key={idx} className="dots">...</span>
            ) : (
                <button
                    key={page}
                    className={currentPage === page ? "active" : ""}
                    onClick={() => handlePageChange(page)}
                >
                    {page}
                </button>
            )
        );
    };

    return (
        <div className="catalog-page">
            <section
                className="catalog-hero"
                style={{ backgroundImage: `url(${heroImg})` }}
            >
                <div className="catalog-hero__overlay">
                    <h1 className="catalog-title">Каталог</h1>
                    <div className="catalog-filters__wrapper">
                        <div className="catalog-filters">
                            {categories.map(({ value, label }) => (
                                <button
                                    key={value}
                                    className={filter === value ? "active" : ""}
                                    onClick={() => handleFilterChange(value)}
                                >
                                    {label}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="catalog-bottom-overlay"></div>
            </section>

            <div className="catalog-description">
                У магазині представлена натуральна продукція для здоров’я та краси, виготовлена з екологічно чистої сировини Карпат. Усі товари створюються на основі лікарських рослин, зібраних у високогір’ї, з дотриманням замкнутого циклу виробництва — від збору та підготовки сировини до готової упаковки. Продукція відзначається високою якістю, натуральністю та користю для організму.
            </div>

            <div ref={containerRef}>
                <ProductList addToCart={addToCart} products={currentProducts} noTitle />
            </div>

            {/* динамическая пагинация */}
            {totalPages > 1 && (
                <div className="pagination">
                    <button
                        className="prev"
                        disabled={currentPage === 1}
                        onClick={() => handlePageChange(currentPage - 1)}
                    >
                        &#8592;
                    </button>

                    {renderPageNumbers()}

                    <button
                        className="next"
                        disabled={currentPage === totalPages}
                        onClick={() => handlePageChange(currentPage + 1)}
                    >
                        &#8594;
                    </button>
                </div>
            )}

            <Footer />
        </div>
    );
}
