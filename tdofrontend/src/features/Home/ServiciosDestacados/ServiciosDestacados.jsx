// src/features/Home/ServiciosDestacados/ServiciosDescatados.jsx

import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';

// Estilos Swiper
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

// Componentes y Estilos locales
import CustomButton from "../../../common/Components/Button/CustomButton";
import './ServiciosDestacados.css';
import '../../../styles/fonts.css';

// ✅ Data compartida
import { SERVICIOS_DESTACADOS_DEFAULT } from './ServiciosDestacadosData.js';

export default function ServiciosDestacados({
  slidesData,
  fetchFromApi = false,
  apiEndpoint = '/api/servicios'
}) {
  const normalizeSlides = (raw = []) => {
    if (!Array.isArray(raw)) return [];
    return raw.map((item, idx) => ({
      id: item.id ?? item.slug ?? idx,
      title: item.title ?? item.name ?? '',
      description: item.description ?? item.summary ?? '',
      image: item.imageUrl ?? item.image ?? '/images/default-servicio.jpg',
      alt: item.alt ?? item.imageAlt ?? item.title ?? 'Servicio',
      cta: item.ctaText ?? item.button ?? 'Ver detalle',
      link: item.url ?? item.link ?? item.path ?? '#'
    }));
  };

  // Estado local inicializado con la data por defecto o la prop
  const [localSlides, setLocalSlides] = useState(() => {
    if (Array.isArray(slidesData) && slidesData.length) {
      return normalizeSlides(slidesData);
    }
    // Fallback seguro por si el import falla (aunque no debería)
    return Array.isArray(SERVICIOS_DESTACADOS_DEFAULT) ? SERVICIOS_DESTACADOS_DEFAULT : [];
  });

  useEffect(() => {
    // Si la prop slidesData cambia y tiene datos, actualizamos
    if (Array.isArray(slidesData) && slidesData.length) {
      setLocalSlides(normalizeSlides(slidesData));
      return;
    }

    // Si se activa fetchFromApi, buscamos los datos (opcional)
    if (fetchFromApi) {
      let cancelled = false;
      fetch(apiEndpoint)
        .then((res) => {
          if (!res.ok) throw new Error('Error cargando servicios');
          return res.json();
        })
        .then((data) => {
          if (cancelled) return;
          const normalized = normalizeSlides(data);
          if (normalized.length) setLocalSlides(normalized);
        })
        .catch((err) => console.warn('Error fetching slides:', err));

      return () => { cancelled = true; };
    }
  }, [slidesData, fetchFromApi, apiEndpoint]);

  return (
    <>
      <h2 className="titulo-servicios-destacados">Servicios Destacados</h2>

      <Swiper
        modules={[Autoplay, Navigation, Pagination]}
        centeredSlides={false}
        slidesPerView={1}
        spaceBetween={12}
        navigation
        pagination={{ clickable: true, dynamicBullets: true }}
        loop={true}
        autoplay={{ delay: 5500, disableOnInteraction: false }}
        breakpoints={{
          640: { slidesPerView: 1.2, spaceBetween: 14, centeredSlides: true },
          768: { slidesPerView: 2, spaceBetween: 16 },
          1024: { slidesPerView: 3, spaceBetween: 20 }
        }}
        className="servicios-swiper"
        aria-label="Carrusel de servicios destacados"
      >
        {localSlides.map((s) => {
          const hasTitle = Boolean(s.title && s.title.trim());
          const titleId = hasTitle ? `slide-title-${s.id}` : undefined;

          return (
            <SwiperSlide key={s.id} className="swiper-slide-destacados">
              <article
                className="slide-card"
                role="group"
                aria-labelledby={titleId}
                {...(!hasTitle ? { 'aria-label': s.alt || 'Servicio' } : {})}
              >
                <div className="slide-media">
                  {hasTitle && (
                    <div className="slide-title-overlay">
                      <h3 id={titleId} className="slide-title ff-brokenscript-cond">
                        {s.title}
                      </h3>
                    </div>
                  )}

                  <img
                    src={s.image}
                    alt={s.alt || s.title || 'Servicio'}
                    loading="lazy"
                    className="slide-image"
                  />
                </div>

                <div className="slide-content">
                  {!hasTitle && (
                    <h3 className="slide-title no-overlay ff-brokenscript-cond">
                      {s.title || 'Servicio'}
                    </h3>
                  )}

                  <p className="slide-desc">{s.description}</p>

                  <CustomButton
                    as="a"
                    href={s.link || '#'}
                    target={s.link && s.link.startsWith('http') ? '_blank' : undefined}
                    rel={s.link && s.link.startsWith('http') ? 'noopener noreferrer' : undefined}
                    variant="primary"
                    className="slide-cta-btn"
                  >
                    {s.cta}
                  </CustomButton>
                </div>
              </article>
            </SwiperSlide>
          );
        })}
      </Swiper>

    </>
  );
}

ServiciosDestacados.propTypes = {
  slidesData: PropTypes.arrayOf(PropTypes.object),
  fetchFromApi: PropTypes.bool,
  apiEndpoint: PropTypes.string
};

ServiciosDestacados.defaultProps = {
  slidesData: undefined,
  fetchFromApi: false,
  apiEndpoint: '/api/servicios'
};
