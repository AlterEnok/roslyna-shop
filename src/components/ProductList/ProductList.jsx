import React, { useEffect, useState } from 'react';
import ProductCard from '../ProductCard/ProductCard';
import { Link } from 'react-router-dom';
import './ProductList.css';

function ProductList({ addToCart, isPreview = false }) {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const dummyProducts = [
            {
                id: 1,
                title: 'Luxury Watch',
                price: 499,
                image: 'https://images.unsplash.com/photo-1519744792095-2f2205e87b6f?auto=format&fit=crop&w=500&q=80',
            },
            {
                id: 2,
                title: 'Classic Leather Wallet',
                price: 129,
                image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=500&q=80',
            },
            {
                id: 3,
                title: 'Herbal Drops',
                price: 49,
                image: 'https://images.unsplash.com/photo-1582719478177-2fd1aebd6f2b?auto=format&fit=crop&w=500&q=80',
            },
            {
                id: 4,
                title: 'Capsule Pack',
                price: 89,
                image: 'https://images.unsplash.com/photo-1588776814546-ec7e45ba1ab2?auto=format&fit=crop&w=500&q=80',
            },
            {
                id: 5,
                title: 'Essential Oil',
                price: 99,
                image: 'https://images.unsplash.com/photo-1589987607627-2ba9c1d5fdc5?auto=format&fit=crop&w=500&q=80',
            },
            {
                id: 6,
                title: 'Organic Tea',
                price: 35,
                image: 'https://images.unsplash.com/photo-1612197574088-6a9a45e1624a?auto=format&fit=crop&w=500&q=80',
            },
        ];

        setProducts(dummyProducts);
    }, []);

    const productsToShow = isPreview ? products.slice(0, 6) : products;

    return (
        <section className="product-list">
            {isPreview && (
                <h2 className="product-list__title">
                    <span>Неймовірно</span><br />
                    <span>Популярні Товари</span>
                </h2>
            )}

            <div className="product-list__grid">
                {productsToShow.map((product) => (
                    <ProductCard key={product.id} product={product} addToCart={addToCart} />
                ))}
            </div>

            {isPreview && (
                <div className="product-list__more">
                    <Link to="/catalog" className="product-list__more-button">
                        Побачити все
                    </Link>
                </div>
            )}
        </section>
    );
}

export default ProductList;
