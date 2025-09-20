// ProductList.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../ProductCard/ProductCard';
import './ProductList.css';

import product1Img from '../../assets/product1.png';
import product2Img from '../../assets/product2.png';
import product3Img from '../../assets/product3.png';
import product4Img from '../../assets/product4.png';

function ProductList({ addToCart, isLoggedIn, noTitle, products }) {
    // дефолтные товары для главной
    const defaultProducts = [
        {
            id: 1,
            title: "Рослина карпат: 6 в одному",
            subtitle: "Евкаліпт,чорний горіх,пижма,розторопша",
            price: 2490,
            image: product1Img,
        },
        {
            id: 2,
            title: "L-Карнітин PRO",
            subtitle: "Евкаліпт,чорний горіх,пижма,розторопша",
            price: 2690,
            image: product2Img,
        },
        {
            id: 3,
            title: "Журавлина СИРОП",
            subtitle: "Підтримка імунітету та здоров’я",
            price: 2590,
            image: product3Img,
        },
        {
            id: 4,
            title: "Антивірин Муршине дерево",
            subtitle: "Підтримка імунітету та здоров’я",
            price: 2590,
            image: product4Img,
        }
    ];

    // если передали products — используем их, иначе дефолтные
    const renderProducts = products && products.length > 0 ? products : defaultProducts;

    return (
        <section className="product-list">
            {!noTitle && (
                <h2 className="product-list__title">
                    Неймовірно <span>Популярні товари</span>
                </h2>
            )}

            <div className="product-list__grid">
                {renderProducts.map((product) => (
                    <ProductCard
                        key={product.id}
                        product={product}
                        addToCart={addToCart}
                        isLoggedIn={isLoggedIn}
                    />
                ))}
            </div>

            {!noTitle && (
                <div className="product-list__button-wrapper">
                    <Link to="/catalog" className="product-list__button">
                        Побачити всі
                    </Link>
                </div>
            )}
        </section>
    );
}

export default ProductList;
