import { useState } from 'react';
import './AuthModal.css';

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
            const response = await fetch('https://jsonplaceholder.typicode.com/users/1'); // потом доабвишь что нужно
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
            console.error('Auth error:', err)
            alert('Ошибка авторизации!');
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
                    <button className={isLogin ? 'active' : ''} onClick={() => setIsLogin(true)}>Login</button>
                    <button className={!isLogin ? 'active' : ''} onClick={() => setIsLogin(false)}>Register</button>
                </div>

                <form className="auth-modal__form" onSubmit={handleSubmit}>
                    {!isLogin && (
                        <input
                            type="text"
                            placeholder="Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    )}
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <button type="submit" className="auth-modal__submit" disabled={loading}>
                        {loading ? 'Loading...' : isLogin ? 'Login' : 'Register'}
                    </button>
                </form>
            </div>
        </>
    );
}

export default AuthModal;
