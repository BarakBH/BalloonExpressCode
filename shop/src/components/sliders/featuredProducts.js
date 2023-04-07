import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const FeaturedProducts = () => {
  const { products } = useSelector((state) => state.DataReducer);
  return (
    <>
      {products.length > 0 && (
        <div className="featured-slider">
          <div className="container">
            <Swiper
              spaceBetween={30}
              modules={[Navigation]}
              navigation
              slidesPerView={1}
              loop={true}>
              {products
                .filter((e) => e.isFeatured)
                .map((product, index) => (
                  <SwiperSlide key={index}>
                    <div className="featured-slider__item">
                      <div className="content">
                        <h2>{product.name}</h2>
                        <h6>{product.shortDesc}</h6>
                        <Link className="btn" to={`/${product.slug}`}>
                          ? רוצים לשמוע עוד
                        </Link>
                      </div>
                      <div className="thumbnail">
                        <img src={product.thumbnail} alt="product" />
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
            </Swiper>
          </div>
        </div>
      )}
    </>
  );
};

export default FeaturedProducts;
