import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import logo from '../../assets/logo.png';
import cartIcon from '../../assets/cart.png';
import userIcon from '../../assets/user.png';

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

  // Подсветка корзины при добавлении товара
  useEffect(() => {
    if (totalQuantity > 0) {
      setIsHighlight(true);
      const timer = setTimeout(() => setIsHighlight(false), 1000);
      return () => clearTimeout(timer);
    }
  }, [totalQuantity]);

  // Открытие/закрытие дропа по клику
  const toggleDropdown = () => setShowDropdown((prev) => !prev);

  // Автоматическое закрытие при клике вне блока
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest('.user-dropdown')) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  // Закрывать дропдаун сразу после логина/регистрации
  useEffect(() => {
    if (isAuthenticated) {
      setShowDropdown(false);
    }
  }, [isAuthenticated]);

  // Скролл-эффект для шапки
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
            <>
              {/* Человечек + дропдаун */}
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
                    <p className="user-dropdown__greeting">
                      Привіт, {user?.name || 'Користувач'}
                    </p>
                    <Link to="/profile" className="user-dropdown__item" onClick={closeMenu}>
                      Профіль
                    </Link>
                    <Link to="/transactions" className="user-dropdown__item" onClick={closeMenu}>
                      Останні транзакції
                    </Link>
                    <button
                      className="user-dropdown__logout"
                      onClick={() => {
                        onLogout();
                        closeMenu();
                      }}
                    >
                      Вийти
                    </button>
                  </div>
                )}
              </div>

              {/* Сердечко */}
              <Link to="/wishlist" className="header__wishlist" aria-label="Wishlist">❤</Link>
            </>
          ) : (
            <button className="header__login" onClick={() => { onOpenAuth(); closeMenu(); }}>
              Увійти / Реєстрація
            </button>
          )}

          {/* Корзина */}
          <button
            className={`header__cart ${isHighlight ? 'highlight' : ''}`}
            onClick={toggleCart}
            aria-label="Cart"
          >
            <img src={cartIcon} alt="Cart" className="header__cart-icon" />
            {totalQuantity > 0 && (
              <span className="header__cart-badge">{totalQuantity}</span>
            )}
          </button>

          {/* Бургер */}
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

      {/* Мобильное меню */}
      <div className={`mobile-menu ${isMenuOpen ? 'mobile-menu--open' : ''}`}>
        <nav className="mobile-menu__nav">
          <Link to="/catalog" className="header__link" onClick={closeMenu}>Каталог</Link>
          <Link to="/about" className="header__link" onClick={closeMenu}>Про нас</Link>
          <Link to="/contact" className="header__link" onClick={closeMenu}>Контакти</Link>
          {!isAuthenticated && (
            <button
              className="mobile-menu__login"
              onClick={() => { onOpenAuth(); closeMenu(); }}
            >
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
