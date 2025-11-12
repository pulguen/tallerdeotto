// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import './ServiciosDestacados.css';

// import required modules
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import '../../../styles/fonts.css'; // utilidades de fuentes

export default function ServiciosDestacados({
  slidesData,
  fetchFromApi = false,
  apiEndpoint = '/api/servicios'
}) {
  const defaultSlides = [
    {
      id: 1,
      title: 'Diseño Gráfico',
      description: 'Identidad visual, flyers, catálogos y piezas para redes sociales.',
      image: '/Images/Servicios/diseno-grafico.png',
      alt: 'Muestras de diseño gráfico',
      cta: 'Ver porfolio',
      link: '/servicios/diseño-gráfico'
    },
    {
      id: 2,
      title: 'Social Media Management',
      description: 'Gestión integral de redes: planificación, contenido, métricas y campañas.',
      image: '/Images/Servicios/social-media.png',
      alt: 'Gestión profesional de redes sociales y marketing digital',
      cta: 'Conocer más',
      link: '/contacto'
    },
    {
      id: 3,
      title: 'Diseño web',
      description: 'Sitios rápidos en React/Next, optimizados para SEO.',
      image: '/Images/Servicios/diseno-web.png',
      alt: 'Diseño de sitios web',
      cta: 'Solicitar presupuesto',
      link: '/contacto'
    },
    {
      id: 4,
      title: 'Serigrafía - Vinilo - DTF',
      description: 'Estampado de indumentaria, textiles y más.',
      image: '/Images/Servicios/serigrafia.png',
      alt: 'Estampado sobre remeras',
      cta: 'Ver opciones',
      link: '/servicios/estampado'
    },
    {
      id: 5,
      title: 'Desarrollo de Software',
      description: 'Apps a medida, paneles y automatizaciones.',
      image: '/Images/Servicios/desarrollo-software.png',
      alt: 'Código en editor',
      cta: 'Charlemos tu proyecto',
      link: '/contacto'
    },
    {
      id: 6,
      title: 'Impresiones profesionales',
      description: 'Digital y offset de alta calidad en folletos, tarjetas y gran formato.',
      image: '/Images/Servicios/impresiones.png',
      alt: 'Ejemplos de impresiones',
      cta: 'Solicitar presupuesto',
      link: '/contacto'
    }
  ];

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

  const [localSlides, setLocalSlides] = useState(() =>
    Array.isArray(slidesData) && slidesData.length ? normalizeSlides(slidesData) : defaultSlides
  );

  useEffect(() => {
    if (Array.isArray(slidesData) && slidesData.length) {
      setLocalSlides(normalizeSlides(slidesData));
      return;
    }
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
        .catch(() => {});
      return () => { cancelled = true; };
    }
  }, [slidesData, fetchFromApi, apiEndpoint]);

  return (
    <>
      <h2 className="titulo-servicios-destacados">Servicios Destacados</h2>
      <Swiper
        centeredSlides={false}
        slidesPerView={1}
        spaceBetween={12}
        autoplay={{ delay: 5500, disableOnInteraction: false }}
        pagination={{ dynamicBullets: true, clickable: true }}
        navigation
        breakpoints={{
          640: { slidesPerView: 1.2, spaceBetween: 14, centeredSlides: true },
          768: { slidesPerView: 2, spaceBetween: 16 },
          1024: { slidesPerView: 3, spaceBetween: 20 }
        }}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
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
                  {/* Título overlay centrado arriba */}
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
                  {/* Si no hay título arriba de la imagen, mostramos uno normal en contenido */}
                  {!hasTitle && (
                    <h3 className="slide-title no-overlay ff-brokenscript-cond">
                      {s.title || 'Servicio'}
                    </h3>
                  )}
                  <p className="slide-desc">{s.description}</p>
                  <a
                    className="slide-cta"
                    href={s.link || '#'}
                    target={s.link && s.link.startsWith('http') ? '_blank' : '_self'}
                    rel={s.link && s.link.startsWith('http') ? 'noopener noreferrer' : undefined}
                    aria-label={`${s.cta} - ${s.title || 'Servicio'}`}
                  >
                    {s.cta}
                  </a>
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
