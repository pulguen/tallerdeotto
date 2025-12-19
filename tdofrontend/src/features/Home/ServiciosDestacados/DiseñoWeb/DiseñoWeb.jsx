import React from 'react';
import { Link } from 'react-router-dom';
import '../ServicePage.css';

const DisenoWeb = () => {
  return (
    <main className="service-page container py-5">
      <section className="service-hero row align-items-center mb-5">
        <div className="col-12 col-lg-6">
          <p className="service-kicker">Servicios / Diseño Web</p>
          <h1 className="service-title mb-3">Diseño web moderno, rápido y pensado para convertir</h1>
          <p className="service-subtitle">
            Creamos sitios claros y atractivos para que tu marca se vea profesional, cargue rápido y
            genere consultas. Ideal para emprendimientos, empresas e instituciones.
          </p>

          <div className="d-flex flex-wrap gap-3 mt-4">
            <a
              href="https://wa.me/5491123321006?text=Hola%2C%20quiero%20un%20presupuesto%20para%20dise%C3%B1o%20web%20con%20Taller%20de%20Otto.%20%F0%9F%8C%90"
              target="_blank"
              rel="noreferrer"
              className="btn btn-primary service-cta"
            >
              Pedir presupuesto
            </a>
            <Link to="/" className="btn btn-outline-secondary">Volver al inicio</Link>
          </div>
        </div>

        <div className="col-12 col-lg-6 mt-4 mt-lg-0">
          <div className="service-hero-card">
            <p className="mb-2 fw-semibold">Incluye</p>
            <ul className="service-list">
              <li>Diseño responsive (mobile primero)</li>
              <li>Secciones claras y orientadas a conversión</li>
              <li>Optimización básica de performance</li>
              <li>WhatsApp + formularios de contacto</li>
              <li>Integración con redes / Google Maps (si aplica)</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="mb-5">
        <h2 className="section-title mb-3">Tipos de sitios</h2>
        <div className="row g-4">
          <div className="col-12 col-md-6 col-lg-4">
            <div className="service-card h-100">
              <h3 className="service-card-title">Landing page</h3>
              <p className="service-card-text">Página única para captar consultas y explicar tu propuesta.</p>
            </div>
          </div>
          <div className="col-12 col-md-6 col-lg-4">
            <div className="service-card h-100">
              <h3 className="service-card-title">Sitio institucional</h3>
              <p className="service-card-text">Secciones completas: servicios, portfolio, contacto y más.</p>
            </div>
          </div>
          <div className="col-12 col-md-6 col-lg-4">
            <div className="service-card h-100">
              <h3 className="service-card-title">Catálogo / tienda</h3>
              <p className="service-card-text">Productos ordenados, consultas por WhatsApp o checkout (según el caso).</p>
            </div>
          </div>
        </div>
      </section>

      <section className="mb-5">
        <h2 className="section-title mb-3">Cómo trabajamos</h2>
        <div className="row g-4">
          {[
            ['1', 'Brief', 'Definimos objetivos, secciones, estilo y contenido.'],
            ['2', 'Diseño', 'Creamos el look & feel y la estructura del sitio.'],
            ['3', 'Implementación', 'Maquetamos, optimizamos y dejamos todo funcionando.'],
            ['4', 'Entrega', 'Publicación + guía rápida para mantenerlo actualizado.'],
          ].map(([n, t, d]) => (
            <div key={n} className="col-12 col-md-3">
              <div className="step-card">
                <span className="step-number">{n}</span>
                <h3 className="step-title">{t}</h3>
                <p className="step-text">{d}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="service-footer-cta text-center mt-5">
        <h2 className="section-title mb-3">¿Querés un sitio que se vea bien y venda mejor?</h2>
        <p className="mb-4">Contanos tu idea y armamos una propuesta clara, con tiempos y alcance definido.</p>
        <a
          href="https://wa.me/5491123321006?text=Hola%2C%20quiero%20un%20presupuesto%20para%20dise%C3%B1o%20web%20con%20Taller%20de%20Otto.%20%F0%9F%8C%90"
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

export default DisenoWeb;
