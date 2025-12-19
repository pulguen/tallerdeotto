// src/features/Home/ServiciosDestacados/Estampado/Vinilo.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import './EstampadoDetalle.css';

const Vinilo = () => {
  return (
    <main className="service-page container py-5">
      <p className="service-kicker">
        Servicios / <Link to="/servicios/estampado">Estampado</Link> / Vinilo
      </p>

      <h1 className="service-title mb-3">Vinilo textil</h1>
      <p className="service-subtitle mb-4">
        Ideal para personalización: nombres, números, frases y logos simples.
        Perfecto para piezas unitarias o cantidades chicas.
      </p>

      <ul className="service-list mb-4">
        <li>Terminación prolija</li>
        <li>Ideal para personalización</li>
        <li>Colores sólidos y especiales</li>
        <li>Aplicación rápida</li>
      </ul>

      <div className="d-flex gap-3 flex-wrap">
        <a
          href="https://wa.me/5491123321006?text=Hola%2C%20quiero%20cotizar%20vinilo%20textil.%20%F0%9F%93%8C"
          target="_blank"
          rel="noreferrer"
          className="btn btn-primary"
        >
          Cotizar vinilo
        </a>
        <Link to="/servicios/estampado" className="btn btn-outline-secondary">
          Volver a Estampado
        </Link>
      </div>
    </main>
  );
};

export default Vinilo;
