import React, { useEffect, useState } from "react";
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";
import "./Preloader.css";
import logo from "../../assets/logo.png";

export default function Preloader() {
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        const hasSeenPreloader = sessionStorage.getItem("hasSeenPreloader");
        if (hasSeenPreloader) {
            setIsVisible(false);
            return;
        }


        document.body.style.overflow = "hidden";
        document.documentElement.style.overflow = "hidden";
        document.body.style.height = "100vh";
        document.documentElement.style.height = "100vh";

        const timer = setTimeout(() => {
            setIsVisible(false);
            sessionStorage.setItem("hasSeenPreloader", "true");

            document.body.style.overflow = "";
            document.documentElement.style.overflow = "";
            document.body.style.height = "";
            document.documentElement.style.height = "";
        }, 5500);

        return () => {
            clearTimeout(timer);
            document.body.style.overflow = "";
            document.documentElement.style.overflow = "";
            document.body.style.height = "";
            document.documentElement.style.height = "";
        };
    }, []);

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    className="preloader"
                    initial={{ opacity: 1 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1 }}
                >

                    <motion.svg
                        className="preloader__sprout"
                        viewBox="0 0 100 100"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{
                            scale: 1,
                            opacity: 1,
                            rotate: [0, -1.5, 1.5, 0],
                        }}
                        transition={{
                            duration: 1.5,
                            delay: 0.2,
                            rotate: { repeat: Infinity, repeatType: "mirror", duration: 2, ease: "easeInOut" },
                        }}
                    >
                        <motion.path
                            d="M50 90 C50 60 48 45 50 20"
                            stroke="#2e6b2e"
                            strokeWidth="3"
                            strokeLinecap="round"
                            initial={{ pathLength: 0 }}
                            animate={{ pathLength: 1 }}
                            transition={{ duration: 2, ease: "easeInOut" }}
                        />
                        <motion.path
                            d="M50 40 C40 35 30 25 25 15 C30 18 45 20 50 25"
                            stroke="#3c7f3c"
                            strokeWidth="3"
                            strokeLinecap="round"
                            initial={{ pathLength: 0 }}
                            animate={{ pathLength: 1 }}
                            transition={{ duration: 2, delay: 0.8, ease: "easeInOut" }}
                        />
                        <motion.path
                            d="M50 40 C60 35 70 25 75 15 C70 18 55 20 50 25"
                            stroke="#3c7f3c"
                            strokeWidth="3"
                            strokeLinecap="round"
                            initial={{ pathLength: 0 }}
                            animate={{ pathLength: 1 }}
                            transition={{ duration: 2, delay: 1, ease: "easeInOut" }}
                        />
                    </motion.svg>


                    {logo && (
                        <motion.img
                            src={logo}
                            alt="Карпатські трави"
                            className="preloader__logo"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1.15 }}
                            transition={{ delay: 3, duration: 1.2, ease: "easeOut" }}
                        />
                    )}
                </motion.div>
            )}
        </AnimatePresence>
    );
}
