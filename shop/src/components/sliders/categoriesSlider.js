import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const CategoriesSlider = () => {
  const { categories } = useSelector((e) => e.DataReducer);
  return (
    <>
      {categories.length > 0 && (
        <div className="categories-slider">
          <div className="container">
            <h2 style={{ textAlign: 'right' }}>קטגוריות</h2>
            <Swiper
              spaceBetween={30}
              modules={[Navigation]}
              navigation
              slidesPerView={3}
              loop={true}
              breakpoints={{
                767: {
                  slidesPerView: 5,
                },
                1024: {
                  slidesPerView: 7,
                },
              }}
            >
              {categories.map((category, index) => (
                <SwiperSlide key={index}>
                  <Link
                    to={`/category/${category.slug}`}
                    className="category-slider-item">
                    <img src={category.thumbnail} alt="" />
                    <h3>{category.name}</h3>
                  </Link>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      )}
    </>
  );
};

export default CategoriesSlider;
