// src/App.jsx
import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';

import ScrollToTop from './components/ScrollToTop/ScrollToTop';
import Header from './components/Header/Header';
import Hero from './components/Hero/Hero';
import ContactTicker from './components/ContactTicker/ContactTicker';
import Categories from './components/Categories/Categories';
import ProductPage from './components/ProductPage/ProductPage';
import ProductList from './components/ProductList/ProductList';
import StatsSection from './components/StatsSection/StatsSection';
import FounderSection from './components/FounderSection/FounderSection';
import Reviews from './components/Reviews/Reviews';
import Location from './components/Location/Location';
import Footer from './components/Footer/Footer';
import AuthModal from './components/AuthModal/AuthModal';
import CartOverlay from './components/CartOverlay/CartOverlay';
import CartSidebar from './components/CartSidebar/CartSidebar';

import CatalogPage from './pages/CatalogPage/CatalogPage';

import { AuthProvider } from './context/AuthContext.jsx';
import { CartProvider } from './context/CartContext.jsx';
import { useAuth } from './context/useAuth.jsx';
import { useCart } from './context/useCart.jsx';

function AppContent() {
  const { user, isAuthModalOpen, setIsAuthModalOpen, handleLogin, handleLogout } = useAuth();
  const { cartItems, addToCart, removeFromCart, incrementItem, decrementItem, isCartOpen, toggleCart, closeCart } = useCart();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => setIsMenuOpen(prev => !prev);
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
      <Routes>
        <Route path="/" element={
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
        } />

        {/* вместо ProductList теперь подключаем отдельную страницу */}
        <Route path="/catalog" element={<CatalogPage addToCart={addToCart} />} />

        <Route path="/product/:id" element={<ProductPage addToCart={addToCart} />} />
        <Route path="/about" element={<div>About Us</div>} />
        <Route path="/reviews" element={<div>Reviews</div>} />
        <Route path="/contact" element={<div>Contact</div>} />
        <Route path="/profile" element={<div>Profile</div>} />
        <Route path="/transactions" element={<div>Transactions</div>} />
      </Routes>

      {isAuthModalOpen && <AuthModal onClose={() => setIsAuthModalOpen(false)} onLogin={handleLogin} />}
    </>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <AppContent />
      </CartProvider>
    </AuthProvider>
  );
}
