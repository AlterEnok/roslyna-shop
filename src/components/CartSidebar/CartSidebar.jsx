import './CartSidebar.css';
import { useEffect, useContext } from 'react';
import CartContext from '../../context/CartContext';

function CartSidebar() {
    const {
        cartItems,
        removeFromCart,
        incrementItem,
        decrementItem,
        isCartOpen,
        closeCart,
    } = useContext(CartContext);

    const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

    // блокировка скролла страницы при открытой корзине
    useEffect(() => {
        if (isCartOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [isCartOpen]);

    return (
        <aside className={`cart-sidebar ${isCartOpen ? 'cart-sidebar--open' : ''}`}>
            <div className="cart-header">
                <h2>Кошик</h2>
                <button className="cart-close" onClick={closeCart} aria-label="Закрити корзину">
                    ×
                </button>
            </div>

            {cartItems.length === 0 ? (
                <p className="cart-empty">Ваш кошик порожній</p>
            ) : (
                <div className="cart-items">
                    {cartItems.map(item => (
                        <div className="cart-item" key={item.id}>
                            <img src={item.image} alt={item.title} className="cart-item__image" />
                            <div className="cart-item__details">
                                <h4 className="cart-item__name">{item.title}</h4>
                                {item.subtitle && (
                                    <p className="cart-item__subtitle">{item.subtitle}</p>
                                )}
                                <p className="cart-item__price">{item.price} ₴</p>
                                <div className="cart-item__qty">
                                    <button onClick={() => decrementItem(item.id)}>-</button>
                                    <span>{item.quantity}</span>
                                    <button onClick={() => incrementItem(item.id)}>+</button>
                                </div>
                            </div>
                            <button
                                className="cart-item__remove"
                                onClick={() => removeFromCart(item.id)}
                                aria-label="Remove item"
                            >
                                ×
                            </button>
                        </div>
                    ))}

                    <div className="cart-summary">
                        <p>Всього: {total} ₴</p>
                    </div>
                </div>
            )}

            <button className="checkout-btn" disabled={cartItems.length === 0}>
                Оформити покупку
            </button>
        </aside>
    );
}

export default CartSidebar;
