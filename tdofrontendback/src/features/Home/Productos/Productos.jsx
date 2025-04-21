// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';
import './Productos.css'

// import required modules
import { FreeMode, Pagination } from 'swiper/modules';
import { useMediaQuery } from '@react-hook/media-query';

export default function App() {

    const isSmallScreen = useMediaQuery('(max-width: 600px)');
    const isMediumScreen = useMediaQuery('(min-width: 601px) and (max-width: 990px)');
    const isLargeScreen = useMediaQuery('(min-width: 991px) and (max-width: 1200px)');
    const isExtraLargeScreen = useMediaQuery('(min-width: 1201px)');
    const getSlidesPerView = () => {
        if (isSmallScreen) return 2;
        if (isMediumScreen) return 3;
        if (isLargeScreen) return 4;
        if (isExtraLargeScreen) return 5;
        return 5
      };

  return (
    <>
    <h2>Nuetros productos</h2>
      <Swiper
        slidesPerView={getSlidesPerView()}
        spaceBetween={30}
        freeMode={true}
        pagination={{
          clickable: true,
        }}
        modules={[FreeMode, Pagination]}
        className="mySwiper"
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
