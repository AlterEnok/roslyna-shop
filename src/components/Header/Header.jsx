import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import logo from '../../assets/logo.png';
import cartIcon from '../../assets/cart.png';
import userIcon from '../../assets/user.png';
import WishlistContext from '../../context/WishlistContext';

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
  const [cartHighlight, setCartHighlight] = useState(false);
  const [wishlistHighlight, setWishlistHighlight] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  const { wishlist } = useContext(WishlistContext);

  const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const wishlistCount = wishlist.length;

  // Подсветка бейджа корзины
  useEffect(() => {
    if (totalQuantity > 0) {
      setCartHighlight(true);
    }
  }, [totalQuantity]);

  // Подсветка бейджа избранного
  useEffect(() => {
    if (wishlistCount > 0) {
      setWishlistHighlight(true);
      const timer = setTimeout(() => setWishlistHighlight(false), 800);
      return () => clearTimeout(timer);
    }
  }, [wishlistCount]);

  const toggleDropdown = () => setShowDropdown(prev => !prev);

  useEffect(() => {
    const handleClickOutside = e => {
      if (!e.target.closest('.user-dropdown')) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  useEffect(() => {
    if (isAuthenticated) setShowDropdown(false);
  }, [isAuthenticated]);

  useEffect(() => {
    const header = document.querySelector('.header');
    const handleScroll = () => {
      if (window.scrollY > 50) header.classList.add('scrolled');
      else header.classList.remove('scrolled');
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
            <>
              <div className="user-dropdown">
                <button
                  className="user-icon"
                  onClick={toggleDropdown}
                  aria-haspopup="true"
                  aria-expanded={showDropdown}
                >
                  <img src={userIcon} alt="User menu" className="header__user-icon" />
                </button>
                {showDropdown && (
                  <div className="user-dropdown__menu">
                    <p className="user-dropdown__greeting">Привіт, {user?.name || 'Користувач'}</p>
                    <Link to="/profile" className="user-dropdown__item" onClick={closeMenu}>Профіль</Link>
                    <Link to="/transactions" className="user-dropdown__item" onClick={closeMenu}>Мої покупки</Link>
                    <button
                      className="user-dropdown__logout"
                      onClick={() => { onLogout(); closeMenu(); }}
                    >
                      Вийти
                    </button>
                  </div>
                )}
              </div>

              {/* Wishlist */}
              <Link
                to="/wishlist"
                className={`header__wishlist ${wishlistHighlight ? 'highlight' : ''}`}
                aria-label="Wishlist"
              >
                ❤
                {wishlistCount > 0 && (
                  <span className={`header__wishlist-badge ${wishlistHighlight ? 'highlight' : ''}`}>
                    {wishlistCount}
                  </span>
                )}
              </Link>
            </>
          ) : (
            <button className="header__login" onClick={() => { onOpenAuth(); closeMenu(); }}>
              Увійти / Реєстрація
            </button>
          )}

          {/* Cart */}
          <button className="header__cart" onClick={toggleCart} aria-label="Cart">
            <img src={cartIcon} alt="Cart" className="header__cart-icon" />
            {totalQuantity > 0 && (
              <span
                className={`header__cart-badge ${cartHighlight ? 'highlight' : ''}`}
                onAnimationEnd={() => setCartHighlight(false)}
              >
                {totalQuantity}
              </span>
            )}

          </button>

          {/* Burger */}
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
              Увійти / Реєстрація
            </button>
          )}
        </nav>
      </div>

      {isMenuOpen && <div className="menu-overlay" onClick={closeMenu}></div>}
    </>
  );
}

export default Header;
