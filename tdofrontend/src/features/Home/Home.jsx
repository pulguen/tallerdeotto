// src/features/Home/Home.jsx

import './Home.css';

import ServiciosDestacados from './ServiciosDestacados/ServiciosDestacados';
import TrabajosRecientes from './TrabajosRecientes/TrabajosRecientes';
import Productos from './Productos/Productos';
import HeaderHome from './Header/HeaderHome';
import BasicoStoreBanner from './BasicoStore/BasicoStoreBanner';
import ContactHome from './ContactHome/ContactHome';

const Home = () => {
  return (
    <div className="contenedor-home home-page">
      {/* Hero: full-width */}
      <section className="home-section home-section--flush" id="inicio">
        <HeaderHome />
      </section>

      {/* Servicios destacados */}
      <section className="home-section" id="servicios">
        <div className="page-container">
          <ServiciosDestacados />
        </div>
      </section>

      {/* Ultimos Trabajos */}
      <section className="home-section" id="trabajos">
        <div className="page-container">
          <TrabajosRecientes />
        </div>
      </section>

      {/* Carrusel de productos */}
      <section className="home-section" id="productos">
        <div className="page-container">
          <Productos />
        </div>
      </section>

      {/* Banner Básico Store + título */}
      <section className="home-section">
        <div className="page-container">
          <h2 className="home-section__title">Productos destacados</h2>
          <BasicoStoreBanner />
        </div>
      </section>

      {/* Contacto */}
      <section className="home-section home-section--flush" id="contacto">
        <ContactHome />
      </section>
    </div>
  );
};

export default Home;
