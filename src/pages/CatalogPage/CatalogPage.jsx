import React, { useState, useEffect } from 'react';
import { FaSearch, FaTimes } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { Helmet } from "react-helmet-async";
import ProductList from '../../components/ProductList/ProductList';
import Footer from '../../components/Footer/Footer';
import heroImg from '../../assets/catalog-hero.jpg';
import './CatalogPage.css';
import usePageTitle from "../../hooks/usePageTitle";
import gsap from 'gsap';

import product1Img from '../../assets/product1.png';
import product2Img from '../../assets/product2.png';
import product3Img from '../../assets/product3.png';
import product4Img from '../../assets/product4.png';

const allProducts = [
    { id: 1, title: "Рослина карпат: 6 в одному", subtitle: "Евкаліпт, чорний горіх, пижма, розторопша", category: "Herbal", price: 2490, image: product1Img },
    { id: 2, title: "L-Карнітин PRO", subtitle: "Підтримка імунітету та енергії", category: "Herbal-complex", price: 2690, image: product2Img },
    { id: 3, title: "Журавлина СИРОП", subtitle: "Підтримка імунітету та здоров’я", category: "Herbal-syrups", price: 2590, image: product3Img },
    { id: 4, title: "Антивірин Муршине дерево", subtitle: "Підтримка імунітету та здоров’я", category: "Cosmetic balms", price: 2590, image: product4Img },
];

const categories = [
    { value: "all", label: "Усе" },
    { value: "Herbal", label: "Фіто препарати " },
    { value: "Herbal-complex", label: "Фіто комплекси " },
    { value: "Herbal-candless", label: "Фіто свічки " },
    { value: "Herbal-syrups", label: "Фіто сиропи" },
    { value: "Natural antiseptics", label: "Природні антисептики" },
    { value: "Cosmetic balms", label: "Косметичні бальзами" }
];

export default function CatalogPage({ addToCart }) {
    usePageTitle("Каталог");
    const navigate = useNavigate();

    const [filter, setFilter] = useState("all");
    const [currentPage, setCurrentPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [showModal, setShowModal] = useState(false);

    const itemsPerPage = 4;

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
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    useEffect(() => {
        if (searchQuery.trim() === "") {
            setSearchResults([]);
            return;
        }
        const results = allProducts.filter(p =>
            p.title.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setSearchResults(results);
    }, [searchQuery]);

    useEffect(() => {
        if (showModal) {
            gsap.fromTo(".search-modal", { opacity: 0, y: -40 }, { opacity: 1, y: 0, duration: 0.3 });
        }
    }, [showModal]);

    useEffect(() => {
        document.body.style.overflow = showModal ? "hidden" : "auto";
        return () => (document.body.style.overflow = "auto");
    }, [showModal]);

    return (
        <div className="catalog-page">
            {/* SEO */}
            <Helmet>
                <title>Каталог — Рослина Карпат | Натуральні фіто товари</title>
                <meta
                    name="description"
                    content="Перегляньте каталог натуральних фіто препаратів, сиропів, бальзамів і засобів для здоров’я від 'Рослина Карпат'. Висока якість і користь природи в кожному продукті."
                />
                <meta
                    name="keywords"
                    content="каталог, фіто препарати, натуральна продукція, трави Карпат, бальзами, сиропи, натуральні засоби"
                />
            </Helmet>

            <section
                className="catalog-hero"
                style={{ backgroundImage: `url(${heroImg})` }}
            >
                <div className="catalog-hero__overlay">
                    <h1 className="catalog-title">Каталог</h1>

                    <div className="catalog-search">
                        <button className="search-btn" onClick={() => setShowModal(true)}>
                            <FaSearch className="search-icon" />
                            <span>Пошук</span>
                        </button>
                    </div>

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
                У магазині представлена натуральна продукція для здоров’я та краси, виготовлена з екологічно чистої сировини Карпат.
                Усі товари створюються на основі лікарських рослин, зібраних у високогір’ї, з дотриманням замкнутого циклу виробництва.
            </div>

            <ProductList addToCart={addToCart} products={currentProducts} noTitle />

            {totalPages > 1 && (
                <div className="pagination">
                    <button
                        className="prev"
                        disabled={currentPage === 1}
                        onClick={() => setCurrentPage(currentPage - 1)}
                    >
                        &#8592;
                    </button>

                    {(() => {
                        const pages = [];
                        const maxVisible = 3;
                        const showLeftDots = currentPage > maxVisible;
                        const showRightDots = currentPage < totalPages - maxVisible + 1;

                        pages.push(
                            <button
                                key={1}
                                className={currentPage === 1 ? "active" : ""}
                                onClick={() => setCurrentPage(1)}
                            >
                                1
                            </button>
                        );

                        if (showLeftDots)
                            pages.push(<span key="dots-left" className="dots">…</span>);

                        const start = Math.max(2, currentPage - 1);
                        const end = Math.min(totalPages - 1, currentPage + 1);

                        for (let i = start; i <= end; i++) {
                            pages.push(
                                <button
                                    key={i}
                                    className={currentPage === i ? "active" : ""}
                                    onClick={() => setCurrentPage(i)}
                                >
                                    {i}
                                </button>
                            );
                        }

                        if (showRightDots)
                            pages.push(<span key="dots-right" className="dots">…</span>);

                        if (totalPages > 1)
                            pages.push(
                                <button
                                    key={totalPages}
                                    className={currentPage === totalPages ? "active" : ""}
                                    onClick={() => setCurrentPage(totalPages)}
                                >
                                    {totalPages}
                                </button>
                            );

                        return pages;
                    })()}

                    <button
                        className="next"
                        disabled={currentPage === totalPages}
                        onClick={() => setCurrentPage(currentPage + 1)}
                    >
                        &#8594;
                    </button>
                </div>
            )}

            <Footer />

            {showModal && (
                <div className="modal-overlay" onClick={() => setShowModal(false)}>
                    <div className="search-modal" onClick={(e) => e.stopPropagation()}>
                        <button className="close-modal" onClick={() => setShowModal(false)}>
                            <FaTimes />
                        </button>
                        <h2>Пошук товарів</h2>
                        <input
                            type="text"
                            placeholder="Введіть назву продукту..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />

                        {searchResults.length > 0 ? (
                            <div className="search-modal__results">
                                {searchResults.map(p => (
                                    <div
                                        key={p.id}
                                        className="search-modal__item"
                                        onClick={() => navigate(`/product/${p.id}`)}
                                    >
                                        <img src={p.image} alt={p.title} />
                                        <div>
                                            <p className="item-title">{p.title}</p>
                                            <p className="item-price">{p.price} грн</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : searchQuery ? (
                            <p className="no-results">Нічого не знайдено</p>
                        ) : null}
                    </div>
                </div>
            )}
        </div>
    );
}
