import React, { useEffect } from "react";
import "./FailPage.css";
import { useNavigate } from "react-router-dom";
import { FaTimesCircle } from "react-icons/fa";
import Footer from "../../components/Footer/Footer";

const FailPage = () => {
    const navigate = useNavigate();
    const paymentType = localStorage.getItem("paymentType");
    const isOnline = paymentType === "online";


    useEffect(() => {
        const orders = JSON.parse(localStorage.getItem("orders")) || [];
        if (orders.length > 0 && orders[0].status !== "Скасовано") {
            orders[0].status = "Скасовано";
            localStorage.setItem("orders", JSON.stringify(orders));
        }
    }, []);

    return (
        <>
            <section className="fail">
                <FaTimesCircle className="fail__icon" />
                <div className="fail__box">
                    <h2>Щось пішло не так 😔</h2>
                    <p>
                        {isOnline
                            ? "Не вдалося провести оплату через LiqPay. Будь ласка, спробуйте ще раз або оберіть накладений платіж."
                            : "Помилка при оформленні замовлення. Перевірте дані або спробуйте ще раз."}
                    </p>
                    <button
                        onClick={() => navigate(isOnline ? "/delivery" : "/catalog")}
                        className="fail__btn"
                    >
                        {isOnline ? "Спробувати ще раз" : "Повернутися до каталогу"}
                    </button>
                </div>
            </section>

            <Footer />
        </>
    );
};

export default FailPage;
