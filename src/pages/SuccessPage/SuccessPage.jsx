import React from "react";
import "./SuccessPage.css";
import { useNavigate } from "react-router-dom";
import { FaCheckCircle } from "react-icons/fa";
import Footer from "../../components/Footer/Footer";

const SuccessPage = () => {
    const navigate = useNavigate();
    const deliveryData = JSON.parse(localStorage.getItem("deliveryData"));
    const orders = JSON.parse(localStorage.getItem("orders")) || [];
    const paymentType = localStorage.getItem("paymentType");
    const lastOrder = orders[0];

    const text =
        paymentType === "online"
            ? "Ваш платіж через LiqPay пройшов успішно 🎉"
            : "Ваше замовлення оформлено! Оплата при отриманні.";

    return (
        <>
            <section className="success">
                <FaCheckCircle className="success__icon" />
                <div className="success__box">
                    <h2>Дякуємо за замовлення!</h2>
                    <p>{text}</p>
                    <p>
                        Номер замовлення: <strong>№{lastOrder?.id || "—"}</strong>
                    </p>
                    <p>
                        Адреса доставки:
                        <br />
                        <strong>
                            Місто: {deliveryData?.city} <br />
                            Вулиця: {deliveryData?.street} <br />
                            Будинок: {deliveryData?.house} <br />
                            {deliveryData?.branch ? (
                                <>Відділення: {deliveryData.branch}</>
                            ) : deliveryData?.postalCode ? (
                                <>Поштовий індекс: {deliveryData.postalCode}</>
                            ) : null}
                        </strong>
                    </p>


                    <button
                        onClick={() => navigate("/catalog")}
                        className="success__btn"
                    >
                        Повернутися до каталогу
                    </button>
                </div>
            </section>

            <Footer />
        </>
    );
};

export default SuccessPage;
