import React,{ useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Thumbs } from 'swiper';

const GallerySlider = ({gallery}) => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  return (
    <div className='gallerySlider'>
      <Swiper
          spaceBetween={20}
          modules={[Navigation, Thumbs]}
          navigation
          slidesPerView={1}
          loop={true}
          className='preview-slides'
          thumbs={{ swiper: thumbsSwiper }}
        >
          {
            gallery.map((img, index) => (
              <SwiperSlide key={index}>
                <img src={img} alt='product-img' />
              </SwiperSlide>
            ))
          }
        </Swiper>
        <Swiper
          spaceBetween={20}
          modules={[Navigation]}
          navigation
          slidesPerView={4}
          loop={true}
          className='gallery-slides'
          onSwiper={setThumbsSwiper}
        >
          {
            gallery.map((img, index) => (
              <SwiperSlide key={index}>
                <img src={img} alt='product-img' />
              </SwiperSlide>
            ))
          }
        </Swiper>
    </div>
  )
}

export default GallerySlider;