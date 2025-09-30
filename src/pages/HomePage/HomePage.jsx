// src/pages/HomePage/HomePage.jsx
import React from "react";
import Hero from "../../components/Hero/Hero";
import ContactTicker from "../../components/ContactTicker/ContactTicker";
import FounderSection from "../../components/FounderSection/FounderSection";
import Categories from "../../components/Categories/Categories";
import ProductList from "../../components/ProductList/ProductList";
import StatsSection from "../../components/StatsSection/StatsSection";
import Reviews from "../../components/Reviews/Reviews";
import Location from "../../components/Location/Location";
import Footer from "../../components/Footer/Footer";

function HomePage({ addToCart }) {
    return (
        <>
            <Hero />
            <ContactTicker />
            <FounderSection />
            <Categories />
            <ProductList addToCart={addToCart} isPreview />
            <StatsSection />
            <Reviews />
            <Location />
            <Footer />
        </>
    );
}

export default HomePage;
