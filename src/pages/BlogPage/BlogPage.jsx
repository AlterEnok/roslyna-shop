import React from "react";
import "./BlogPage.css";
import blogHero from "../../assets/blog-hero.jpg";
import Footer from "../../components/Footer/Footer";
import usePageTitle from "../../hooks/usePageTitle";
import blog1Img from "../../assets/blog1.jpg";
import { Helmet } from "react-helmet-async";

function BlogPage() {
    usePageTitle("Блог");
    return (
        <div className="blog-page">

            <Helmet>
                <title>Блог | Рослина Карпат</title>
                <meta
                    name="description"
                    content="Читайте корисні статті про натуральну косметику, поради по догляду за шкірою та історії з життя компанії Рослина Карпат."
                />
                <meta name="keywords" content="блог, натуральна косметика, рослина карпат, поради, краса, догляд за шкірою" />
                <meta property="og:title" content="Блог | Рослина Карпат" />
                <meta
                    property="og:description"
                    content="Історії, поради та новини від команди Рослина Карпат. Дізнавайтеся більше про натуральний догляд та натхнення природи."
                />
                <meta property="og:image" content={blogHero} />
                <meta property="og:type" content="website" />

            </Helmet>
            <section
                className="blog-hero"
                style={{ backgroundImage: `url(${blogHero})` }}
            >
                <div className="blog-hero__overlay">
                    <h1 className="blog-title">Блог</h1>
                </div>
                <div className="blog-bottom-overlay"></div>
            </section>

            <div className="blog-list">
                <a href="/blog/1" className="blog-card">
                    <div className="blog-card__image">
                        <img src={blog1Img} alt="Давайте знайомитися" />
                    </div>

                    <div className="blog-card__content">
                        <p className="blog-card__meta">
                            <span className="blog-card__meta-label">Автор:</span> Тетяна Опрішко
                        </p>
                        <h2 className="blog-card__title">Давайте знайомитися</h2>
                        <p className="blog-card__date">Дата: 07.10.2025</p>
                        <p className="blog-card__excerpt">
                            Мене звати Тетяна Опрішко. Я — мама двох чудових діток, яка колись
                            шукала шлях до змін, а сьогодні допомагає іншим знайти цей шлях.
                            Понад 3,5 роки я працюю в компанії «Рослина Карпат», і можу впевнено
                            сказати: це не просто бізнес — це справа, яка змінює життя...
                        </p>
                        <span className="blog-card__link">Побачити більше</span>
                    </div>

                </a>



            </div>

            <Footer />
        </div>
    );
}

export default BlogPage;
