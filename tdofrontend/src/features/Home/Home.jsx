// Home.jsx

import ServiciosDestacados from './ServiciosDestacados/ServiciosDescatados';
import Productos from './Productos/Productos';
import HeaderHome from './Header/HeaderHome';
import BasicoStoreBanner from './BasicoStore/BasicoStoreBanner';
import ContactHome from './ContactHome/ContactHome';

const Home = () => {
  return (
    <div className='contenedor-home'>
      <HeaderHome />
      <ServiciosDestacados />
      <Productos/>
      <h2>Productos destacados</h2>
      <BasicoStoreBanner />      
      <ContactHome />
    </div>
    );
};

export default Home;