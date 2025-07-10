import './CartSidebar.css';

function CartSidebar({ isOpen, items, onRemove, onIncrement, onDecrement }) {
    const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

    return (
        <aside className={`cart-sidebar ${isOpen ? 'cart-sidebar--open' : ''}`}>
            <h2>Your Cart</h2>

            {items.length === 0 ? (
                <p>Your cart is empty</p>
            ) : (
                <div className="cart-items">
                    {items.map(item => (
                        <div className="cart-item" key={item.id}>
                            <img src={item.image} alt={item.name} className="cart-item__image" />
                            <div className="cart-item__details">
                                <h4 className="cart-item__name">{item.name}</h4>
                                <p className="cart-item__price">${item.price}</p>
                                <div className="cart-item__qty">
                                    <button onClick={() => onDecrement(item.id)}>-</button>
                                    <span>{item.quantity}</span>
                                    <button onClick={() => onIncrement(item.id)}>+</button>
                                </div>
                            </div>
                            <button
                                className="cart-item__remove"
                                onClick={() => onRemove(item.id)}
                                aria-label="Remove item"
                            >
                                ×
                            </button>
                        </div>
                    ))}

                    <div className="cart-summary">
                        <p>Total: ${total}</p>
                    </div>
                </div>
            )}
        </aside>
    );
}

export default CartSidebar;
