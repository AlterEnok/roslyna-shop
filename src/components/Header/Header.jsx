import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import logo from '../../assets/logo.png';

function Header({
  toggleCart,
  cartItems = [],
  isAuthenticated,
  user,
  onLogout,
  onOpenAuth,
  isMenuOpen,
  toggleMenu,
  closeMenu,
}) {
  const [isHighlight, setIsHighlight] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  useEffect(() => {
    if (totalQuantity > 0) {
      setIsHighlight(true);
      const timer = setTimeout(() => setIsHighlight(false), 1000);
      return () => clearTimeout(timer);
    }
  }, [totalQuantity]);

  const toggleDropdown = () => setShowDropdown((prev) => !prev);

  useEffect(() => {
    const header = document.querySelector('.header');
    const handleScroll = () => {
      if (window.scrollY > 50) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header className={`header ${isMenuOpen ? 'menu-open' : ''}`}>
        <div className="header__logo">
          <Link to="/" onClick={closeMenu} className="header__logo-link">
            <img src={logo} alt="ShopName Logo" className="header__logo-image" />
          </Link>
        </div>



        <nav className="header__nav">
          <Link to="/catalog" className="header__link" onClick={closeMenu}>Каталог</Link>
          <Link to="/about" className="header__link" onClick={closeMenu}>Про нас</Link>
          <Link to="/contact" className="header__link" onClick={closeMenu}>Контакти</Link>
        </nav>


        <div className="header__actions">
          {isAuthenticated ? (
            <div className="user-dropdown">
              <button className="user-icon" onClick={toggleDropdown}>👤</button>
              {showDropdown && (
                <div className="user-dropdown__menu">
                  <p>Hello, {user?.name || user?.email || 'User'}</p>
                  <Link to="/profile" className="user-dropdown__link" onClick={closeMenu}>👤 Personal Account</Link>
                  <Link to="/transactions" className="user-dropdown__link" onClick={closeMenu}>💳 Last Transactions</Link>
                  <button onClick={() => { onLogout(); closeMenu(); }}>Logout</button>
                </div>
              )}
            </div>
          ) : (
            <button className="header__login" onClick={() => { onOpenAuth(); closeMenu(); }}>
              Login / Register
            </button>
          )}

          <button
            className={`header__cart ${isHighlight ? 'highlight' : ''}`}
            onClick={toggleCart}
            aria-label="Cart"
          >
            🛒
            {totalQuantity > 0 && (
              <span className="header__cart-badge">{totalQuantity}</span>
            )}
          </button>

          <button
            className={`header__burger ${isMenuOpen ? 'open' : ''}`}
            aria-label="Toggle menu"
            aria-expanded={isMenuOpen}
            onClick={toggleMenu}
          >
            <span className="burger-line top"></span>
            <span className="burger-line middle"></span>
            <span className="burger-line bottom"></span>
          </button>
        </div>
      </header>

      <div className={`mobile-menu ${isMenuOpen ? 'mobile-menu--open' : ''}`}>
        <nav className="mobile-menu__nav">
          <Link to="/catalog" className="header__link" onClick={closeMenu}>Каталог</Link>
          <Link to="/about" className="header__link" onClick={closeMenu}>Про нас</Link>
          <Link to="/contact" className="header__link" onClick={closeMenu}>Контакти</Link>
          {!isAuthenticated && (
            <button className="mobile-menu__login" onClick={() => { onOpenAuth(); closeMenu(); }}>
              Login / Register
            </button>
          )}
        </nav>
      </div>

      {isMenuOpen && <div className="menu-overlay" onClick={closeMenu}></div>}
    </>
  );
}

export default Header;
