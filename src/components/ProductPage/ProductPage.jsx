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

        // Всё в этом компоненте — как ты просил
        const dummyProducts = [
            {
                id: 1,
                title: 'Luxury Watch',
                price: 499,
                description: 'A very luxurious watch.',
                images: [
                    'https://images.unsplash.com/photo-1519744792095-2f2205e87b6f?auto=format&fit=crop&w=500&q=80',
                    'https://images.unsplash.com/photo-1503602642458-232111445657?auto=format&fit=crop&w=500&q=80',
                ],
            },
            {
                id: 2,
                title: 'Classic Leather Wallet',
                price: 129,
                description: 'Elegant and functional wallet for everyday use.',
                images: [
                    'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=500&q=80',
                    'https://images.unsplash.com/photo-1589987607627-2ba9c1d5fdc5?auto=format&fit=crop&w=500&q=80',
                ],
            },
            {
                id: 3,
                title: 'Herbal Drops',
                price: 49,
                description: 'Natural herbal drops for wellness.',
                images: [
                    'https://images.unsplash.com/photo-1582719478177-2fd1aebd6f2b?auto=format&fit=crop&w=500&q=80',
                ],
            },
            {
                id: 4,
                title: 'Capsule Pack',
                price: 89,
                description: 'Capsules with natural ingredients for daily intake.',
                images: [
                    'https://images.unsplash.com/photo-1588776814546-ec7e45ba1ab2?auto=format&fit=crop&w=500&q=80',
                ],
            },
            {
                id: 5,
                title: 'Essential Oil',
                price: 99,
                description: 'Aromatic oil for relaxation and therapy.',
                images: [
                    'https://images.unsplash.com/photo-1589987607627-2ba9c1d5fdc5?auto=format&fit=crop&w=500&q=80',
                ],
            },
            {
                id: 6,
                title: 'Organic Tea',
                price: 35,
                description: 'Refreshing organic tea from mountain herbs.',
                images: [
                    'https://images.unsplash.com/photo-1612197574088-6a9a45e1624a?auto=format&fit=crop&w=500&q=80',
                ],
            },
        ];

        const found = dummyProducts.find((p) => p.id === Number(id));

        const timer = setTimeout(() => {
            if (found) {
                setProduct(found);
            } else {
                setError('Product not found');
            }
            setLoading(false);
        }, 300);

        return () => clearTimeout(timer);
    }, [id]);

    if (loading) return <div className="product-page__loading">Загрузка...</div>;
    if (error) return <div className="product-page__error">Ошибка: {error}</div>;
    if (!product) return <div className="product-page__empty">Продукт не найден</div>;

    return (
        <section className="product-page">
            <div className="product-page__container">
                <div className="product-page__images">
                    {product.images.map((img, idx) => (
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
                        onClick={() =>
                            addToCart({
                                id: product.id,
                                title: product.title,
                                price: product.price,
                                image: product.images[0],
                                quantity: 1,
                            })
                        }
                    >
                        Add to Cart
                    </button>
                </div>
            </div>
        </section>
    );
}

export default ProductPage;
