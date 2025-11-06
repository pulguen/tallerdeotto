// Home.jsx

import ServiciosDestacados from './ServiciosDestacados/ServiciosDescatados';
import Productos from './Productos/Productos';
import HeaderHome from './Header/HeaderHome';

const Home = () => {
  return (
    <div className='contenedor-home'>
      <HeaderHome />
      <ServiciosDestacados />
      <Productos/>
      <h2>Productos destacados</h2>
    </div>
    );
};

export default Home;