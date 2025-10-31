import React, { useEffect, useState } from "react";
import "./PurchasesPage.css";
import Footer from "../../components/Footer/Footer";
import usePageTitle from "../../hooks/usePageTitle";

const PurchasesPage = () => {
    usePageTitle("Мої покупки");

    const [orders, setOrders] = useState([]);

    useEffect(() => {
        // Загрузка заказов из localStorage
        const storedOrders = JSON.parse(localStorage.getItem("orders")) || [];
        setOrders(storedOrders);
    }, []);

    //  Цвет для статусов
    const getStatusColor = (status) => {
        switch (status) {
            case "Сплачено":
                return "green";
            case "Очікується":
                return "orange";
            case "Скасовано":
                return "red";
            default:
                return "gray";
        }
    };

    return (
        <>
            <div className="purchases-page">
                <div className="purchases-container">
                    <h2 className="purchases-title">Мої покупки</h2>

                    {orders.length === 0 ? (
                        <div className="purchases-empty">
                            <p>У вас ще немає покупок.</p>
                            <a href="/catalog" className="btn-to-catalog">
                                Перейти до каталогу
                            </a>
                        </div>
                    ) : (
                        <table className="purchases-table">
                            <thead>
                                <tr>
                                    <th>№</th>
                                    <th>Зображення</th>
                                    <th>Назва товару</th>
                                    <th>Дата</th>
                                    <th>Сума</th>
                                    <th>Статус</th>
                                </tr>
                            </thead>
                            <tbody>
                                {orders.map((order) => (
                                    <tr key={order.id}>
                                        <td>#{order.id}</td>
                                        <td>
                                            <div className="product-img-box">
                                                <img src={order.image} alt={order.name} />
                                            </div>
                                        </td>
                                        <td>{order.name}</td>
                                        <td>{order.date}</td>
                                        <td>{order.amount} ₴</td>
                                        <td>
                                            <div className="status">
                                                <span
                                                    className="status-dot"
                                                    style={{
                                                        background: getStatusColor(order.status),
                                                    }}
                                                ></span>
                                                {order.status}
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>

            <Footer />
        </>
    );
};

export default PurchasesPage;
