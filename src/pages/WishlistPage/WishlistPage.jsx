import React, { useContext } from "react";
import WishlistContext from "../../context/WishlistContext";
import ProductCard from "../../components/ProductCard/ProductCard";
import "../../components/ProductCard/ProductCard.css";
import "./WishlistPage.css";

function WishlistPage() {
    const { wishlist } = useContext(WishlistContext);

    if (wishlist.length === 0) {
        return (
            <p className="wishlist-empty">
                Ваш список бажань порожній
            </p>
        );
    }


    return (
        <section className="wishlist">
            <h2 className="wishlist__title">Мій список бажань</h2>
            <div className="wishlist__grid">
                {wishlist.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        </section>
    );
}

export default WishlistPage;
