// Home.js
import React from 'react';
import ServiciosDestacados from '../ServiciosDestacados/ServiciosDescatados';
import Productos from '../Productos/Productos';

const Home = () => {
  return (
    <div className='contenedor-home'>
      <ServiciosDestacados />
      <Productos/>
      <h2>Productos destacados</h2>
    </div>
    );
};

export default Home;