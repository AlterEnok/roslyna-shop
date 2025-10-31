import React, { useState, useEffect } from "react";
import "./DeliveryPaymentPage.css";
import { useCart } from "../../context/useCart";
import { useNavigate } from "react-router-dom";
import Footer from "../../components/Footer/Footer";
import usePageTitle from "../../hooks/usePageTitle";

import novaPoshta from "../../assets/nova-poshta.png";
import ukrPoshta from "../../assets/ukrposhta.png";


const NOVA_API_KEY = "f17ca2b162dae71305f782cddd7d71ce";

function DeliveryPaymentPage() {
    usePageTitle("Доставка та оплата");

    const navigate = useNavigate();
    const { cartItems, clearCart } = useCart();

    const [paymentMethod, setPaymentMethod] = useState("online");
    const [deliveryService, setDeliveryService] = useState("nova");
    const [cities, setCities] = useState([]);
    const [branches, setBranches] = useState([]);
    const [citySearch, setCitySearch] = useState("");
    const [showCityDropdown, setShowCityDropdown] = useState(false);

    const [form, setForm] = useState({
        city: "",
        cityRef: "",
        street: "",
        house: "",
        branch: "",
    });

    //  Поиск городов в НП
    useEffect(() => {
        const fetchCities = async () => {
            if (deliveryService !== "nova" || citySearch.trim().length < 2) {
                setCities([]);
                return;
            }

            try {
                const res = await fetch("https://api.novaposhta.ua/v2.0/json/", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        apiKey: NOVA_API_KEY,
                        modelName: "Address",
                        calledMethod: "getCities",
                        methodProperties: { FindByString: citySearch, Limit: 50 },
                    }),
                });

                const data = await res.json();
                if (data.success) setCities(data.data);
            } catch (err) {
                console.error("Помилка пошуку міст:", err);
            }
        };

        const delay = setTimeout(fetchCities, 400);
        return () => clearTimeout(delay);
    }, [citySearch, deliveryService]);

    // Загрузка отделений
    useEffect(() => {
        if (deliveryService !== "nova" || !form.cityRef) return;

        fetch("https://api.novaposhta.ua/v2.0/json/", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                apiKey: NOVA_API_KEY,
                modelName: "AddressGeneral",
                calledMethod: "getWarehouses",
                methodProperties: { CityRef: form.cityRef },
            }),
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.success) setBranches(data.data);
            })
            .catch((err) => console.error("Помилка відділень:", err));
    }, [form.cityRef, deliveryService]);

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const totalPrice = cartItems.reduce(
        (sum, item) => sum + (item.price || 0) * item.quantity,
        0
    );

    // Форма
    const handleSubmit = (e) => {
        e.preventDefault();

        if (!form.city || (!form.branch && deliveryService === "nova")) {
            alert("Будь ласка, заповніть усі поля доставки!");
            return;
        }

        localStorage.setItem("paymentType", paymentMethod);

        const productNames = cartItems.map((i) => i.name).filter(Boolean);
        const mainName = productNames[0] || "Товар";
        const nameSummary =
            cartItems.length > 1
                ? `${mainName} + ${cartItems.length - 1} ін.`
                : mainName;

        const newOrder = {
            id: Math.floor(1000 + Math.random() * 9000),
            name: nameSummary,
            image: cartItems[0]?.image || "/default.png",
            date: new Date().toLocaleDateString("uk-UA"),
            amount: totalPrice,
            status: paymentMethod === "online" ? "Сплачено" : "Очікується",
        };

        const existingOrders = JSON.parse(localStorage.getItem("orders")) || [];
        existingOrders.unshift(newOrder);
        localStorage.setItem("orders", JSON.stringify(existingOrders));
        localStorage.setItem("deliveryData", JSON.stringify(form));

        clearCart?.();
        navigate("/success");
    };

    return (
        <>
            <section className="delivery">
                <div className="delivery__wrapper">
                    <div className="delivery__card">
                        <h2 className="delivery__title">Доставка та оплата</h2>

                        <form onSubmit={handleSubmit} className="delivery__form">

                            <div className="delivery__section">
                                <h3>Спосіб оплати</h3>
                                <div className="delivery__options">
                                    <label>
                                        <input
                                            type="radio"
                                            name="payment"
                                            value="online"
                                            checked={paymentMethod === "online"}
                                            onChange={() => setPaymentMethod("online")}
                                        />
                                        Оплата онлайн (LiqPay)
                                    </label>
                                    <label>
                                        <input
                                            type="radio"
                                            name="payment"
                                            value="cod"
                                            checked={paymentMethod === "cod"}
                                            onChange={() => setPaymentMethod("cod")}
                                        />
                                        Накладений платіж
                                    </label>
                                </div>
                            </div>

                            {/* Доставка */}
                            <div className="delivery__section">
                                <h3>Служба доставки</h3>
                                <div className="delivery__options">
                                    <label>
                                        <input
                                            type="radio"
                                            name="delivery"
                                            value="nova"
                                            checked={deliveryService === "nova"}
                                            onChange={() => setDeliveryService("nova")}
                                        />
                                        <img src={novaPoshta} alt="Нова Пошта" className="delivery__icon" />
                                        Нова пошта
                                    </label>
                                    <label>
                                        <input
                                            type="radio"
                                            name="delivery"
                                            value="ukr"
                                            checked={deliveryService === "ukr"}
                                            onChange={() => setDeliveryService("ukr")}
                                        />
                                        <img src={ukrPoshta} alt="Укрпошта" className="delivery__icon" />
                                        Укрпошта
                                    </label>
                                </div>
                            </div>


                            <div className="delivery__section">
                                <h3>Адреса доставки</h3>
                                <div className="delivery__inputs">
                                    {deliveryService === "nova" ? (
                                        <>
                                            {/*Поиск города*/}
                                            <div className="city-search">
                                                <input
                                                    type="text"
                                                    placeholder="Введіть місто..."
                                                    value={citySearch}
                                                    onChange={(e) => setCitySearch(e.target.value)}
                                                    onFocus={() => setShowCityDropdown(true)}
                                                    onBlur={() =>
                                                        setTimeout(() => setShowCityDropdown(false), 150)
                                                    }
                                                />
                                                {showCityDropdown && cities.length > 0 && (
                                                    <div className="city-dropdown">
                                                        {cities.slice(0, 15).map((city) => (
                                                            <div
                                                                key={city.Ref}
                                                                className="city-option"
                                                                onClick={() => {
                                                                    setForm({
                                                                        ...form,
                                                                        city: city.Description,
                                                                        cityRef: city.Ref,
                                                                    });
                                                                    setCitySearch(city.Description);
                                                                    setShowCityDropdown(false);
                                                                }}
                                                            >
                                                                {city.Description}
                                                            </div>
                                                        ))}
                                                    </div>
                                                )}
                                            </div>

                                            {/* Отделения */}
                                            <select
                                                name="branch"
                                                value={form.branch}
                                                onChange={handleChange}
                                                required
                                            >
                                                <option value="">Оберіть відділення</option>
                                                {branches.map((b) => (
                                                    <option key={b.Ref} value={b.Description}>
                                                        {b.Description}
                                                    </option>
                                                ))}
                                            </select>
                                        </>
                                    ) : (
                                        <>
                                            {/* Поля для Укрпошти */}
                                            <input
                                                type="text"
                                                name="city"
                                                placeholder="Місто (введіть вручну)"
                                                value={form.city}
                                                onChange={handleChange}
                                                required
                                            />
                                            <input
                                                type="text"
                                                name="postalCode"
                                                placeholder="Поштовий індекс"
                                                value={form.postalCode || ""}
                                                onChange={handleChange}
                                                required
                                            />
                                        </>
                                    )}


                                    <input
                                        type="text"
                                        name="street"
                                        placeholder="Вулиця"
                                        value={form.street}
                                        onChange={handleChange}
                                        required
                                    />
                                    <input
                                        type="text"
                                        name="house"
                                        placeholder="Будинок"
                                        value={form.house}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                            </div>

                            <button type="submit" className="delivery__button">
                                {paymentMethod === "online"
                                    ? "Перейти до оплати"
                                    : "Оформити замовлення"}
                            </button>
                        </form>
                    </div>

                    {/* Подсчет*/}
                    <div className="delivery__summary">
                        <h3>Ваше замовлення</h3>
                        <div className="summary__details">
                            <p>
                                Кількість товарів: <strong>{cartItems.length}</strong>
                            </p>
                            <p>
                                Загальна сума: <strong>{totalPrice} ₴</strong>
                            </p>
                        </div>
                        <div className="summary__line"></div>
                        <p className="summary__note">
                            *Вартість доставки оплачується при отриманні
                        </p>
                    </div>
                </div>
            </section>

            <Footer />
        </>
    );
}

export default DeliveryPaymentPage;
