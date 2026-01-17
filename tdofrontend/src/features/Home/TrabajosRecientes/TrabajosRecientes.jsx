// src/features/Home/TrabajosRecientes/TrabajosRecientes.jsx
import { useMemo, useState, useEffect } from "react";
import axios from "../../../context/customAxios";
import CustomButton from "../../../common/Components/Button/CustomButton";
import "./TrabajosRecientes.css";

export default function TrabajosRecientes() {
  const [trabajos, setTrabajos] = useState([]);
  const [loading, setLoading] = useState(true);

  // Datos por defecto (Mocks) en caso de que la API falle o esté cargando
  // Datos por defecto (Mocks) - 9 trabajos para testing completo
  const defaultTrabajos = useMemo(() => ([
    { id: 'm1', title: "Identidad Visual – Cafetería Lumbre", image: "/Images/Portafolio/lumbre-branding.jpg", description: "Rediseño completo de marca, paleta cromática y piezas gráficas." },
    { id: 'm2', title: "Packaging – Dulce Nube", image: "/Images/Portafolio/dulcenube-packaging.jpg", description: "Packaging eco-friendly para línea de productos artesanales." },
    { id: 'm3', title: "Social Media – Gym Titan", image: "/Images/Portafolio/titan-redes.jpg", description: "Campaña mensual y contenido visual para Instagram." },
    { id: 'm4', title: "Web E-commerce – Moda Urbana", image: "/Images/Portafolio/urban-web.jpg", description: "Tienda online completa con pasarela de pagos y gestión de stock." },
    { id: 'm5', title: "Merchandising – TechConference 2025", image: "/Images/Portafolio/conf-merch.jpg", description: "Remeras, lanyards y totebags estampados para evento masivo." },
    { id: 'm6', title: "Restauración Fotográfica – Museo Local", image: "/Images/Portafolio/museo-restauracion.jpg", description: "Digitalización y mejora de fotografías históricas para exhibición." },
    { id: 'm7', title: "App Móvil – FitTracker Pro", image: "/Images/Portafolio/fittracker-app.jpg", description: "Aplicación de seguimiento deportivo con estadísticas en tiempo real." },
    { id: 'm8', title: "Branding Completo – Estudio Legal", image: "/Images/Portafolio/legal-branding.jpg", description: "Identidad corporativa, papelería y material digital para despacho de abogados." },
    { id: 'm9', title: "Editorial – Revista Cultural", image: "/Images/Portafolio/revista-editorial.jpg", description: "Diseño y maquetación de revista mensual con 48 páginas." },
  ]), []);

  useEffect(() => {
    const fetchTrabajos = async () => {
      try {
        // TEMPORAL: Comentado para testing - descomentar para producción
        // const response = await axios.get("trabajos/?destacado=true");
        // if (Array.isArray(response.data)) {
        //   setTrabajos(response.data);
        // } else {
        //   console.warn('La API de trabajos no devolvió un array:', response.data);
        // }
        console.log('📌 MODO TESTING: Usando datos de prueba en lugar de API');
      } catch (error) {
        console.error("Error fetching trabajos destacados:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchTrabajos();
  }, []);

  const items = trabajos.length > 0 ? trabajos : (loading ? [] : defaultTrabajos);

  const STEP = 3;
  const MAX_VISIBLE = 9; // Límite máximo antes de mostrar "Ver portafolio"
  const [visibleCount, setVisibleCount] = useState(STEP);

  const visibleItems = items.slice(0, Math.min(visibleCount, MAX_VISIBLE));
  const canLoadMore = visibleCount < items.length && visibleCount < MAX_VISIBLE;
  const shouldShowPortfolio = visibleCount >= MAX_VISIBLE || visibleCount >= items.length;

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

      <div className="tr-grid" role="list">
        {visibleItems.map((t) => (
          <article className="tr-card" key={t.id || t.pk} role="listitem">
            <div className="tr-media">
              <img
                src={t.image_url || t.image}
                alt={t.title}
                loading="lazy"
                onError={(e) => {
                  e.target.src = "/Images/placeholder-work.jpg";
                }}
              />
            </div>

            <div className="tr-body">
              <h3 className="tr-card-title">{t.title}</h3>
              <p className="tr-card-desc">{t.description}</p>
            </div>
          </article>
        ))}
      </div>

      <div className="tr-footer">
        {canLoadMore ? (
          <CustomButton
            variant="primary"
            className="tr-btn"
            onClick={() => setVisibleCount((p) => Math.min(p + STEP, MAX_VISIBLE))}
          >
            Ver más
          </CustomButton>
        ) : shouldShowPortfolio ? (
          <CustomButton
            as="a"
            href="/portafolio"
            variant="outline-primary"
            className="tr-btn"
          >
            Ver portafolio completo
          </CustomButton>
        ) : null}
      </div>
    </>
  );
}
