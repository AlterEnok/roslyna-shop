import React, { useState, useEffect } from "react";
import "./CheckoutPage.css";
import { useCart } from "../../context/useCart";
import { useNavigate } from "react-router-dom";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import usePageTitle from "../../hooks/usePageTitle";
import Footer from "../../components/Footer/Footer";

function CheckoutPage() {
    usePageTitle("Оформлення замовлення");

    const { cartItems, incrementItem, decrementItem, removeFromCart } = useCart();
    const navigate = useNavigate();

    const [formData, setFormData] = useState(() => {
        const saved = localStorage.getItem("checkoutForm");
        return saved
            ? JSON.parse(saved)
            : { name: "", phone: "", email: "" };
    });

    useEffect(() => {
        localStorage.setItem("checkoutForm", JSON.stringify(formData));
    }, [formData]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handlePhoneChange = (value) => {
        setFormData({ ...formData, phone: value });
    };

    const totalPrice = cartItems.reduce(
        (sum, item) => sum + (item.price || 1450) * item.quantity,
        0
    );

    const handleSubmit = (e) => {
        e.preventDefault();
        if (cartItems.length === 0) {
            alert("Ваш кошик порожній!");
            return;
        }

        console.log("Дані замовлення:", formData);
        localStorage.setItem("checkoutForm", JSON.stringify(formData));
        navigate("/delivery");
    };

    return (
        <>
            <section className="checkout">
                <div className="checkout__container">

                    <div className="checkout__cart">
                        <div className="checkout__table-header">
                            <span>Код продукту</span>
                            <span>Назва</span>
                            <span>Кількість</span>
                            <span>Сума</span>
                            <span>Дія</span>
                        </div>

                        {cartItems.length === 0 ? (
                            <div className="checkout__empty">
                                <p>Ваш кошик порожній</p>
                            </div>
                        ) : (
                            cartItems.map((item) => (
                                <div className="checkout__item" key={item.id}>
                                    <div className="checkout__code">{item.code || "—"}</div>

                                    <div className="checkout__info">
                                        <img
                                            src={item.image || "/placeholder.png"}
                                            alt={item.title || item.name}
                                        />
                                        <span className="checkout__name">
                                            {item.title || item.name}
                                        </span>
                                    </div>

                                    <div className="checkout__quantity">
                                        <div className="checkout__quantity-box">
                                            <button onClick={() => decrementItem(item.id)}>-</button>
                                            <span>{item.quantity}</span>
                                            <button onClick={() => incrementItem(item.id)}>+</button>
                                        </div>
                                    </div>

                                    <div className="checkout__total">
                                        {item.price * item.quantity} ₴
                                    </div>

                                    <div className="checkout__action">
                                        <button
                                            className="remove-btn"
                                            onClick={() => removeFromCart(item.id)}
                                            aria-label="Видалити товар"
                                        >
                                            <svg
                                                width="18"
                                                height="18"
                                                fill="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path d="M9 3v1H4v2h16V4h-5V3H9zm1 5v10h2V8h-2zm4 0v10h2V8h-2zM6 8v12h12V8H6z" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>


                    <div className="checkout__summary">
                        <h2>Оформлення замовлення</h2>

                        <form className="checkout__form" onSubmit={handleSubmit}>
                            <input
                                type="text"
                                name="name"
                                placeholder="Введіть ваше ім'я"
                                value={formData.name}
                                onChange={handleChange}
                                required
                            />


                            <div className="checkout__phone-wrapper">
                                <PhoneInput
                                    country={"ua"}
                                    value={formData.phone}
                                    onChange={handlePhoneChange}
                                    inputProps={{
                                        name: "phone",
                                        required: true,
                                    }}
                                    containerClass="phone-container"
                                    inputClass="phone-input"
                                    buttonClass="phone-flag"
                                />
                            </div>

                            <input
                                type="email"
                                name="email"
                                placeholder="Введіть ваш email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />

                            <textarea
                                name="feedback"
                                placeholder="Залиште відгук (за бажанням)"
                                value={formData.feedback || ""}
                                onChange={handleChange}
                                className="checkout__textarea"
                            />

                            <div className="checkout__total-wrapper">
                                <p>Всього до сплати:</p>
                                <h3>{totalPrice} ₴</h3>
                            </div>

                            <button type="submit" className="checkout__button">
                                Продовжити
                            </button>
                        </form>

                        <p className="checkout__note">
                            Натисніть «Продовжити», щоб перейти до вибору способу оплати.
                        </p>
                    </div>
                </div>
            </section>


            <Footer />
        </>
    );
}

export default CheckoutPage;
