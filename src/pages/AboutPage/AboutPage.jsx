import React from "react";
import "./AboutPage.css";
import heroImg from "../../assets/about-hero.jpg";
import aboutVideo from "../../assets/about-video.mp4";
import partnersImg from "../../assets/partners.jpg";
import Footer from "../../components/Footer/Footer";

function AboutPage() {
    return (
        <div className="about-page">


            <section
                className="about-hero"
                style={{ backgroundImage: `url(${heroImg})` }}
            >
                <div className="about-hero__overlay">
                    <h1 className="about-title">Про нас</h1>
                </div>
                <div className="about-bottom-overlay"></div>
            </section>


            <section className="about-body">
                <div className="about-body__header">
                    <span className="about-pill">Про компанію «Рослина Карпат»</span>
                </div>

                <div className="about-body__content">

                    <div className="about-text">
                        <h2>«Рослина Карпат» — це одна з трьох провідних компаній України у сфері фітопрепаратів.</h2>
                        <p>
                            Ми — не маленьке виробництво, а великий сучасний бренд із власною територією, лабораторіями, складськими та виробничими потужностями. Наш замкнений цикл виробництва дозволяє контролювати якість від першої зібраної трави до останньої капсули у вашій баночці.

                        </p>
                        <p>
                            Наші виробничі потужності — одні з найбільших в Україні у сфері фітопрепаратів. Це гарантує стабільність, масштаб і водночас індивідуальний підхід для кожного клієнта.

                        </p>
                        <p>
                            Продукцію створюють українські лікарі та фітотерапевти.
                            Їй довіряють інші лікарі, які рекомендують наші засоби своїм пацієнтам, адже вони:

                        </p>
                    </div>


                    <div className="about-video">
                        <video autoPlay loop muted playsInline>
                            <source src={aboutVideo} type="video/mp4" />
                            Ваш браузер не підтримує відео.
                        </video>
                    </div>
                </div>
            </section>

            <section className="about-features">
                <div className="feature-item">Натуральні та екологічно чисті</div>
                <div className="feature-item">Сертифіковані</div>
                <div className="feature-item">Перевірені роками</div>
                <div className="feature-item">Ефективні у практиці</div>
            </section>



            <section className="about-partners">

                <div className="partners-img">
                    <img src={partnersImg} alt="Продукція" />
                </div>


                <div className="partners-text">
                    <div className="partners-box">
                        <h3> Для партнерів</h3>
                        <p>
                            Ми відкриваємо двері у світ нових можливостей.
                            Завдяки нашому щедрому маркетингу ви можете не лише оздоровлюватися самі, а й будувати власний бізнес.
                        </p>
                        <ul>
                            <li>гідний дохід і фінансову свободу,</li>
                            <li>визнання та золоті нагороди,</li>
                            <li>стильні прикраси й подарунки,</li>
                            <li>подорожі та корпоративні заходи,</li>
                            <li>постійну підтримку наставників і командне навчання.</li>
                        </ul>
                    </div>

                    <div className="partners-box">
                        <h3> Для клієнтів</h3>
                        <p>
                            Ми створюємо індивідуальні програми, а не однакові бокси для всіх.
                            Кожна людина отримує саме те, що потрібно її організму саме зараз:
                        </p>
                        <ul>
                            <li>очищення і детокс,</li>
                            <li>зміцнення імунітету,</li>
                            <li>відновлення енергії та сил,</li>
                            <li>програми для схуднення,</li>
                            <li>рішення для краси волосся і шкіри.</li>
                        </ul>
                        <p>
                            У нас ви не купуєте «просто продукт» — ви отримуєте турботу, результат і відчуття змін.
                        </p>
                    </div>
                </div>
            </section>

            <section className="about-cta">
                <div className="cta-box">
                    <p>
                        <span className="cta-icon">💚</span>
                        Обираючи «Рослину Карпат», ви отримуєте силу карпатських трав, довіру лікарів і надійність компанії, яка входить у ТОП-3 виробників фітопрепаратів в Україні.
                    </p>
                </div>

                <a href="/catalog" className="cta-button">Почати закуп</a>
            </section>

            <Footer />

        </div>
    );
}

export default AboutPage;
