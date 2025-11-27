// src/features/Home/BasicoStore/BasicoStoreBanner.jsx
import { Link } from 'react-router-dom';
import './BasicoStoreBanner.css';

const BasicoStoreBanner = () => {
  return (
    <section className="basico-banner">
      <div className="basico-banner__inner">
        {/* Columna texto */}
        <div className="basico-banner__content">
          <p className="basico-banner__eyebrow">Nuevo en el taller</p>
          <h2 className="basico-banner__title">Básico Store</h2>
          <p className="basico-banner__subtitle">
            Remeras lisas, listas para estampar, personalizar o revender.
          </p>

          <ul className="basico-banner__features">
            <li>🧵 Algodón premium y cómodas al tacto</li>
            <li>🎨 Ideales para serigrafía, vinilo textil y DTF</li>
            <li>📦 Stock continuo en talles y colores clave</li>
          </ul>

          <div className="basico-banner__actions">
            <Link to="/tienda/basicos" className="basico-banner__cta">
              Entrar a Básico Store
            </Link>
            <span className="basico-banner__hint">
              Desde la sección de básicos vas a ver colores, talles y combos.
            </span>
          </div>
        </div>

        {/* Columna visual / mockup remeras */}
        <div className="basico-banner__visual" aria-hidden="true">
          <div className="shirt-stack">
            <div className="shirt shirt--top" />
            <div className="shirt shirt--middle" />
            <div className="shirt shirt--bottom" />
          </div>
          <div className="basico-banner__tag">
            Remeras lisas
          </div>
        </div>
      </div>
    </section>
  );
};

export default BasicoStoreBanner;
