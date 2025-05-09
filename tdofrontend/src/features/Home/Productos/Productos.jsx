// src/features/Home/Productos/Productos.jsx

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';
import './Productos.css';

// import required modules
import { FreeMode, Pagination } from 'swiper/modules';

export default function ProductosSwiper() {
  return (
    <>
      <h2>Nuestros productos</h2>
      <Swiper
        spaceBetween={30}
        freeMode={true}
        pagination={{ clickable: true }}
        modules={[FreeMode, Pagination]}
        className="mySwiper"
        breakpoints={{
          // width >= 0px
          0:   { slidesPerView: 2 },
          // width >= 601px
          601: { slidesPerView: 3 },
          // width >= 991px
          991: { slidesPerView: 4 },
          // width >= 1201px
          1201:{ slidesPerView: 5 },
        }}
      >
        <SwiperSlide>Remeras</SwiperSlide>
        <SwiperSlide>Buzos</SwiperSlide>
        <SwiperSlide>Camperas</SwiperSlide>
        <SwiperSlide>Gorras</SwiperSlide>
        <SwiperSlide>Gorritos</SwiperSlide>
      </Swiper>
    </>
  );
}
