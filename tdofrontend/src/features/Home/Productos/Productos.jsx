// src/features/Home/Productos/Productos.jsx
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';
import './Productos.css';
import { FreeMode, Pagination } from 'swiper/modules';

export default function ProductosSwiper() {
  const products = [
    { id: 'remeras',  title: 'Remeras',  image: '/Images/Productos/remeras.png' },
    { id: 'buzos',    title: 'Buzos',    image: '/Images/Productos/buzos.png' },
    { id: 'camperas', title: 'Camperas', image: '/Images/Productos/camperas.png' },
    { id: 'gorras',   title: 'Gorras',   image: '/Images/Productos/gorras.png' },
    { id: 'gorritos', title: 'Rockys',   image: '/Images/Productos/rockys.png' },
    { id: 'pilusos',  title: 'Pilusos',  image: '/Images/Productos/pilusos.png' }
  ];

  const colors = ['#FFF4E6', '#E8F7FF', '#F0FDF4', '#FFF7ED', '#F8EEF8'];

  return (
    <>
      {/* usa la misma clase que el resto de secciones */}
      <h2 className="home-section__title">Nuestros productos</h2>

      <Swiper
        spaceBetween={30}
        freeMode
        pagination={{ clickable: true }}
        modules={[FreeMode, Pagination]}
        className="productos-swiper"
        breakpoints={{
          0:    { slidesPerView: 2 },
          601:  { slidesPerView: 3 },
          991:  { slidesPerView: 4 },
          1201: { slidesPerView: 5 },
        }}
      >
        {products.map((p, idx) => (
          <SwiperSlide
            key={p.id}
            className="producto-slide"
            style={{ backgroundColor: colors[idx % colors.length] }}
          >
            <figure className="producto-figure">
              <img
                src={p.image}
                alt={p.title}
                loading="lazy"
                className="producto-image"
              />
              <figcaption className="producto-caption" title={p.title}>
                {p.title}
              </figcaption>
            </figure>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}
