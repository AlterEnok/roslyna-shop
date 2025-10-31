import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import "./FounderSection.css";

import founderImg from "../../assets/founder.png";
import gelIcon from "../../assets/gell.png";
import capsulesIcon from "../../assets/capsula.png";

export default function FounderSection() {
    const [visible, setVisible] = useState(false);
    const sectionRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setVisible(true);
                        observer.disconnect();
                    }
                });
            },
            { threshold: 0.3 }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => {
            if (sectionRef.current) observer.unobserve(sectionRef.current);
        };
    }, []);

    return (
        <section className="founder" ref={sectionRef}>
            <div className="founder__container">

                <div className={`founder__image ${visible ? "show" : ""}`}>
                    <img src={founderImg} alt="Тетяна Опришко" className="founder__photo" />

                    <div className="founder__circle founder__circle--top">
                        <img src={gelIcon} alt="Гель" />
                    </div>

                    <div className="founder__circle founder__circle--bottom">
                        <img src={capsulesIcon} alt="Капсулы" />
                    </div>

                    <div className="founder__experience">
                        <span>3,5+ років досвіду</span>
                    </div>
                </div>


                <div className={`founder__content ${visible ? "show" : ""}`}>
                    <span className="founder__role">Засновник</span>

                    <h2 className="founder__name">
                        <span className="founder__firstname">Тетяна</span>
                        <span className="founder__lastname">Опришко</span>
                    </h2>

                    <p className="founder__text">
                        Мене звати Тетяна Опришко, я мама, жінка та підприємець, яка понад 3,5 роки будує свій шлях у
                        компанії «Рослина Карпат». <br />Я починала з нуля, але завдяки вірі в себе та сили карпатських трав стала
                        топ-лідером у кваліфікації «Діамант», відкрила власну фітоаптеку та допомогла сотням людей покращити
                        своє здоров’я.
                    </p>

                    <p className="founder__text second-text">
                        Моя найбільша цінність — ділитися знаннями та підтримкою. Тут ви знайдете індивідуальні програми
                        оздоровлення, натуральні фітопрепарати й команду, де кожна жінка може реалізуватися, отримати
                        фінансову свободу та відчути радість від улюбленої справи.
                    </p>

                    <Link to="/about" className="founder__button">
                        Дізнатись більше
                    </Link>
                </div>
            </div>
        </section>
    );
}
