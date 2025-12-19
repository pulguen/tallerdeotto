// src/features/Home/ServiciosDestacados/Impresiones/Impresiones.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import './Impresiones.css';

const Impresiones = () => {
  return (
    <main className="service-page container py-5">
      {/* Breadcrumb */}
      <p className="service-kicker">Servicios / Impresiones</p>

      {/* Hero */}
      <section className="service-hero row align-items-center mb-5">
        <div className="col-12 col-lg-6">
          <h1 className="service-title mb-3">
            Impresiones para marcas, eventos y comunicación visual
          </h1>
          <p className="service-subtitle">
            Realizamos impresiones listas para usar: flyers, folletos, stickers,
            etiquetas y piezas gráficas pensadas para reforzar tu marca y tu
            comunicación.
          </p>

          <div className="d-flex gap-3 mt-4 flex-wrap">
            <a
              href="https://wa.me/5491123321006?text=Hola%2C%20quiero%20cotizar%20impresiones%20%28flyers%2C%20stickers%2C%20etiquetas%29%20con%20Taller%20de%20Otto.%20%F0%9F%93%84"
              target="_blank"
              rel="noreferrer"
              className="btn btn-primary service-cta"
            >
              Cotizar impresiones
            </a>
            <Link to="/" className="btn btn-outline-secondary">
              Volver al inicio
            </Link>
          </div>
        </div>

        <div className="col-12 col-lg-6 mt-4 mt-lg-0">
          <div className="service-hero-card">
            <p className="fw-semibold mb-2">Podemos imprimir</p>
            <ul className="service-list">
              <li>Flyers y folletos</li>
              <li>Stickers y etiquetas</li>
              <li>Tarjetas personales</li>
              <li>Catálogos y piezas promocionales</li>
              <li>Cartelería simple (según formato)</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Tipos de impresiones */}
      <section className="mb-5">
        <h2 className="section-title mb-3">Tipos de impresiones</h2>
        <div className="row g-4">
          <div className="col-12 col-md-6 col-lg-4">
            <div className="service-card h-100">
              <h3 className="service-card-title">Flyers & folletos</h3>
              <p className="service-card-text">
                Ideales para promociones, eventos y difusión de servicios.
              </p>
            </div>
          </div>

          <div className="col-12 col-md-6 col-lg-4">
            <div className="service-card h-100">
              <h3 className="service-card-title">Stickers</h3>
              <p className="service-card-text">
                Para packaging, marcas, envíos y acciones promocionales.
              </p>
            </div>
          </div>

          <div className="col-12 col-md-6 col-lg-4">
            <div className="service-card h-100">
              <h3 className="service-card-title">Etiquetas</h3>
              <p className="service-card-text">
                Identificación de productos, precios y presentaciones.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Proceso */}
      <section className="mb-5">
        <h2 className="section-title mb-3">Cómo trabajamos</h2>
        <div className="row g-4">
          <div className="col-12 col-md-3">
            <div className="step-card">
              <span className="step-number">1</span>
              <h3 className="step-title">Archivo</h3>
              <p className="step-text">
                Revisamos tu diseño, medidas, sangrados y resolución.
              </p>
            </div>
          </div>

          <div className="col-12 col-md-3">
            <div className="step-card">
              <span className="step-number">2</span>
              <h3 className="step-title">Asesoramiento</h3>
              <p className="step-text">
                Te recomendamos papel, terminación y cantidad ideal.
              </p>
            </div>
          </div>

          <div className="col-12 col-md-3">
            <div className="step-card">
              <span className="step-number">3</span>
              <h3 className="step-title">Producción</h3>
              <p className="step-text">
                Imprimimos y realizamos cortes o terminaciones si aplica.
              </p>
            </div>
          </div>

          <div className="col-12 col-md-3">
            <div className="step-card">
              <span className="step-number">4</span>
              <h3 className="step-title">Entrega</h3>
              <p className="step-text">
                Entregamos el material listo para usar.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA final */}
      <section className="service-footer-cta text-center mt-5">
        <h2 className="section-title mb-3">
          ¿Necesitás imprimir material para tu proyecto?
        </h2>
        <p className="mb-4">
          Contanos qué querés imprimir, medidas y cantidad, y te pasamos un
          presupuesto claro.
        </p>
        <a
          href="https://wa.me/5491123321006?text=Hola%2C%20quiero%20cotizar%20impresiones%20para%20mi%20marca.%20%F0%9F%93%84"
          target="_blank"
          rel="noreferrer"
          className="btn btn-primary service-cta"
        >
          Consultar por WhatsApp
        </a>
      </section>
    </main>
  );
};

export default Impresiones;
