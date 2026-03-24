// src/features/Home/TrabajosRecientes/TrabajosRecientes.jsx
import { useMemo, useState, useEffect } from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';

// Estilos Swiper
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import axios from "../../../context/customAxios";
import CustomButton from "../../../common/Components/Button/CustomButton";
import "./TrabajosRecientes.css";

const getInitialIsDesktop = () => (typeof window !== "undefined" ? window.innerWidth >= 1200 : false);

export default function TrabajosRecientes() {
  const [trabajos, setTrabajos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [useSwiper, setUseSwiper] = useState(getInitialIsDesktop());

  const defaultTrabajos = useMemo(
    () => [
      { id: "m1", title: "Identidad Visual - Cafetería Lumbre", image: "/Images/Portafolio/lumbre-branding.jpg", description: "Rediseño completo de marca, paleta cromática y piezas gráficas." },
      { id: "m2", title: "Packaging - Dulce Nube", image: "/Images/Portafolio/dulcenube-packaging.jpg", description: "Packaging eco-friendly para línea de productos artesanales." },
      { id: "m3", title: "Social Media - Gym Titan", image: "/Images/Portafolio/titan-redes.jpg", description: "Campaña mensual y contenido visual para Instagram." },
      { id: "m4", title: "Web E-commerce - Moda Urbana", image: "/Images/Portafolio/urban-web.jpg", description: "Tienda online completa con pasarela de pagos y gestión de stock." },
      { id: "m5", title: "Merchandising - TechConference 2025", image: "/Images/Portafolio/conf-merch.jpg", description: "Remeras, lanyards y totebags estampados para evento masivo." },
      { id: "m6", title: "Restauración Fotográfica - Museo Local", image: "/Images/Portafolio/museo-restauracion.jpg", description: "Digitalización y mejora de fotografías históricas para exhibición." },
      { id: "m7", title: "App Móvil - FitTracker Pro", image: "/Images/Portafolio/fittracker-app.jpg", description: "Aplicación de seguimiento deportivo con estadísticas en tiempo real." },
      { id: "m8", title: "Branding Completo - Estudio Legal", image: "/Images/Portafolio/legal-branding.jpg", description: "Identidad corporativa, papelería y material digital para despacho de abogados." },
      { id: "m9", title: "Editorial - Revista Cultural", image: "/Images/Portafolio/revista-editorial.jpg", description: "Diseño y maquetación de revista mensual con 48 páginas." },
      { id: "m10", title: "Mobiliario Industrial", image: "/Images/Portafolio/lumbre-branding.jpg", description: "Diseño de mobiliario personalizado." },
      { id: "m11", title: "Interiorismo - Co-work", image: "/Images/Portafolio/urban-web.jpg", description: "Optimización de espacios de trabajo." },
      { id: "m12", title: "Identidad - Barbería", image: "/Images/Portafolio/legal-branding.jpg", description: "Branding de alta gama." },
    ],
    []
  );

  useEffect(() => {
    const fetchTrabajos = async () => {
      try {
        const response = await axios.get("trabajos/?destacado=true");
        if (Array.isArray(response.data)) {
          setTrabajos(response.data);
        } else {
          console.warn("La API de trabajos no devolvió un array:", response.data);
        }
      } catch (error) {
        console.error("Error fetching trabajos destacados:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchTrabajos();
  }, []);

  const items = useMemo(() => {
    if (loading && trabajos.length === 0) return [];
    return [...trabajos, ...defaultTrabajos].filter(
      (item, index, self) => index === self.findIndex((t) => (t.id || t.pk) === (item.id || item.pk))
    );
  }, [trabajos, loading, defaultTrabajos]);

  const getColumns = () => {
    if (window.innerWidth >= 1200) return 6;
    if (window.innerWidth >= 768) return 4;
    return 3;
  };

  const [cols, setCols] = useState(typeof window !== "undefined" ? getColumns() : 3);
  const [visibleCount, setVisibleCount] = useState(typeof window !== "undefined" ? getColumns() : 3);

  useEffect(() => {
    const handleResize = () => {
      const currentCols = getColumns();
      setUseSwiper(currentCols >= 6);
      if (currentCols !== cols) {
        setCols(currentCols);
        setVisibleCount(currentCols);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [cols]);

  const handleLoadMore = () => {
    if (cols === 6) setVisibleCount(12);
    else if (cols === 4) {
      if (visibleCount === 4) setVisibleCount(8);
      else if (visibleCount === 8) setVisibleCount(12);
    } else {
      if (visibleCount === 3) setVisibleCount(6);
      else if (visibleCount === 6) setVisibleCount(12);
    }
  };

  const handleShowLess = () => {
    if (cols === 6) setVisibleCount(6);
    else if (cols === 4) {
      if (visibleCount === 12) setVisibleCount(8);
      else if (visibleCount === 8) setVisibleCount(4);
    } else {
      if (visibleCount === 12) setVisibleCount(6);
      else if (visibleCount === 6) setVisibleCount(3);
    }
  };

  const maxItems = items.slice(0, 12);
  const visibleItems = maxItems.slice(0, Math.min(visibleCount, 12));

  const showLoadMore = visibleCount < 12 && items.length > visibleCount;
  const showShowLess = visibleCount > cols;
  const showPortfolioLink = visibleCount >= 12 || items.length <= visibleCount;

  const renderCard = (t) => (
    <article className="tr-card" key={t.id || t.pk} role="listitem">
      <div className="tr-card-header-minimal">
        <span className="tr-project-title">{t.title}</span>
      </div>

      <div className="tr-media">
        <img
          src={t.image_url || t.image}
          alt={t.title}
          loading="lazy"
          onError={(e) => {
            e.target.src = "/Images/placeholder-work.jpg";
          }}
        />
        {t.imagenes && t.imagenes.length > 1 && (
          <div className="tr-badge-photos">
            <i className="fas fa-images"></i> {t.imagenes.length}
          </div>
        )}
      </div>

      <div className="tr-body">
        <div className="tr-caption">
          <span className="tr-caption-text">{t.description}</span>
        </div>
        <div className="tr-tags">
          {t.tags && t.tags.length > 0 ? (
            t.tags.slice(0, 3).map((tag) => (
              <span key={tag.id} className="tr-tag-pill" style={{ color: tag.color || "var(--brand-400)" }}>
                #{tag.nombre.replace(/\s+/g, "")}
              </span>
            ))
          ) : (
            <span className="tr-tag-pill">#{t.categoria_display || "Diseño"}</span>
          )}
        </div>
      </div>
    </article>
  );

  if (loading && trabajos.length === 0) {
    return (
      <div className="tr-loading">
        <p>Cargando trabajos...</p>
      </div>
    );
  }

  return (
    <>
      <h2 className="home-section__title">Últimos trabajos</h2>
      <p className="home-section__subtitle">Proyectos recientes del Taller.</p>

      {useSwiper ? (
        <div className="tr-swiper-container">
          <Swiper
            modules={[Autoplay, Navigation, Pagination]}
            slidesPerView={cols}
            spaceBetween={cols >= 6 ? 20 : 12}
            navigation
            pagination={{ clickable: true, dynamicBullets: true }}
            loop={true}
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            className="tr-swiper"
          >
            {maxItems.map((t) => (
              <SwiperSlide key={t.id || t.pk}>
                {renderCard(t)}
              </SwiperSlide>
            ))}
          </Swiper>

          <div className="tr-footer tr-footer--swiper">
            <CustomButton
              as="a"
              href="/portafolio"
              variant="outline-primary"
              className="tr-btn tr-btn--sm tr-btn--portfolio"
            >
              Ver portafolio completo
            </CustomButton>
          </div>
        </div>
      ) : (
        <>
          <div className="tr-grid" role="list">
            {visibleItems.map(renderCard)}
          </div>

          <div className="tr-footer">
            <div className="tr-controls">
              {showShowLess && (
                <CustomButton variant="outline-primary" className="tr-btn tr-btn--sm" onClick={handleShowLess}>
                  Ver menos
                </CustomButton>
              )}

              {showLoadMore && (
                <CustomButton variant="primary" className="tr-btn tr-btn--sm" onClick={handleLoadMore}>
                  Ver más
                </CustomButton>
              )}
            </div>

            {showPortfolioLink && (
              <CustomButton
                as="a"
                href="/portafolio"
                variant="outline-primary"
                className="tr-btn tr-btn--sm tr-btn--portfolio"
              >
                Ver portafolio completo
              </CustomButton>
            )}
          </div>
        </>
      )}
    </>
  );
}
