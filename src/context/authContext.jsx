// context/AuthContext.js
import React, { createContext, useState, useEffect } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(() => {
        try {
            const saved = localStorage.getItem("user");
            return saved ? JSON.parse(saved) : null;
        } catch (error) {
            console.warn("Помилка читання user з localStorage:", error);
            localStorage.removeItem("user");
            return null;
        }
    });

    const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

    useEffect(() => {
        const access = localStorage.getItem("access");
        if (access && !user) {
            fetch("http://localhost:8000/api/user/me/", {
                headers: { Authorization: `Bearer ${access}` },
            })
                .then((res) => (res.ok ? res.json() : Promise.reject()))
                .then((data) => {
                    setUser(data);
                    localStorage.setItem("user", JSON.stringify(data));
                })
                .catch(() => {
                    localStorage.removeItem("access");
                    localStorage.removeItem("refresh");
                    localStorage.removeItem("user");
                });
        }
    }, [user]);

    const handleLogin = (userData) => {
        setUser(userData);
        localStorage.setItem("user", JSON.stringify(userData));
        setIsAuthModalOpen(false);
    };

    const handleLogout = () => {
        localStorage.removeItem("access");
        localStorage.removeItem("refresh");
        localStorage.removeItem("user");
        setUser(null);
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                setUser,
                isAuthModalOpen,
                setIsAuthModalOpen,
                handleLogin,
                handleLogout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export default AuthContext;
