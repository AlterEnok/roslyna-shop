import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaHeart, FaCheck } from "react-icons/fa";
import AuthContext from "../../context/AuthContext";
import CartContext from "../../context/CartContext";
import WishlistContext from "../../context/WishlistContext";
import "./ProductCard.css";

function ProductCard({ product }) {
    const { user } = useContext(AuthContext);
    const { cartItems, addToCart, removeFromCart } = useContext(CartContext);
    const { wishlist, toggleWishlist } = useContext(WishlistContext);
    const navigate = useNavigate();

    const isInCart = cartItems.some((item) => item.id === product.id);
    const isInWishlist = wishlist.some((item) => item.id === product.id);

    const handleAddClick = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (!isInCart) {
            addToCart(product);
        } else {
            removeFromCart(product.id);
        }
    };

    return (
        <Link to={`/product/${product.id}`} className="product-card">
            <div className="product-card__image-wrapper">
                <img src={product.image} alt={product.title} className="product-card__image" />
            </div>

            <div className="product-card__info">
                <h2 className="product-card__title">{product.title}</h2>
                {product.subtitle && <p className="product-card__subtitle">{product.subtitle}</p>}

                <div className="product-card__actions">
                    <span className="product-card__price">{product.price} грн</span>
                    <div className="product-card__buttons">
                        {user && (
                            <button
                                className={`product-card__fav ${isInWishlist ? "active" : ""}`}
                                onClick={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    toggleWishlist(product);
                                }}
                            >
                                <FaHeart />
                            </button>
                        )}
                        <button
                            className={`product-card__add ${isInCart ? "added" : ""}`}
                            onClick={handleAddClick}
                        >
                            {isInCart ? <FaCheck /> : "+"}
                        </button>
                    </div>
                </div>

                <button
                    className="product-card__details"
                    onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        navigate(`/product/${product.id}`);
                    }}
                >
                    Детальніше
                </button>
            </div>
        </Link>
    );
}

export default ProductCard;
