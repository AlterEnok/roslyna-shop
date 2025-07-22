import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import './AuthModal.css';

function AuthModal({ onClose, onLogin }) {
    const { t } = useTranslation();
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
            alert(t('auth.error'));
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <div className="auth-overlay" onClick={onClose}></div>
            <div className="auth-modal">
                <button className="auth-modal__close" onClick={onClose}>✕</button>

                <div className="auth-modal__toggle">
                    <button className={isLogin ? 'active' : ''} onClick={() => setIsLogin(true)}>
                        {t('auth.login')}
                    </button>
                    <button className={!isLogin ? 'active' : ''} onClick={() => setIsLogin(false)}>
                        {t('auth.register')}
                    </button>
                </div>

                <form className="auth-modal__form" onSubmit={handleSubmit}>
                    {!isLogin && (
                        <input
                            type="text"
                            placeholder={t('auth.username')}
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    )}
                    <input
                        type="email"
                        placeholder={t('auth.email')}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <input
                        type="password"
                        placeholder={t('auth.password')}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <button type="submit" className="auth-modal__submit" disabled={loading}>
                        {loading
                            ? t('auth.loading')
                            : isLogin
                                ? t('auth.login')
                                : t('auth.register')}
                    </button>
                </form>
            </div>
        </>
    );
}

export default AuthModal;
