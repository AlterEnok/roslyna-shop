import React, { useEffect, useState } from "react";
import "./PurchasesPage.css";
import Footer from "../../components/Footer/Footer";
import usePageTitle from "../../hooks/usePageTitle";
import { Helmet } from "react-helmet-async";

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

            <Helmet>
                <title>Мої покупки | Рослина Карпат</title>
                <meta
                    name="description"
                    content="Перегляньте історію своїх замовлень у Рослина Карпат. Тут ви можете бачити статуси, дати та суми своїх покупок."
                />
                <meta
                    name="keywords"
                    content="мої покупки, історія замовлень, покупки Рослина, Рослина Карпат, замовлення, статус замовлення"
                />
                <meta property="og:title" content="Мої покупки | Roslyna Shop" />
                <meta
                    property="og:description"
                    content="Перегляньте всі ваші попередні замовлення в Рослина Карпат — зручно, швидко та прозоро."
                />
                <meta property="og:type" content="website" />


                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content="Мої покупки | Рослина Карпат" />
                <meta
                    name="twitter:description"
                    content="Перегляньте історію своїх покупок у Рослина Карпат."
                />

            </Helmet>
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
