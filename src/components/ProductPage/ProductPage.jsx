import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './ProductPage.css';

function ProductPage({ addToCart }) {
    const { id } = useParams();

    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        setLoading(true);
        setError(null);

        // Заглушка данных для продукта по id
        const dummyProduct = {
            id: Number(id),
            title: 'Luxury Watch',
            price: 499,
            description: 'A very luxurious watch.',
            images: [
                'https://images.unsplash.com/photo-1519744792095-2f2205e87b6f?auto=format&fit=crop&w=500&q=80',
                'https://images.unsplash.com/photo-1503602642458-232111445657?auto=format&fit=crop&w=500&q=80',
            ],
        };

        // Можно добавить задержку для имитации загрузки, например:
        const timer = setTimeout(() => {
            setProduct(dummyProduct);
            setLoading(false);
        }, 500);

        return () => clearTimeout(timer);
    }, [id]);

    if (loading) {
        return <div className="product-page__loading">Загрузка...</div>;
    }

    if (error) {
        return <div className="product-page__error">Ошибка: {error}</div>;
    }

    if (!product) {
        return <div className="product-page__empty">Продукт не найден</div>;
    }

    return (
        <section className="product-page">
            <div className="product-page__container">
                <div className="product-page__images">
                    {product.images && product.images.map((img, idx) => (
                        <img
                            key={idx}
                            src={img}
                            alt={`${product.title} ${idx + 1}`}
                            className="product-page__image"
                        />
                    ))}
                </div>
                <div className="product-page__details">
                    <h1 className="product-page__title">{product.title}</h1>
                    <p className="product-page__price">${product.price}</p>
                    <p className="product-page__description">{product.description}</p>
                    <button
                        className="product-page__button"
                        onClick={() => addToCart({
                            id: product.id,
                            title: product.title,
                            price: product.price,
                            image: product.images && product.images[0],
                            quantity: 1,
                        })}
                    >
                        Add to Cart
                    </button>
                </div>
            </div>
        </section>
    );
}

export default ProductPage;
