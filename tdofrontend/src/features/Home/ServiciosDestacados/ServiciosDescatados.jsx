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
import '../../../styles/fonts.css'; // <-- importar utilidades de fuentes

export default function ServiciosDestacados({ slidesData, fetchFromApi = false, apiEndpoint = '/api/servicios' }) {
  // Ejemplo de datos estáticos; reemplaza por props o fetch si necesitas datos dinámicos
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
      title: 'Diseño web',
      description: 'Sitios rápidos en React/Next, omptimizados para SEO.',
      image: '/Images/Servicios/diseno-web.png',
      alt: 'Diseño de sitios web',
      cta: 'Solicitar presupuesto',
      link: '/contacto'
    },
    {
      id: 3,
      title: 'Serigrafía',
      description: 'Estampado de indumentaria, textiles y más',
      image: '/Images/Servicios/serigrafia.png',
      alt: 'estampado sobre remeras',
      cta: 'Ver opciones',
      link: '/servicios/estampado'
    },
        {
      id: 4,
      title: 'Desarrollo de Software',
      description: 'Apps a medida, paneles y automatizaciones',
      image: '/Images/Servicios/desarrollo-software.png',
      alt: 'Código de editor',
      cta: 'Charlemos tu proyecto',
      link: '/contacto'
    },
    {
      id: 5,
      title: 'Impresiones profesionales',
      description: 'Impresión digital y offset de alta calidad en folletos, tarjetas, gigantografías y mas ',
      image: '/Images/Servicios/impresiones.png',
      alt: 'Ejemplo de impresiones gráficas en papel y gran formato',
      cta: 'Solicitar presupuesto',
      link: '/contacto'
    }
  ];

  // Normaliza datos provenientes del admin/API a la for 
  // ma que espera el componente
  const normalizeSlides = (raw = []) => {
    if (!Array.isArray(raw)) return [];
    return raw.map((item, idx) => ({
      id: item.id ?? item.slug ?? idx,
      title: item.title ?? item.name ?? 'Servicio',
      description: item.description ?? item.summary ?? '',
      image: item.imageUrl ?? item.image ?? '/images/default-servicio.jpg',
      alt: item.alt ?? item.imageAlt ?? item.title ?? 'Servicio',
      cta: item.ctaText ?? item.button ?? 'Ver detalle',
      link: item.url ?? item.link ?? item.path ?? '#'
    }));
  };

  // Usa slidesData (prop) si viene; si no usa estado interno que puede venir de fetch o del default
  const [localSlides, setLocalSlides] = useState(() =>
    Array.isArray(slidesData) && slidesData.length ? normalizeSlides(slidesData) : defaultSlides
  );

  useEffect(() => {
    // si llegan slides por props, actualiza localSlides
    if (Array.isArray(slidesData) && slidesData.length) {
      setLocalSlides(normalizeSlides(slidesData));
      return;
    }

    // si está activado el fetch desde API (admin) y no hay slides por props, traerlos
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
        .catch(() => {
          // En caso de error, mantener defaultSlides (silencioso). Puedes loguear si lo precisas.
        });
      return () => {
        cancelled = true;
      };
    }
  }, [slidesData, fetchFromApi, apiEndpoint]);

  return (
    <>
      <h2 className='titulo-servicios-destacados'>Servicios Destacados</h2>
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
          1024:{ slidesPerView: 3, spaceBetween: 20 }
        }}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
  aria-label="Carrusel de servicios destacados"
      >
        {localSlides.map((s) => (
          <SwiperSlide key={s.id} className='swiper-slide-destacados'>
            <article className="slide-card" role="group" aria-labelledby={`slide-title-${s.id}`}>
              <div className="slide-media">
                {/* lazy loading para mejor performance */}
                <img
                  src={s.image}
                  alt={s.alt || s.title}
                  loading="lazy"
                  className="slide-image"
                />
              </div>
              <div className="slide-content">
                <h3 id={`slide-title-${s.id}`} className="slide-title ff-brokenscript-cond">{s.title}</h3>
                <p className="slide-desc">{s.description}</p>
                <a
                  className="slide-cta"
                  href={s.link || '#'}
                  target={s.link && s.link.startsWith('http') ? '_blank' : '_self'}
                  rel={s.link && s.link.startsWith('http') ? 'noopener noreferrer' : undefined}
                  aria-label={`${s.cta} - ${s.title}`}
                >
                  {s.cta}
                </a>
              </div>
            </article>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}

// PropTypes y defaultProps para documentar la interfaz del componente
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

/*
Notas:
- En el admin deberías exponer un endpoint que devuelva una lista con campos (id/title/description/imageUrl/ctaText/url)
  que aquí se normalizan con normalizeSlides.
- En producción conviene validar datos en el server y versionar el API; aquí el componente acepta tanto datos ya normalizados
  (por props) como cargarlos directamente si fetchFromApi=true.
- Ajusta ServiciosDestacados.css para los new classes (slide-card, slide-media, slide-image, slide-content, slide-cta).
*/
