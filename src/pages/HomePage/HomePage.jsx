import { Helmet } from "react-helmet-async";
import React, { useEffect } from "react";
import Hero from "../../components/Hero/Hero";
import ContactTicker from "../../components/ContactTicker/ContactTicker";
import FounderSection from "../../components/FounderSection/FounderSection";
import Categories from "../../components/Categories/Categories";
import ProductList from "../../components/ProductList/ProductList";
import StatsSection from "../../components/StatsSection/StatsSection";
import Reviews from "../../components/Reviews/Reviews";
import Location from "../../components/Location/Location";
import Footer from "../../components/Footer/Footer";
import usePageTitle from "../../hooks/usePageTitle";

function HomePage({ addToCart }) {
    usePageTitle("Карпатські трави");

    useEffect(() => {
        const targetId = localStorage.getItem("scrollTarget");
        if (targetId) {
            const section = document.getElementById(targetId);
            if (section) {
                setTimeout(() => {
                    const offset = 80;
                    const sectionTop =
                        section.getBoundingClientRect().top + window.scrollY - offset;
                    window.scrollTo({ top: sectionTop, behavior: "smooth" });
                }, 400);
            }
            localStorage.removeItem("scrollTarget");
        }
    }, []);

    return (
        <>
            {/* SEO */}
            <Helmet>
                <title>Карпатські трави — Натуральні продукти з гір</title>
                <meta
                    name="description"
                    content="Магазин натуральної продукції з Карпат: фіто препарати, сиропи, бальзами, свічки, антисептики та інше."
                />
                <meta
                    name="keywords"
                    content="карпатські трави, натуральні продукти, фіто препарати, фіто сиропи, здоров’я, краса"
                />
            </Helmet>

            <Hero />
            <ContactTicker />
            <Categories />
            <ProductList addToCart={addToCart} isPreview />
            <StatsSection />
            <FounderSection />
            <Reviews />
            <Location />
            <Footer />
        </>
    );
}

export default HomePage;
