// src/features/Home/ServiciosDestacados/Estampado/Estampado.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import '../ServicePage.css';

const Estampado = () => {
  return (
    <main className="service-page container py-5">
      <section className="service-hero row align-items-center mb-5">
        <div className="col-12 col-lg-6">
          <p className="service-kicker">Servicios / Estampado</p>
          <h1 className="service-title mb-3">
            Estampado textil para marcas, equipos y merch
          </h1>
          <p className="service-subtitle">
            Trabajamos con <strong>Serigrafía</strong>, <strong>Vinilo</strong> y{' '}
            <strong>DTF</strong>. Te ayudamos a elegir la técnica ideal según tu
            diseño, cantidad y tipo de prenda.
          </p>

          <div className="d-flex gap-3 mt-4 flex-wrap">
            <a
              href="https://wa.me/5491123321006?text=Hola%2C%20quiero%20cotizar%20estampado%20textil%20con%20Taller%20de%20Otto.%20%F0%9F%91%95"
              target="_blank"
              rel="noreferrer"
              className="btn btn-primary service-cta"
            >
              Cotizar estampado
            </a>
            <Link to="/" className="btn btn-outline-secondary">
              Volver al inicio
            </Link>
          </div>
        </div>

        <div className="col-12 col-lg-6 mt-4 mt-lg-0">
          <div className="service-hero-card">
            <p className="fw-semibold mb-2">Para cotizar rápido necesitás:</p>
            <ul className="service-list">
              <li>Cantidad de prendas</li>
              <li>Tipo de prenda</li>
              <li>Ubicación del estampado</li>
              <li>Diseño o idea</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="mb-5">
        <h2 className="section-title mb-3">Elegí la técnica</h2>
        <div className="row g-4">
          <Tecnica
            title="Serigrafía"
            desc="Ideal para tiradas medias/grandes y diseños simples."
            link="/servicios/estampado/serigrafia"
          />
          <Tecnica
            title="Vinilo"
            desc="Perfecto para personalización y piezas unitarias."
            link="/servicios/estampado/vinilo"
          />
          <Tecnica
            title="DTF"
            desc="Full color, ilustraciones y mucho detalle."
            link="/servicios/estampado/dtf"
          />
        </div>
      </section>

      <section className="service-footer-cta text-center mt-5">
        <h2 className="section-title mb-3">
          Si no sabés cuál técnica usar, lo vemos juntos
        </h2>
        <p className="mb-4">
          Mandanos tu diseño y te recomendamos la mejor opción.
        </p>
        <a
          href="https://wa.me/5491123321006?text=Hola%2C%20te%20paso%20mi%20dise%C3%B1o%20para%20que%20me%20recomienden%20la%20mejor%20t%C3%A9cnica%20de%20estampado.%20%F0%9F%91%95"
          target="_blank"
          rel="noreferrer"
          className="btn btn-primary service-cta"
        >
          Enviar diseño
        </a>
      </section>
    </main>
  );
};

const Tecnica = ({ title, desc, link }) => (
  <div className="col-12 col-md-6 col-lg-4">
    <div className="service-card h-100">
      <h3 className="service-card-title">{title}</h3>
      <p className="service-card-text">{desc}</p>
      <Link to={link} className="btn btn-outline-secondary mt-3">
        Ver {title}
      </Link>
    </div>
  </div>
);

export default Estampado;
