import { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';

import Header from './components/Header/Header';
import Hero from './components/Hero/Hero';
import ContactTicker from './components/ContactTicker/ContactTicker';
import Categories from './components/Categories/Categories';
import ProductPage from './components/ProductPage/ProductPage';
import ProductList from './components/ProductList/ProductList';
import AuthModal from './components/AuthModal/AuthModal';

import CartOverlay from './components/CartOverlay/CartOverlay';
import CartSidebar from './components/CartSidebar/CartSidebar';

function App() {
  const [cartItems, setCartItems] = useState([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const [user, setUser] = useState(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  useEffect(() => {
    const access = localStorage.getItem('access');
    if (access) {
      fetch('http://localhost:8000/api/user/me/', {
        headers: { Authorization: `Bearer ${access}` },
      })
        .then((res) => {
          if (!res.ok) throw new Error('Unauthorized');
          return res.json();
        })
        .then((data) => setUser(data))
        .catch(() => {
          localStorage.removeItem('access');
          localStorage.removeItem('refresh');
        });
    }
  }, []);

  const handleLogin = (userData) => {
    setUser(userData);
    setIsAuthModalOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('access');
    localStorage.removeItem('refresh');
    setUser(null);
  };

  const addToCart = (item) => {
    setCartItems((prev) => {
      const existing = prev.find((i) => i.id === item.id);
      if (existing) {
        return prev.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  const removeFromCart = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const incrementItem = (id) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decrementItem = (id) => {
    setCartItems((prev) =>
      prev
        .map((item) =>
          item.id === id ? { ...item, quantity: item.quantity - 1 } : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);
  const closeMenu = () => setIsMenuOpen(false);

  const toggleCart = () => setIsCartOpen((prev) => !prev);
  const closeCart = () => setIsCartOpen(false);

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

      <Routes>
        <Route
          path="/"
          element={
            <>
              <Hero />
              <ContactTicker />
              <Categories />
              <ProductList addToCart={addToCart} />
            </>
          }
        />
        <Route path="/catalog" element={<ProductList addToCart={addToCart} />} />
        <Route path="/product/:id" element={<ProductPage addToCart={addToCart} />} />
        <Route path="/about" element={<div>About Us</div>} />
        <Route path="/reviews" element={<div>Reviews</div>} />
        <Route path="/contact" element={<div>Contact</div>} />
        <Route path="/profile" element={<div>Profile</div>} />
        <Route path="/transactions" element={<div>Transactions</div>} />
      </Routes>

      {isAuthModalOpen && (
        <AuthModal onClose={() => setIsAuthModalOpen(false)} onLogin={handleLogin} />
      )}
    </>
  );
}

export default App;
