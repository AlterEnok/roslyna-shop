import React, { useState } from "react";
import "./Certificate.css";
import Footer from "../../components/Footer/Footer";
import usePageTitle from "../../hooks/usePageTitle";

import cert1 from "../../assets/cert1.png";
import cert2 from "../../assets/cert2.png";

function Certificates() {
    usePageTitle("Сертифікати");
    const [selectedImage, setSelectedImage] = useState(null);

    const openImage = (src) => {
        setSelectedImage(src);
        document.body.style.overflow = "hidden";
    };

    const closeImage = () => {
        setSelectedImage(null);
        document.body.style.overflow = "auto";
    };

    return (
        <>
            <section className="certificates-page">
                <div className="certificates-page__container">
                    <h1 className="certificates-page__title">Сертифікати якості</h1>
                    <p className="certificates-page__text">
                        Ми дбаємо про якість та безпеку нашої продукції. Нижче ви можете ознайомитися
                        з офіційними сертифікатами, які підтверджують відповідність стандартам.
                    </p>

                    <div className="certificates-page__gallery">
                        <div className="certificates-page__item" onClick={() => openImage(cert1)}>
                            <img src={cert1} alt="Сертифікат 1" />
                        </div>
                        <div className="certificates-page__item" onClick={() => openImage(cert2)}>
                            <img src={cert2} alt="Сертифікат 2" />
                        </div>
                    </div>
                </div>
            </section>

            {selectedImage && (
                <div className="image-modal" onClick={closeImage}>
                    <div className="image-modal__content" onClick={(e) => e.stopPropagation()}>
                        <button className="image-modal__close" onClick={closeImage}>
                            ✕
                        </button>
                        <img src={selectedImage} alt="Сертифікат" />
                    </div>
                </div>
            )}

            <Footer />
        </>
    );
}

export default Certificates;
