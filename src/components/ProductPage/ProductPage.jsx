import React, { useState, useRef, useEffect } from "react";
import "./ProductPage.css";
import Footer from "../../components/Footer/Footer";
import ProductList from "../ProductList/ProductList";
import antivrin1 from "../../assets/antivrin1.png";
import antivrin2 from "../../assets/antivrin2.png";
import product3Img from "../../assets/product3.png";
import product4Img from "../../assets/product4.png";
import star from "../../assets/star.png";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import usePageTitle from "../../hooks/usePageTitle";

function ProductPage({ addToCart }) {
    const product = {
        id: 1,
        code: "A10",
        title: "Антивирін",
        subtitle: "Мурашине дерево",
        description:
            "Це природний противірусний засіб, який виробляється компанією “Рослина Карпат”. Цей препарат має широкий спектр дії проти різних вірусів...",
        price: 1290,
        images: [antivrin1, antivrin2],
    };

    usePageTitle(product.title);

    const [quantity, setQuantity] = useState(1);
    const [selectedImage, setSelectedImage] = useState(product.images[0]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isComplexModalOpen, setIsComplexModalOpen] = useState(false);

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

    useEffect(() => {
        if (isComplexModalOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }

        return () => {
            document.body.style.overflow = "";
        };
    }, [isComplexModalOpen]);


    const handleAddToCart = () => {
        addToCart({
            id: product.id,
            code: product.code,
            name: product.title,
            title: product.title,
            price: product.price,
            image: product.images[0],
            quantity,
        });
    };

    const [isBeginning, setIsBeginning] = useState(true);
    const [isEnd, setIsEnd] = useState(false);
    const [activeTab, setActiveTab] = useState("description");

    return (
        <>
            <section className="product-page">
                <div className="product-page__container">

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


                    <div className="product-page__details">
                        <h1 className="product-page__title">{product.title}</h1>
                        <h3 className="product-page__subtitle">{product.subtitle}</h3>
                        <p className="product-page__code">
                            Код товару: <span>{product.code}</span>
                        </p>


                        <div className="product-tabs">
                            <div className="product-tabs__buttons">
                                <button
                                    className={`product-tabs__btn ${activeTab === "description" ? "active" : ""}`}
                                    onClick={() => setActiveTab("description")}
                                >
                                    Опис
                                </button>
                                <button
                                    className={`product-tabs__btn ${activeTab === "usage" ? "active" : ""}`}
                                    onClick={() => setActiveTab("usage")}
                                >
                                    Застосування
                                </button>
                                <button
                                    className={`product-tabs__btn ${activeTab === "composition" ? "active" : ""}`}
                                    onClick={() => setActiveTab("composition")}
                                >
                                    Склад
                                </button>


                                <button
                                    className="product-tabs__btn"
                                    onClick={() => setIsComplexModalOpen(true)}
                                >
                                    Комплекси
                                </button>
                            </div>

                            <div className="product-tabs__content">
                                {activeTab === "description" && (
                                    <div className="product-tabs__text">
                                        <p>Призначення: при гострих та хронічних захворюваннях дихальних шляхів: грип, ГРЗ, ГРВІ.</p>
                                        <p>Категорія: допомога при застуді.</p>
                                        <p>Тип застосування: за рекомендацією лікаря або в складі комплексних програм оздоровлення.</p>
                                        <p>Активні компоненти: шоломниця байкальська, бархат амурський, таволга, елеутерокок колючий.</p>
                                        <p>Форма випуску: 60 таблеток по 500 мг.</p>
                                        <p>Пакування: картонна коробка, блістер.</p>
                                        <p>Класифікація: біологічно активна добавка.</p>
                                        <p>Умови зберігання: зберігати в сухому, захищеному від світла та дітей місці, при температурі від 5°С до 25°С.</p>
                                        <p>Країна виробника: Україна.</p>
                                        <p>Строк придатності: 36 місяців.</p>
                                    </div>
                                )}
                                {activeTab === "usage" && (
                                    <div className="product-tabs__text">
                                        <p><strong>Рекомендації щодо застосування:</strong> грип, ГРЗ, ГРВІ; герпес; ангіна; гепатит.</p>
                                        <p><strong>Дозування:</strong> 2 таблетки 2-3 рази на день за 30 хв до їжі, курс 10–30 днів.</p>
                                        <p><strong>Не є лікарським засобом.</strong></p>
                                    </div>
                                )}
                                {activeTab === "composition" && (
                                    <div className="product-tabs__text">
                                        <p><strong>Склад:</strong> шоломниця байкальська, бархат амурський, кора мурашиного дерева, таволга, елеутерокок.</p>
                                    </div>
                                )}
                            </div>
                        </div>

                        <p className="product-page__price">{product.price} грн</p>

                        <div className="product-page__quantity">
                            <span>ШТ</span>
                            <div className="product-page__qty-box">
                                <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="product-page__qty-btn">–</button>
                                <span className="product-page__qty-value">{quantity}</span>
                                <button onClick={() => setQuantity(quantity + 1)} className="product-page__qty-btn">+</button>
                            </div>
                        </div>

                        <button className="product-page__button" onClick={handleAddToCart}>
                            Додати до кошика
                        </button>
                    </div>
                </div>

                {/* --- Модалка Комплекси --- */}


                {isComplexModalOpen && (


                    <div className="product-page__modal" onClick={() => setIsComplexModalOpen(false)}>
                        <div
                            className="product-page__modal-content"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <button
                                className="product-page__modal-close"
                                onClick={() => setIsComplexModalOpen(false)}
                            >
                                ✕
                            </button>
                            <h2>Повна програма очищення організму</h2>

                            <p>
                                Комплекс з 5 натуральних засобів, які працюють разом, щоб глибоко очистити організм,
                                зняти навантаження з печінки, лімфи та позбутись паразитів, токсинів і грибків.
                                Ідеально підходить 1–2 рази на рік для профілактики та покращення самопочуття.
                            </p>

                            <hr />

                            <h3>1. Гельмітозин</h3>
                            <p><strong>Вартість:</strong> 270 грн × 2 = 540 грн</p>
                            <ul>
                                <li>ефективно бореться з гельмінтами (глистами) та найпростішими паразитами;</li>
                                <li>усуває яйця та личинки паразитів;</li>
                                <li>знімає симптоми інтоксикації (головний біль, свербіж, проблеми з травленням);</li>
                                <li>діє м’яко, без хімічного навантаження на печінку.</li>
                            </ul>
                            <p>Паразити — часта, але невидима причина слабкості, алергій, поганого імунітету, навіть зайвої ваги.</p>

                            <hr />

                            <h3>2. Гепатовіт</h3>
                            <p><strong>Вартість:</strong> 285 грн × 2 = 570 грн</p>
                            <ul>
                                <li>допомагає печінці швидше виводити токсини;</li>
                                <li>знижує запалення та покращує роботу жовчного;</li>
                                <li>містить натуральні компоненти;</li>
                                <li>важливий під час і після антипаразитарного етапу, бо печінка приймає на себе весь удар.</li>
                            </ul>
                            <p>Якщо не підтримати печінку, токсини можуть повертатися в кров і викликати втому та головний біль.</p>

                            <hr />

                            <h3>3. Мікобен 1</h3>
                            <p><strong>Вартість:</strong> 425 грн</p>
                            <ul>
                                <li>виводить залишки токсинів, які лишають після себе паразити;</li>
                                <li>очищує кишківник, покращує мікрофлору;</li>
                                <li>підвищує імунітет;</li>
                                <li>допомагає організму відновитись і увійти в баланс.</li>
                            </ul>
                            <p>Це як завершальний етап, який закріплює результат і запускає оздоровлення.</p>

                            <hr />

                            <h3>4. Фунгіцин</h3>
                            <p><strong>Вартість:</strong> 330 грн × 2 = 660 грн</p>
                            <ul>
                                <li>знищує грибки (в т.ч. кандида) всередині організму;</li>
                                <li>зменшує здуття, тягу до солодкого та дріжджового;</li>
                                <li>бореться з грибками, які часто активуються після паразитів;</li>
                                <li>очищує шкіру (акне, екзема, свербіж — можуть бути грибковими проявами).</li>
                            </ul>
                            <p>Грибки часто живуть у симбіозі з паразитами — тому важливо позбутися обох.</p>

                            <hr />

                            <h3>5. Лімфорен</h3>
                            <p><strong>Вартість:</strong> 295 грн × 2 = 590 грн</p>
                            <ul>
                                <li>покращує виведення шлаків і токсинів через лімфу;</li>
                                <li>зменшує набряки;</li>
                                <li>допомагає при втомі, запаленнях, висипаннях;</li>
                                <li>стимулює обмін речовин та імунну відповідь.</li>
                            </ul>
                            <p>Лімфа — як “каналізація” організму. Якщо її не прочистити — токсини можуть циркулювати роками.</p>

                            <hr />

                            <h3>Підсумок</h3>
                            <ul>
                                <li>борються з паразитами, грибками, токсинами;</li>
                                <li>очищують лімфу та кишківник;</li>
                                <li>підтримують печінку;</li>
                                <li>відновлюють баланс імунітету.</li>
                            </ul>

                            <p><strong>Повний курс:</strong> 2785 грн</p>
                            <p><strong>Тривалість:</strong> приблизно 1 місяць</p>

                            <hr />

                            <h3>Після проходження очищення:</h3>
                            <ul>
                                <li>зменшується вага;</li>
                                <li>зникає втома;</li>
                                <li>покращується сон і травлення;</li>
                                <li>очищується шкіра;</li>
                                <li>зменшується набряклість;</li>
                                <li>з’являється легкість у тілі і ясність у голові.</li>
                            </ul>
                        </div>
                    </div>
                )}


                {/* Модалка для фото */}
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

                    <div className="recommendations__slider-wrapper">
                        <div className={`custom-swiper-button custom-prev ${isBeginning ? "disabled" : ""}`}>❮</div>
                        <div className={`custom-swiper-button custom-next ${isEnd ? "disabled" : ""}`}>❯</div>

                        <Swiper
                            modules={[Navigation, Pagination]}
                            spaceBetween={30}
                            slidesPerView={3}
                            navigation={{
                                prevEl: ".custom-prev",
                                nextEl: ".custom-next",
                            }}
                            pagination={{ clickable: true }}
                            onInit={(swiper) => {
                                setIsBeginning(swiper.isBeginning);
                                setIsEnd(swiper.isEnd);
                            }}
                            onSlideChange={(swiper) => {
                                setIsBeginning(swiper.isBeginning);
                                setIsEnd(swiper.isEnd);
                            }}
                            breakpoints={{
                                0: { slidesPerView: 1 },
                                600: { slidesPerView: 2 },
                                1024: { slidesPerView: 3 },
                            }}
                            className="recommendations__slider"
                        >
                            {[
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
                            ].map((product) => (
                                <SwiperSlide key={product.id}>
                                    <ProductList
                                        addToCart={addToCart}
                                        isLoggedIn={true}
                                        noTitle={true}
                                        products={[product]}
                                    />
                                </SwiperSlide>
                            ))}
                        </Swiper>
                        <div className="custom-pagination"></div>
                    </div>
                </div>
            </section>

            <Footer />
        </>
    );
}

export default ProductPage;
