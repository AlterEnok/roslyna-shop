import { useState } from 'react';
import './AuthModal.css';
import googleIcon from '../../assets/google-icon.svg';

function AuthModal({ onClose, onLogin }) {
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await fetch('https://jsonplaceholder.typicode.com/users/1');
            const data = await response.json();

            const userData = {
                name: isLogin ? data.name : username,
                email: email,
            };

            onLogin(userData);
            setEmail('');
            setPassword('');
            setUsername('');
        } catch (err) {
            console.error('Auth error:', err);
            alert('Помилка авторизації. Спробуйте ще раз.');
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleLogin = () => {
        // Заглушка для Google авторизации
        const fakeUser = {
            name: 'Google User',
            email: 'googleuser@example.com',
        };
        onLogin(fakeUser);
        onClose();
    };

    return (
        <>
            <div className="auth-overlay" onClick={onClose}></div>
            <div className="auth-modal">
                <button className="auth-modal__close" onClick={onClose}>✕</button>

                <div className="auth-modal__toggle">
                    <button className={isLogin ? 'active' : ''} onClick={() => setIsLogin(true)}>
                        Увійти
                    </button>
                    <button className={!isLogin ? 'active' : ''} onClick={() => setIsLogin(false)}>
                        Зареєструватися
                    </button>
                </div>

                <form className="auth-modal__form" onSubmit={handleSubmit}>
                    {!isLogin && (
                        <input
                            type="text"
                            placeholder="Ім’я користувача"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    )}
                    <input
                        type="email"
                        placeholder="Електронна пошта"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Пароль"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <button type="submit" className="auth-modal__submit" disabled={loading}>
                        {loading
                            ? 'Завантаження...'
                            : isLogin
                                ? 'Увійти'
                                : 'Зареєструватися'}
                    </button>
                </form>

                <div className="auth-modal__divider">
                    <span>або</span>
                </div>

                <button className="auth-modal__google" onClick={handleGoogleLogin}>
                    <img src={googleIcon} alt="Google" />
                    Увійти через Google
                </button>
            </div>
        </>
    );
}

export default AuthModal;
