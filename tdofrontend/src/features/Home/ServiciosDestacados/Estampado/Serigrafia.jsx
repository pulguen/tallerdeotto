// src/features/Home/ServiciosDestacados/Estampado/Serigrafia.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import './EstampadoDetalle.css';

const Serigrafia = () => {
  return (
    <main className="service-page container py-5">
      <p className="service-kicker">
        Servicios / <Link to="/servicios/estampado">Estampado</Link> / Serigrafía
      </p>

      <h1 className="service-title mb-3">Serigrafía textil</h1>
      <p className="service-subtitle mb-4">
        Técnica clásica, duradera y rentable para tiradas medias y grandes.
        Ideal para logos y diseños con pocos colores.
      </p>

      <ul className="service-list mb-4">
        <li>Excelente durabilidad</li>
        <li>Más rentable a mayor cantidad</li>
        <li>Colores sólidos</li>
        <li>Ideal para merch y equipos</li>
      </ul>

      <div className="d-flex gap-3 flex-wrap">
        <a
          href="https://wa.me/5491123321006?text=Hola%2C%20quiero%20cotizar%20serigraf%C3%ADa%20textil.%20%F0%9F%91%95"
          target="_blank"
          rel="noreferrer"
          className="btn btn-primary"
        >
          Cotizar serigrafía
        </a>
        <Link to="/servicios/estampado" className="btn btn-outline-secondary">
          Volver a Estampado
        </Link>
      </div>
    </main>
  );
};

export default Serigrafia;
