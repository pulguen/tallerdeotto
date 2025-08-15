// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import './ServiciosDestacados.css';

// import required modules
import { Autoplay, Pagination, Navigation } from 'swiper/modules';

export default function ServiciosDestacados() {
  return (
    <>
      <h2 className='titulo-servicios-destacados'>Servicios Destacados</h2>
      <Swiper
        centeredSlides={true}
        autoplay={{delay:5500}}
        pagination={{dynamicBullets:true,clickable:true}}
        modules={[Autoplay,Pagination,Navigation]}
        className="mySwiper"
      >
        <SwiperSlide className='swiper-slide-descatados'>Slide 1</SwiperSlide>
        <SwiperSlide className='swiper-slide-descatados'>Slide 2</SwiperSlide>
        <SwiperSlide className='swiper-slide-descatados'>Slide 3</SwiperSlide>
        <SwiperSlide className='swiper-slide-descatados'>Slide 4</SwiperSlide>
        <SwiperSlide className='swiper-slide-descatados'>Slide 5</SwiperSlide>
      </Swiper>
    </>
  );
}
