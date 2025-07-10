import React from 'react';
import { Link } from 'react-router-dom';
import './ProductCard.css';

function ProductCard({ product }) {
    return (
        <div className="product-card">
            <div className="product-card__image-wrapper">
                <img
                    src={product.image}
                    alt={product.title}
                    className="product-card__image"
                />
            </div>
            <div className="product-card__info">
                <h2 className="product-card__title">{product.title}</h2>
                <p className="product-card__price">${product.price}</p>
                <Link to={`/product/${product.id}`}>
                    <button className="product-card__button">See more</button>
                </Link>
            </div>
        </div>
    );
}

export default ProductCard;
