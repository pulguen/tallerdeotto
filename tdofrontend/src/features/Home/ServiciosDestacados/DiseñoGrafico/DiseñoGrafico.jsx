// src/features/Servicios/DisenoGrafico/DisenoGrafico.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import '../ServicePage.css';

const DisenoGrafico = () => {
  return (
    <main className="service-page container py-5">
      {/* Encabezado */}
      <section className="service-hero row align-items-center mb-5">
        <div className="col-12 col-lg-6">
          <p className="service-kicker">Servicios / Diseño gráfico</p>
          <h1 className="service-title mb-3">
            Diseño gráfico para marcas, productos y redes sociales
          </h1>
          <p className="service-subtitle">
            Creamos piezas visuales coherentes con la identidad de tu marca:
            logos, flyers, catálogos, piezas para redes y más. Ideal para
            emprendimientos, empresas e instituciones.
          </p>

          <div className="d-flex flex-wrap gap-3 mt-4">
            <a
              href="https://wa.me/5491123321006?text=Hola%2C%20quiero%20un%20presupuesto%20para%20dise%C3%B1o%20gr%C3%A1fico%20con%20Taller%20de%20Otto.%20%F0%9F%93%88"
              target="_blank"
              rel="noreferrer"
              className="btn btn-primary service-cta"
            >
              Pedir presupuesto por WhatsApp
            </a>
            <Link to="/" className="btn btn-outline-secondary">
              Volver al inicio
            </Link>
          </div>
        </div>

        <div className="col-12 col-lg-6 mt-4 mt-lg-0">
          <div className="service-hero-card">
            <p className="mb-2 fw-semibold">Incluye</p>
            <ul className="service-list">
              <li>Identidad visual básica (logo + aplicaciones simples)</li>
              <li>Flyers y piezas para redes sociales</li>
              <li>Diseño para impresión (folletos, trípticos, afiches)</li>
              <li>Banners web y portadas</li>
              <li>Adaptaciones a diferentes formatos y tamaños</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Bloque: qué ofrecemos */}
      <section className="mb-5">
        <h2 className="section-title mb-3">¿Qué podemos diseñar para vos?</h2>
        <div className="row g-4">
          <div className="col-12 col-md-6 col-lg-4">
            <div className="service-card h-100">
              <h3 className="service-card-title">Identidad de marca</h3>
              <p className="service-card-text">
                Logos, paleta de colores, tipografías y piezas base para que tu
                marca se vea consistente en todos los canales.
              </p>
            </div>
          </div>

          <div className="col-12 col-md-6 col-lg-4">
            <div className="service-card h-100">
              <h3 className="service-card-title">Redes sociales</h3>
              <p className="service-card-text">
                Plantillas y piezas listas para publicar en Instagram, Facebook,
                TikTok o lo que uses hoy para comunicar tu proyecto.
              </p>
            </div>
          </div>

          <div className="col-12 col-md-6 col-lg-4">
            <div className="service-card h-100">
              <h3 className="service-card-title">Impresos y cartelería</h3>
              <p className="service-card-text">
                Folletos, tarjetas personales, stickers, carteles y materiales
                para eventos, ferias y puntos de venta.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Bloque: cómo trabajamos */}
      <section className="mb-5">
        <h2 className="section-title mb-3">Cómo trabajamos</h2>
        <div className="row g-4">
          <div className="col-12 col-md-3">
            <div className="step-card">
              <span className="step-number">1</span>
              <h3 className="step-title">Brief</h3>
              <p className="step-text">
                Conversamos sobre tu marca, objetivos, público y estilo visual
                que estás buscando.
              </p>
            </div>
          </div>
          <div className="col-12 col-md-3">
            <div className="step-card">
              <span className="step-number">2</span>
              <h3 className="step-title">Propuesta</h3>
              <p className="step-text">
                Presentamos opciones de diseño iniciales para que elijas el
                rumbo visual.
              </p>
            </div>
          </div>
          <div className="col-12 col-md-3">
            <div className="step-card">
              <span className="step-number">3</span>
              <h3 className="step-title">Ajustes</h3>
              <p className="step-text">
                Refinamos el diseño con tus comentarios hasta llegar al resultado
                final.
              </p>
            </div>
          </div>
          <div className="col-12 col-md-3">
            <div className="step-card">
              <span className="step-number">4</span>
              <h3 className="step-title">Entrega</h3>
              <p className="step-text">
                Entregamos los archivos finales listos para imprimir o publicar
                en digital.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA final */}
      <section className="service-footer-cta text-center mt-5">
        <h2 className="section-title mb-3">
          ¿Listo para mejorar la imagen de tu marca?
        </h2>
        <p className="mb-4">
          Contanos qué necesitás y armamos un presupuesto a medida: piezas
          sueltas, packs mensuales o proyectos puntuales.
        </p>
        <a
          href="https://wa.me/5491123321006?text=Hola%2C%20quiero%20un%20presupuesto%20para%20dise%C3%B1o%20gr%C3%A1fico%20con%20Taller%20de%20Otto.%20%F0%9F%93%88"
          target="_blank"
          rel="noreferrer"
          className="btn btn-primary service-cta"
        >
          Escribirme por WhatsApp
        </a>
      </section>
    </main>
  );
};

export default DisenoGrafico;
