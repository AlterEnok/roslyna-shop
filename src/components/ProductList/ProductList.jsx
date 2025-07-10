import React, { useEffect, useState } from 'react';
import ProductCard from '../ProductCard/ProductCard';
import './ProductList.css';

function ProductList({ addToCart }) {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        // Заглушка — пример массива товаров
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
            // добавь сколько хочешь товаров
        ];

        // Вместо fetch — сразу устанавливаем данные
        setProducts(dummyProducts);
    }, []);

    return (
        <section className="product-list">
            <h2 className="product-list__title">Best Products</h2>
            <div className="product-list__grid">
                {products.map((product) => (
                    <ProductCard key={product.id} product={product} addToCart={addToCart} />
                ))}
            </div>
        </section>
    );
}

export default ProductList;
