import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, A11y } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import './Reviews.css';
import reviewImage from '../../assets/review.jpg';

const reviews = [
    {
        author: 'Дмитро Литвинов',
        text: 'Ціна та якість повністю співпадають, не очікував такого ефекту, приємно здивований, рекомендую.',
    },
    {
        author: 'Ольга Остапенко',
        text: 'Продукт спрацював краще, ніж очікувала. Замовлятиму ще!',
    },
    {
        author: 'Ілля Дробний',
        text: 'Дійсно ефективно. Все прийшло швидко, гарне пакування.',
    },
];

function ReviewSection() {
    return (
        <section className="review-section">
            <div className="review-section__left">
                <div className="review-section__content">
                    <p className="review-section__subtitle">Що кажуть наші користувачі:</p>
                    <p className="review-section__desc">
                        Тут люди діляться своїми враженнями та досвідом використання продукції.
                    </p>

                    <Swiper
                        modules={[Navigation, Pagination, A11y]}
                        navigation={{
                            nextEl: '.review-next',
                            prevEl: '.review-prev',
                        }}
                        pagination={{
                            el: '.review-pagination',
                            clickable: true,
                        }}
                        loop={true}
                        spaceBetween={30}
                        slidesPerView={1}
                        className="review-swiper"
                        breakpoints={{
                            768: {
                                navigation: {
                                    nextEl: '.review-next',
                                    prevEl: '.review-prev',
                                },
                                pagination: false,
                            },
                            0: {
                                navigation: false,
                                pagination: {
                                    el: '.review-pagination',
                                    clickable: true,
                                },
                            },
                        }}
                    >
                        {reviews.map((review, index) => (
                            <SwiperSlide key={index}>
                                <div className="review-section__slide">
                                    <p className="review-section__author">{review.author}</p>
                                    <p className="review-section__text">{review.text}</p>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>

                    <div className="review-section__buttons">
                        <button className="review-prev">&larr;</button>
                        <button className="review-next">&rarr;</button>
                    </div>

                    <div className="review-pagination"></div>
                </div>
            </div>

            <div className="review-section__right">
                <img src={reviewImage} alt="Review visual" />
            </div>
        </section>
    );
}

export default ReviewSection;
