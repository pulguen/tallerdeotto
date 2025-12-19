// src/features/Servicios/SocialMedia/SocialMedia.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import '../ServicePage.css';

const SocialMedia = () => {
  return (
    <main className="service-page container py-5">
      {/* Encabezado */}
      <section className="service-hero row align-items-center mb-5">
        <div className="col-12 col-lg-6">
          <p className="service-kicker">Servicios / Social Media</p>
          <h1 className="service-title mb-3">
            Social Media Management para marcas que quieren crecer en redes
          </h1>
          <p className="service-subtitle">
            Planificamos, diseñamos y gestionamos tus redes sociales con una
            estrategia clara, contenido pensado para tu audiencia y una
            presencia visual coherente con tu marca.
          </p>

          <div className="d-flex flex-wrap gap-3 mt-4">
            <a
              href="https://wa.me/5491123321006?text=Hola%2C%20quiero%20informaci%C3%B3n%20sobre%20Social%20Media%20Management%20con%20Taller%20de%20Otto.%20%F0%9F%93%B2"
              target="_blank"
              rel="noreferrer"
              className="btn btn-primary service-cta"
            >
              Quiero mejorar mis redes
            </a>
            <Link to="/" className="btn btn-outline-secondary">
              Volver al inicio
            </Link>
          </div>
        </div>

        <div className="col-12 col-lg-6 mt-4 mt-lg-0">
          <div className="service-hero-card">
            <p className="mb-2 fw-semibold">Ideal para</p>
            <ul className="service-list">
              <li>Emprendimientos que quieren profesionalizar sus redes.</li>
              <li>Marcas que no tienen tiempo para crear contenido.</li>
              <li>Negocios que necesitan una imagen coherente y actual.</li>
              <li>Empresas e instituciones con comunicación constante.</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Qué incluye el servicio */}
      <section className="mb-5">
        <h2 className="section-title mb-3">¿Qué incluye Social Media Management?</h2>
        <div className="row g-4">
          <div className="col-12 col-md-6 col-lg-4">
            <div className="service-card h-100">
              <h3 className="service-card-title">Estrategia y calendario</h3>
              <p className="service-card-text">
                Definimos objetivos, tono de comunicación, pilares de contenido
                y armamos un calendario mensual claro y organizado.
              </p>
            </div>
          </div>

          <div className="col-12 col-md-6 col-lg-4">
            <div className="service-card h-100">
              <h3 className="service-card-title">Contenido visual + copies</h3>
              <p className="service-card-text">
                Diseñamos piezas visuales alineadas a tu identidad y redactamos
                textos pensados para conectar con tu audiencia.
              </p>
            </div>
          </div>

          <div className="col-12 col-md-6 col-lg-4">
            <div className="service-card h-100">
              <h3 className="service-card-title">Publicación y ajustes</h3>
              <p className="service-card-text">
                Programamos y/o publicamos los contenidos, analizamos el
                desempeño y ajustamos la estrategia mes a mes.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Planes orientativos */}
      <section className="mb-5">
        <h2 className="section-title mb-3">Planes orientativos</h2>
        <p className="mb-4">
          Los valores se ajustan según la cantidad de publicaciones, redes a
          gestionar y necesidades de diseño. Estos planes son una referencia:
        </p>

        <div className="row g-4">
          <div className="col-12 col-md-4">
            <div className="plan-card h-100">
              <p className="plan-label">Emprendimientos</p>
              <h3 className="plan-title">Plan básico</h3>
              <ul className="plan-list">
                <li>8–12 publicaciones mensuales</li>
                <li>1–2 redes (ej: Instagram + Facebook)</li>
                <li>Diseño de piezas + copies</li>
                <li>Calendario mensual</li>
              </ul>
              <p className="plan-note">Ideal para comenzar a ordenar tu presencia.</p>
            </div>
          </div>

          <div className="col-12 col-md-4">
            <div className="plan-card plan-card-featured h-100">
              <p className="plan-label">Marcas activas</p>
              <h3 className="plan-title">Plan intermedio</h3>
              <ul className="plan-list">
                <li>12–20 publicaciones mensuales</li>
                <li>Hasta 3 redes</li>
                <li>Feed + historias destacadas</li>
                <li>Revisión de métricas básica</li>
              </ul>
              <p className="plan-note">
                Para proyectos que ya están comunicando y quieren crecer.
              </p>
            </div>
          </div>

          <div className="col-12 col-md-4">
            <div className="plan-card h-100">
              <p className="plan-label">Empresas / instituciones</p>
              <h3 className="plan-title">Plan a medida</h3>
              <ul className="plan-list">
                <li>Contenido mensual personalizado</li>
                <li>Integración con campañas y eventos</li>
                <li>Diseño gráfico + piezas especiales</li>
                <li>Reuniones de seguimiento</li>
              </ul>
              <p className="plan-note">
                Definimos juntos el alcance según tus objetivos.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Cómo trabajamos */}
      <section className="mb-5">
        <h2 className="section-title mb-3">Cómo es el proceso de trabajo</h2>
        <div className="row g-4">
          <div className="col-12 col-md-3">
            <div className="step-card">
              <span className="step-number">1</span>
              <h3 className="step-title">Relevamiento</h3>
              <p className="step-text">
                Analizamos tu situación actual en redes, competencia y
                audiencia.
              </p>
            </div>
          </div>
          <div className="col-12 col-md-3">
            <div className="step-card">
              <span className="step-number">2</span>
              <h3 className="step-title">Propuesta</h3>
              <p className="step-text">
                Presentamos una propuesta de lineamientos, tipo de contenido y
                frecuencia adecuada.
              </p>
            </div>
          </div>
          <div className="col-12 col-md-3">
            <div className="step-card">
              <span className="step-number">3</span>
              <h3 className="step-title">Producción</h3>
              <p className="step-text">
                Diseñamos las piezas, redactamos los textos y armamos el
                calendario del mes.
              </p>
            </div>
          </div>
          <div className="col-12 col-md-3">
            <div className="step-card">
              <span className="step-number">4</span>
              <h3 className="step-title">Publicación + análisis</h3>
              <p className="step-text">
                Publicamos y revisamos cómo funciona el contenido para ir
                mejorando en cada ciclo.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA final */}
      <section className="service-footer-cta text-center mt-5">
        <h2 className="section-title mb-3">
          ¿Querés que tus redes se vean y se sientan profesionales?
        </h2>
        <p className="mb-4">
          Escribinos y armamos un plan que se adapte a tu proyecto, sin promesas
          vacías y con foco en lo que realmente podés sostener mes a mes.
        </p>
        <a
          href="https://wa.me/5491123321006?text=Hola%2C%20quiero%20un%20presupuesto%20para%20gesti%C3%B3n%20de%20redes%20sociales%20%28Social%20Media%20Management%29%20con%20Taller%20de%20Otto.%20%F0%9F%93%B2"
          target="_blank"
          rel="noreferrer"
          className="btn btn-primary service-cta"
        >
          Hablar por WhatsApp
        </a>
      </section>
    </main>
  );
};

export default SocialMedia;
