import './CartOverlay.css';

function CartOverlay({ onClick }) {
    return <div className="cart-overlay" onClick={onClick}></div>;
}

export default CartOverlay;
