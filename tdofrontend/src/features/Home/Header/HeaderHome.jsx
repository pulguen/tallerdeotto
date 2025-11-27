// src/features/Home/Header/HeaderHome.jsx
import './HeaderHome.css';

const HeaderHome = () => {
  const whatsappNumber = '5491123321006';

  const whatsappMessage = encodeURIComponent(
    '¡Hola! Me gustaría trabajar con Taller de Otto y pedir un presupuesto 😊'
  );

  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

  return (
    <header className="hero">
      {/* Fondo decorativo suave */}
      <div aria-hidden="true" className="hero-bg">
        <div className="hero-gradient" />
        <svg className="hero-blur" viewBox="0 0 800 600" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="g1" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="var(--brand-500)" />
              <stop offset="100%" stopColor="var(--brand-700)" />
            </linearGradient>
          </defs>
          <circle cx="120" cy="120" r="120" fill="url(#g1)" opacity="0.35" />
          <circle cx="700" cy="300" r="180" fill="url(#g1)" opacity="0.25" />
        </svg>
      </div>

      <div className="hero-inner">
        {/* Columna texto */}
        <div className="hero-content">
          <img
            src="/logoHome.png"
            alt="Logo Taller de Otto"
            className="hero-logo"
            width="180"
            height="64"
            decoding="async"
          />

          <p className="eyebrow">DISEÑO GRÁFICO - UX/UI - DESARROLLO DE SOFTWARE</p>

          <h1 className="hero-title">
            Soluciones <span className="highlight ff-brokenscript"> creativas</span> y{' '}
            <span className="highlight ff-brokenscript"> tecnológicas</span> para marcas, empresas e instituciones
          </h1>

          <p className="hero-subtitle">
            Combinamos diseño, tecnología y producción gráfica para ofrecer resultados integrales:
            desde tu identidad visual hasta plataformas web personalizadas.
          </p>

          <div className="hero-ctas" role="group" aria-label="Acciones principales">
            <a
              href={whatsappLink}
              className="btn btn-primary highlight ff-brokenscript"
              aria-label="Abrir conversación de WhatsApp con Taller de Otto para comenzar un proyecto"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fa-brands fa-whatsapp" style={{ marginRight: '0.5rem' }} aria-hidden="true" />
              Trabajemos juntos
            </a>
          </div>

          <ul className="hero-features" aria-label="Beneficios">
            <li>⚡ Entregas ágiles</li>
            <li>🎯 Enfoque a resultados</li>
            <li>🌱 Comunicación efectiva para todos tus canales</li>
          </ul>

          <div className="hero-stats" aria-label="Indicadores">
            <div className="stat">
              <span className="stat-number">+10</span>
              <span className="stat-label">Años de trayectoria</span>
            </div>
            <div className="stat">
              <span className="stat-number">4 áreas</span>
              <span className="stat-label">Diseño, web, estampado, impresión</span>
            </div>
            <div className="stat">
              <span className="stat-number">100+</span>
              <span className="stat-label">Proyectos realizados</span>
            </div>
          </div>
        </div>

        {/* Columna visual */}
        <div className="hero-visual" aria-hidden="true">
          <picture>
            <source srcSet="/images/hero/hero-home-1280.webp" type="image/webp" />
            <img src="/images/hero/hero-home-1280.jpg" alt="" loading="eager" />
          </picture>
        </div>
      </div>

      {/* Separador inferior suave (sin onda) */}
      <div className="hero-divider" aria-hidden="true" />
    </header>
  );
};

export default HeaderHome;
