import { useTranslation } from 'react-i18next';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, A11y } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import './Reviews.css';
import reviewImage from '../../assets/review.jpg';

function ReviewSection() {
    const { t } = useTranslation();

    const reviews = t('reviews.items', { returnObjects: true });

    return (
        <section className="review-section">
            <div className="review-section__left">
                <div className="review-section__content">
                    <p className="review-section__subtitle">{t('reviews.subtitle')}</p>
                    <p className="review-section__desc">{t('reviews.description')}</p>

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
