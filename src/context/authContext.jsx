// src/context/AuthContext.jsx
import React, { createContext, useState, useEffect } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

    useEffect(() => {
        const access = localStorage.getItem("access");
        if (access) {
            fetch("http://localhost:8000/api/user/me/", {
                headers: { Authorization: `Bearer ${access}` },
            })
                .then((res) => (res.ok ? res.json() : Promise.reject()))
                .then((data) => setUser(data))
                .catch(() => {
                    localStorage.removeItem("access");
                    localStorage.removeItem("refresh");
                });
        }
    }, []);

    const handleLogin = (userData) => {
        setUser(userData);
        setIsAuthModalOpen(false);
    };

    const handleLogout = () => {
        localStorage.removeItem("access");
        localStorage.removeItem("refresh");
        setUser(null);
    };

    return (
        <AuthContext.Provider
            value={{ user, isAuthModalOpen, setIsAuthModalOpen, handleLogin, handleLogout }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export default AuthContext;
