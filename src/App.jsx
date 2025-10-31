// src/App.jsx
import React, { useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
// eslint-disable-next-line no-unused-vars
import { AnimatePresence, motion } from "framer-motion";


import ScrollToTop from "./components/ScrollToTop/ScrollToTop";
import Header from "./components/Header/Header";
import ProductPage from "./components/ProductPage/ProductPage";
import AuthModal from "./components/AuthModal/AuthModal";
import CartOverlay from "./components/CartOverlay/CartOverlay";
import CartSidebar from "./components/CartSidebar/CartSidebar";

import Preloader from "./components/Preloader/Preloader";
import HomePage from "./pages/HomePage/HomePage";
import CatalogPage from "./pages/CatalogPage/CatalogPage";
import AboutPage from "./pages/AboutPage/AboutPage";
import WishlistPage from "./pages/WishlistPage/WishlistPage";
import ContactPage from "./pages/ContactPage/ContactPage";
import BlogPage from "./pages/BlogPage/BlogPage";
import BlogDetails1 from "./pages/BlogDetails/BlogDetails";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import PurchasesPage from "./pages/PurchasesPage/PurchasesPage";
import CheckoutPage from "./pages/CheckoutPage/CheckoutPage";
import DeliveryPaymentPage from "./pages/DeliveryPaymentPage/DeliveryPaymentPage";
import SuccessPage from "./pages/SuccessPage/SuccessPage";
import FailPage from "./pages/FailPage/FailPage";

import Privacy from './pages/Privacy/Privacy';
import Terms from './pages/Terms/Terms';
import Return from './pages/Return/Return';
import Certificates from './pages/Certificate/Certificate';


import { AuthProvider } from "./context/AuthContext.jsx";
import { CartProvider } from "./context/CartContext.jsx";
import { WishlistProvider } from "./context/WishlistContext.jsx";

import { useAuth } from "./context/useAuth.jsx";
import { useCart } from "./context/useCart.jsx";


const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
};
const pageTransition = { duration: 0.5, ease: "easeInOut" };

function AnimatedRoutes({ addToCart }) {
  const location = useLocation();

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
        <Route path="/" element={withAnimation(<HomePage addToCart={addToCart} />)} />

        <Route path="/catalog" element={withAnimation(<CatalogPage addToCart={addToCart} />)} />
        <Route path="/product/:id" element={withAnimation(<ProductPage addToCart={addToCart} />)} />
        <Route path="/wishlist" element={withAnimation(<WishlistPage />)} />
        <Route path="/contact" element={withAnimation(<ContactPage />)} />
        <Route path="/privacy" element={withAnimation(<Privacy />)} />
        <Route path="/terms" element={withAnimation(<Terms />)} />
        <Route path="/certificates" element={withAnimation(<Certificates />)} />
        <Route path="/return" element={withAnimation(<Return />)} />


        <Route path="/about" element={withAnimation(<AboutPage />)} />
        <Route path="/blog" element={withAnimation(<BlogPage />)} />
        <Route path="/blog/1" element={withAnimation(<BlogDetails1 />)} />

        <Route path="/checkout" element={withAnimation(<CheckoutPage />)} />
        <Route path="/profile" element={withAnimation(<ProfilePage />)} />
        <Route path="/purchases" element={withAnimation(<PurchasesPage />)} />
        <Route path="/delivery" element={withAnimation(<DeliveryPaymentPage />)} />
        <Route path="/success" element={withAnimation(<SuccessPage />)} />
        <Route path="/fail" element={withAnimation(<FailPage />)} />
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
          <Preloader />
          <AppContent />
        </WishlistProvider>
      </CartProvider>
    </AuthProvider>
  );
}
