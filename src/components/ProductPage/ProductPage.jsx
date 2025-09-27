// ProductPage.jsx
import React, { useState, useRef, useEffect } from "react";
import "./ProductPage.css";
import Footer from '../../components/Footer/Footer';
import ProductList from "../ProductList/ProductList";
import antivrin1 from "../../assets/antivrin1.png";
import antivrin2 from "../../assets/antivrin2.png";
import product3Img from "../../assets/product3.png";
import product4Img from "../../assets/product4.png";
import star from "../../assets/star.png";

function ProductPage({ addToCart }) {
    const product = {
        id: 1,
        title: "Антивирін",
        subtitle: "Мурашине дерево",
        description:
            "Це природний противірусний засіб, який виробляється компанією “Рослина Карпат”. Цей препарат має широкий спектр дії проти різних вірусів...",
        price: 1290,
        images: [antivrin1, antivrin2],
    };

    const [quantity, setQuantity] = useState(1);
    const [selectedImage, setSelectedImage] = useState(product.images[0]);
    const [isModalOpen, setIsModalOpen] = useState(false);

    // --- Відгуки ---
    const [reviews, setReviews] = useState([
        { id: 1, user: "Валерій Альбертович", text: "Користуюсь вже вдруге — волосся стало живим...", date: "20.09.2025" },
        { id: 2, user: "Оксана", text: "Замовила вперше, приємно здивована швидкою доставкою...", date: "22.09.2025" },
    ]);

    const [newReview, setNewReview] = useState("");
    const [lastReviewTime, setLastReviewTime] = useState(0);
    const [error, setError] = useState("");
    const listRef = useRef(null);

    const handleAddReview = (e) => {
        e.preventDefault();
        setError("");

        const now = Date.now();

        if (newReview.trim().length < 5) {
            setError("Відгук занадто короткий (мінімум 5 символів).");
            return;
        }
        if (newReview.trim().length > 500) {
            setError("Відгук занадто довгий (максимум 500 символів).");
            return;
        }

        if (now - lastReviewTime < 30000) {
            setError("Можна залишати відгуки не частіше ніж раз на 30 секунд.");
            return;
        }

        const newEntry = {
            id: Date.now(),
            user: "Ваше ім’я (із акаунта)",
            text: newReview,
            date: new Date().toLocaleDateString(),
        };

        setReviews([...reviews, newEntry]);
        setNewReview("");
        setLastReviewTime(now);
    };

    useEffect(() => {
        if (listRef.current) {
            listRef.current.scrollTop = listRef.current.scrollHeight;
        }
    }, [reviews]);

    const handleAddToCart = () => {
        addToCart({
            id: product.id,
            title: product.title,
            price: product.price,
            image: product.images[0],
            quantity,
        });
    };

    return (
        <>
            <section className="product-page">
                <div className="product-page__container">
                    {/* Галерея */}
                    <div className="product-page__gallery">
                        <img
                            src={selectedImage}
                            alt={product.title}
                            className="product-page__main-image"
                            onClick={() => setIsModalOpen(true)}
                        />
                        <div className="product-page__thumbnails">
                            {product.images.map((img, idx) => (
                                <img
                                    key={idx}
                                    src={img}
                                    alt={`${product.title} ${idx + 1}`}
                                    className={`product-page__thumbnail ${selectedImage === img ? "active" : ""}`}
                                    onClick={() => setSelectedImage(img)}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Деталі */}
                    <div className="product-page__details">
                        <h1 className="product-page__title">{product.title}</h1>
                        <h3 className="product-page__subtitle">{product.subtitle}</h3>
                        <p className="product-page__description">{product.description}</p>
                        <p className="product-page__price">{product.price} грн</p>

                        <div className="product-page__quantity">
                            <span>ШТ</span>
                            <div className="product-page__qty-box">
                                <button
                                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                    className="product-page__qty-btn"
                                >
                                    –
                                </button>
                                <span className="product-page__qty-value">{quantity}</span>
                                <button
                                    onClick={() => setQuantity(quantity + 1)}
                                    className="product-page__qty-btn"
                                >
                                    +
                                </button>
                            </div>
                        </div>

                        <button className="product-page__button" onClick={handleAddToCart}>
                            Додати до кошика
                        </button>
                    </div>
                </div>

                {/* Модалка */}
                {isModalOpen && (
                    <div className="product-page__modal" onClick={() => setIsModalOpen(false)}>
                        <img src={selectedImage} alt="fullscreen" className="product-page__modal-image" />
                    </div>
                )}

                {/* --- Відгуки --- */}
                <div className="reviews">
                    <div className="reviews__marquee">
                        <div className="reviews__marquee__track">
                            Відгуки <img src={star} alt="*" /> Відгуки <img src={star} alt="*" /> Відгуки
                            <img src={star} alt="*" /> Відгуки <img src={star} alt="*" /> Відгуки
                            <img src={star} alt="*" /> Відгуки <img src={star} alt="*" />
                        </div>
                    </div>

                    <form onSubmit={handleAddReview} className="reviews__form">
                        <textarea
                            value={newReview}
                            onChange={(e) => setNewReview(e.target.value)}
                            placeholder="Введіть відгук який побачать всі"
                            className="reviews__textarea"
                        />
                        <button type="submit">➤</button>
                    </form>
                    {error && <p className="reviews__error">{error}</p>}

                    <div className="reviews__list" ref={listRef}>
                        {reviews.map((review) => (
                            <div key={review.id} className="reviews__card">
                                <strong>{review.user}</strong>
                                <p>{review.text}</p>
                                <span className="reviews__date">{review.date}</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="recommendations">
                    <h2 className="recommendations__title">Перегляньте наші рекомендації</h2>
                    <ProductList
                        addToCart={addToCart}
                        isLoggedIn={true}
                        noTitle={true}
                        products={[
                            {
                                id: 101,
                                title: "Антивирін Форте",
                                subtitle: "Посилена формула",
                                price: 1490,
                                image: antivrin1,
                            },
                            {
                                id: 102,
                                title: "ІмуноТаб",
                                subtitle: "Підтримка імунітету",
                                price: 1790,
                                image: antivrin1,
                            },
                            {
                                id: 103,
                                title: "Фітотаб Обліпиха",
                                subtitle: "Вітамінний комплекс",
                                price: 1990,
                                image: product3Img,
                            },
                            {
                                id: 104,
                                title: "Карпатський бальзам",
                                subtitle: "Відновлення та енергія",
                                price: 1890,
                                image: product4Img,
                            },
                        ]}
                    />
                </div>
            </section>

            {/* 🔥 Футер на всю ширину */}
            <Footer />
        </>
    );
}

export default ProductPage;
