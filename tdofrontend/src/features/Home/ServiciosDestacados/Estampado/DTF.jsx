// src/features/Home/ServiciosDestacados/Estampado/DTF.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import './EstampadoDetalle.css';

const DTF = () => {
  return (
    <main className="service-page container py-5">
      <p className="service-kicker">
        Servicios / <Link to="/servicios/estampado">Estampado</Link> / DTF
      </p>

      <h1 className="service-title mb-3">DTF (Direct to Film)</h1>
      <p className="service-subtitle mb-4">
        Transfer full color con gran nivel de detalle. Ideal para ilustraciones,
        degradados y logos complejos.
      </p>

      <ul className="service-list mb-4">
        <li>Full color real</li>
        <li>Alta definición</li>
        <li>Ideal para tiradas chicas/medias</li>
        <li>Gran versatilidad</li>
      </ul>

      <div className="d-flex gap-3 flex-wrap">
        <a
          href="https://wa.me/5491123321006?text=Hola%2C%20quiero%20cotizar%20DTF%20para%20prendas.%20%F0%9F%8E%A8"
          target="_blank"
          rel="noreferrer"
          className="btn btn-primary"
        >
          Cotizar DTF
        </a>
        <Link to="/servicios/estampado" className="btn btn-outline-secondary">
          Volver a Estampado
        </Link>
      </div>
    </main>
  );
};

export default DTF;
