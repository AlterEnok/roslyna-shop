// src/App.jsx
import React, { useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion"; // eslint-disable-line


import ScrollToTop from "./components/ScrollToTop/ScrollToTop";
import Header from "./components/Header/Header";
import Hero from "./components/Hero/Hero";
import ContactTicker from "./components/ContactTicker/ContactTicker";
import Categories from "./components/Categories/Categories";
import ProductPage from "./components/ProductPage/ProductPage";
import ProductList from "./components/ProductList/ProductList";
import StatsSection from "./components/StatsSection/StatsSection";
import FounderSection from "./components/FounderSection/FounderSection";
import Reviews from "./components/Reviews/Reviews";
import Location from "./components/Location/Location";
import Footer from "./components/Footer/Footer";
import AuthModal from "./components/AuthModal/AuthModal";
import CartOverlay from "./components/CartOverlay/CartOverlay";
import CartSidebar from "./components/CartSidebar/CartSidebar";

import CatalogPage from "./pages/CatalogPage/CatalogPage";
import WishlistPage from "./pages/WishlistPage/WishlistPage";
import ContactPage from "./pages/ContactPage/ContactPage";

import { AuthProvider } from "./context/AuthContext.jsx";
import { CartProvider } from "./context/CartContext.jsx";
import { WishlistProvider } from "./context/WishlistContext.jsx";

import { useAuth } from "./context/useAuth.jsx";
import { useCart } from "./context/useCart.jsx";

// 🔹 Варианты анимации
const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
};
const pageTransition = { duration: 0.5, ease: "easeInOut" };

function AnimatedRoutes({ addToCart }) {
  const location = useLocation();

  // 🔹 Удобная обёртка для каждой страницы
  const withAnimation = (children) => (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={pageTransition}
    >
      {children}
    </motion.div>
  );

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route
          path="/"
          element={withAnimation(
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
          )}
        />

        <Route path="/catalog" element={withAnimation(<CatalogPage addToCart={addToCart} />)} />
        <Route path="/product/:id" element={withAnimation(<ProductPage addToCart={addToCart} />)} />
        <Route path="/wishlist" element={withAnimation(<WishlistPage />)} />
        <Route path="/contact" element={withAnimation(<ContactPage />)} />

        {/* Остальные простые страницы */}
        <Route path="/about" element={withAnimation(<div>About Us</div>)} />
        <Route path="/reviews" element={withAnimation(<div>Reviews</div>)} />
        <Route path="/profile" element={withAnimation(<div>Profile</div>)} />
        <Route path="/transactions" element={withAnimation(<div>Transactions</div>)} />
      </Routes>
    </AnimatePresence>
  );
}

function AppContent() {
  const { user, isAuthModalOpen, setIsAuthModalOpen, handleLogin, handleLogout } = useAuth();
  const {
    cartItems,
    addToCart,
    removeFromCart,
    incrementItem,
    decrementItem,
    isCartOpen,
    toggleCart,
    closeCart,
  } = useCart();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => setIsMenuOpen((prev) => !prev);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <>
      <Header
        cartItems={cartItems}
        isAuthenticated={!!user}
        user={user}
        onLogout={handleLogout}
        onOpenAuth={() => setIsAuthModalOpen(true)}
        isMenuOpen={isMenuOpen}
        toggleMenu={toggleMenu}
        closeMenu={closeMenu}
        toggleCart={toggleCart}
      />

      {isCartOpen && <CartOverlay onClick={closeCart} />}
      <CartSidebar
        isOpen={isCartOpen}
        items={cartItems}
        onRemove={removeFromCart}
        onIncrement={incrementItem}
        onDecrement={decrementItem}
      />

      <ScrollToTop />

      {/* ✅ теперь все страницы плавные */}
      <AnimatedRoutes addToCart={addToCart} />

      {isAuthModalOpen && (
        <AuthModal onClose={() => setIsAuthModalOpen(false)} onLogin={handleLogin} />
      )}
    </>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <WishlistProvider>
          <AppContent />
        </WishlistProvider>
      </CartProvider>
    </AuthProvider>
  );
}
