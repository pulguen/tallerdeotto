import React from 'react';
import { Link } from 'react-router-dom';
import '../ServicePage.css';

const DesarrolloSoftware = () => {
  return (
    <main className="service-page container py-5">
      <section className="service-hero row align-items-center mb-5">
        <div className="col-12 col-lg-6">
          <p className="service-kicker">Servicios / Desarrollo de Software</p>
          <h1 className="service-title mb-3">Software a medida para automatizar y escalar tu operación</h1>
          <p className="service-subtitle">
            Construimos sistemas web para gestión interna, paneles de control y procesos que hoy te hacen perder tiempo:
            inventario, ventas, turnos, reportes, roles y más.
          </p>

          <div className="d-flex flex-wrap gap-3 mt-4">
            <a
              href="https://wa.me/5491123321006?text=Hola%2C%20quiero%20cotizar%20un%20desarrollo%20de%20software%20a%20medida%20con%20Taller%20de%20Otto.%20%F0%9F%92%BB"
              target="_blank"
              rel="noreferrer"
              className="btn btn-primary service-cta"
            >
              Quiero mi sistema
            </a>
            <Link to="/" className="btn btn-outline-secondary">Volver al inicio</Link>
          </div>
        </div>

        <div className="col-12 col-lg-6 mt-4 mt-lg-0">
          <div className="service-hero-card">
            <p className="mb-2 fw-semibold">Casos típicos</p>
            <ul className="service-list">
              <li>Panel admin con métricas y reportes</li>
              <li>Gestión de clientes y solicitudes</li>
              <li>Inventario / stock + alertas</li>
              <li>Facturación / comprobantes (según necesidad)</li>
              <li>Roles y permisos (cliente / admin)</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="mb-5">
        <h2 className="section-title mb-3">Qué entregamos</h2>
        <div className="row g-4">
          {[
            ['Backend + API', 'Django + DRF, lógica de negocio y base de datos.'],
            ['Frontend', 'React, componentes reutilizables y UI clara.'],
            ['Autenticación', 'Login/logout + roles + protección de rutas/APIs.'],
            ['Reportes', 'Exportables en PDF/CSV según módulos.'],
            ['Notificaciones', 'Alertas por stock o desvíos (si aplica).'],
            ['Deploy', 'Docker + entorno productivo (según hosting).'],
          ].map(([t, d]) => (
            <div key={t} className="col-12 col-md-6 col-lg-4">
              <div className="service-card h-100">
                <h3 className="service-card-title">{t}</h3>
                <p className="service-card-text">{d}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-5">
        <h2 className="section-title mb-3">Proceso de trabajo</h2>
        <div className="row g-4">
          {[
            ['1', 'Descubrimiento', 'Relevamos necesidades, flujos y prioridades.'],
            ['2', 'Prototipo', 'Definimos pantallas, roles y alcance.'],
            ['3', 'Desarrollo', 'Iteraciones por módulos con entregas parciales.'],
            ['4', 'Entrega', 'Documentación, puesta en marcha y soporte inicial.'],
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
        <h2 className="section-title mb-3">¿Querés dejar de hacer todo “a mano”?</h2>
        <p className="mb-4">Contanos tu caso y te proponemos un plan por etapas, claro y escalable.</p>
        <a
          href="https://wa.me/5491123321006?text=Hola%2C%20quiero%20cotizar%20un%20desarrollo%20de%20software%20a%20medida%20con%20Taller%20de%20Otto.%20%F0%9F%92%BB"
          target="_blank"
          rel="noreferrer"
          className="btn btn-primary service-cta"
        >
          Hablemos
        </a>
      </section>
    </main>
  );
};

export default DesarrolloSoftware;
