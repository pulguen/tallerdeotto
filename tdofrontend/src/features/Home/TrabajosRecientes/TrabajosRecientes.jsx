// src/features/Home/TrabajosRecientes/TrabajosRecientes.jsx
import { useMemo, useState } from "react";
import CustomButton from "../../../common/Components/Button/CustomButton";
import "./TrabajosRecientes.css";

export default function TrabajosRecientes({ trabajos = [] }) {
  const defaultTrabajos = useMemo(() => ([
    { id: 1, title: "Identidad Visual – Cafetería Lumbre", image: "/Images/Portafolio/lumbre-branding.jpg", description: "Rediseño completo de marca, paleta cromática y piezas gráficas." },
    { id: 2, title: "Packaging – Dulce Nube", image: "/Images/Portafolio/dulcenube-packaging.jpg", description: "Packaging eco-friendly para línea de productos artesanales." },
    { id: 3, title: "Social Media – Gym Titan", image: "/Images/Portafolio/titan-redes.jpg", description: "Campaña mensual y contenido visual para Instagram." },
    { id: 4, title: "Merch – Remeras Básicas", image: "/Images/Portafolio/basicos.jpg", description: "Diseño, mockups y producción de básicos para tienda." },
    { id: 5, title: "Flyers – Evento Local", image: "/Images/Portafolio/evento-flyer.jpg", description: "Piezas listas para redes e impresión." },
    { id: 6, title: "Brand Kit – Emprendimiento", image: "/Images/Portafolio/brandkit.jpg", description: "Kit de marca + templates para redes." },
  ]), []);

  const items = trabajos.length ? trabajos : defaultTrabajos;

  const STEP = 3;
  const [visibleCount, setVisibleCount] = useState(STEP);

  const visibleItems = items.slice(0, visibleCount);
  const canLoadMore = visibleCount < items.length;

  return (
    <>
      <h2 className="home-section__title">Últimos trabajos</h2>
      <p className="home-section__subtitle">Proyectos recientes del Taller.</p>

      <div className="tr-grid" role="list">
        {visibleItems.map((t) => (
          <article className="tr-card" key={t.id} role="listitem">
            <div className="tr-media">
              <img src={t.image} alt={t.title} loading="lazy" />
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
            onClick={() => setVisibleCount((p) => Math.min(p + STEP, items.length))}
          >
            Ver más
          </CustomButton>
        ) : (
          <CustomButton
            as="a"
            href="/portafolio"
            variant="outline-primary"
            className="tr-btn"
          >
            Ver portafolio
          </CustomButton>
        )}
      </div>
    </>
  );
}
