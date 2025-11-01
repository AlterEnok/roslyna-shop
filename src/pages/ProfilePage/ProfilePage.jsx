import React, { useContext, useState } from "react";
import AuthContext from "../../context/AuthContext";
import "./ProfilePage.css";
import { useNavigate } from "react-router-dom";
import { FaUserCircle, FaEye, FaEyeSlash } from "react-icons/fa";
import background from "../../assets/profile-background.jpg";
import Footer from "../../components/Footer/Footer";
import ReCAPTCHA from "react-google-recaptcha";
import usePageTitle from "../../hooks/usePageTitle";
import { Helmet } from "react-helmet-async";

function ProfilePage() {
    usePageTitle("Профіль");

    const { user, setUser } = useContext(AuthContext);
    const navigate = useNavigate();

    const [isEditing, setIsEditing] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        email: user?.email || "",
        phone: user?.phone || "",
        password: "",
    });
    const [successMsg, setSuccessMsg] = useState("");
    const [errorMsg, setErrorMsg] = useState("");
    const [captchaValid, setCaptchaValid] = useState(false);

    const handleEditToggle = () => setIsEditing(!isEditing);

    const handleCaptchaChange = (value) => {
        if (value) setCaptchaValid(true);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const showError = (msg) => {
        setErrorMsg(msg);
        setTimeout(() => setErrorMsg(""), 3000);
    };

    const showSuccess = (msg) => {
        setSuccessMsg(msg);
        setTimeout(() => setSuccessMsg(""), 3000);
    };

    const handleSave = () => {
        if (!captchaValid) {
            showError("Підтвердьте, що ви не робот ✅");
            return;
        }

        const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email);
        const phoneValid = /^\+380\d{9}$/.test(formData.phone);
        const passValid = formData.password === "" || formData.password.length >= 6;

        if (!emailValid) return showError("Некоректний email");
        if (!phoneValid) return showError("Телефон має бути у форматі +380XXXXXXXXX");
        if (!passValid) return showError("Пароль має містити мінімум 6 символів");

        const updatedUser = {
            ...user,
            email: formData.email,
            phone: formData.phone,
        };

        setUser(updatedUser);
        localStorage.setItem("user", JSON.stringify(updatedUser));

        setFormData((prev) => ({ ...prev, password: "" }));
        setIsEditing(false);
        setCaptchaValid(false);
        showSuccess("Ваші дані успішно оновлено ✅");
    };

    const handleCancel = () => {
        setFormData({
            email: user?.email || "",
            phone: user?.phone || "",
            password: "",
        });
        setIsEditing(false);
        setCaptchaValid(false);
    };

    const handleMyOrders = () => navigate("/purchases");

    return (
        <>

            <Helmet>
                <title>Профіль користувача | Рослина Карпат</title>
                <meta
                    name="description"
                    content="Ваш особистий профіль у магазині Рослина Карпат. Редагуйте свої дані, переглядайте покупки та керуйте обліковим записом."
                />
                <meta
                    name="keywords"
                    content="профіль, обліковий запис, користувач, покупки, рослина карпат"
                />
                <meta property="og:title" content="Профіль користувача | Рослина Карпат" />
                <meta
                    property="og:description"
                    content="Особистий кабінет користувача в інтернет-магазині Рослина Карпат. Керуйте контактними даними та історією замовлень."
                />
                <meta property="og:image" content={background} />
                <meta property="og:type" content="website" />
            </Helmet>


            {successMsg && <div className="popup success-popup">{successMsg}</div>}
            {errorMsg && <div className="popup error-popup">{errorMsg}</div>}

            <div
                className="profile-page"
                style={{ backgroundImage: `url(${background})` }}
            >
                <div className="profile-overlay">
                    <div className="profile-container">
                        <h2 className="profile-title">Особисті дані</h2>

                        <div className="profile-card-large">
                            <div className="profile-avatar-section">
                                <div className="profile-avatar">
                                    <FaUserCircle className="profile-icon" />
                                </div>
                                <h3 className="profile-name">
                                    {user?.first_name || user?.username || "Користувач"}
                                </h3>

                                {!isEditing ? (
                                    <button className="edit-btn" onClick={handleEditToggle}>
                                        Редагувати дані
                                    </button>
                                ) : (
                                    <div className="edit-actions">
                                        <button className="save-btn" onClick={handleSave}>
                                            Зберегти
                                        </button>
                                        <button className="cancel-btn" onClick={handleCancel}>
                                            Скасувати
                                        </button>
                                    </div>
                                )}
                            </div>

                            <p className="profile-subtitle">Мій профіль</p>

                            <div className="profile-info">
                                <div className="profile-field">
                                    <div className="oval-label">Електронна пошта</div>
                                    {isEditing ? (
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleInputChange}
                                            className="info-input"
                                        />
                                    ) : (
                                        <div className="info-box">{formData.email}</div>
                                    )}
                                </div>

                                <div className="profile-field">
                                    <div className="oval-label">Номер телефону</div>
                                    {isEditing ? (
                                        <input
                                            type="tel"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={(e) => {
                                                let value = e.target.value.replace(/\D/g, "");
                                                if (!value.startsWith("380")) value = "380" + value;
                                                if (value.length > 12) value = value.slice(0, 12);
                                                setFormData((prev) => ({
                                                    ...prev,
                                                    phone: "+" + value,
                                                }));
                                            }}
                                            onFocus={() => {
                                                if (!formData.phone) {
                                                    setFormData((prev) => ({
                                                        ...prev,
                                                        phone: "+380",
                                                    }));
                                                }
                                            }}
                                            className="info-input"
                                            placeholder="+380XXXXXXXXX"
                                        />
                                    ) : (
                                        <div className="info-box">{formData.phone}</div>
                                    )}
                                </div>

                                <div className="profile-field password-field">
                                    <div className="oval-label">Пароль</div>
                                    {isEditing ? (
                                        <div className="password-wrapper">
                                            <input
                                                type={showPassword ? "text" : "password"}
                                                name="password"
                                                value={formData.password}
                                                onChange={handleInputChange}
                                                className="info-input"
                                                placeholder="Введіть новий пароль"
                                            />
                                            <span
                                                className="toggle-eye"
                                                onClick={() => setShowPassword(!showPassword)}
                                            >
                                                {showPassword ? <FaEyeSlash /> : <FaEye />}
                                            </span>
                                        </div>
                                    ) : (
                                        <div className="info-box">••••••••</div>
                                    )}
                                </div>
                            </div>

                            {isEditing && (
                                <div className="captcha-wrapper">
                                    <ReCAPTCHA
                                        sitekey="6Lcbpu0rAAAAAHLJWcMdZ8czJmZRr3I-5WKQIyOG"
                                        onChange={handleCaptchaChange}
                                    />
                                </div>
                            )}

                            <button className="orders-btn" onClick={handleMyOrders}>
                                Мої покупки
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </>
    );
}

export default ProfilePage;
