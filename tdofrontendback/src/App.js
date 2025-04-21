import './App.css';
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar'
import Home from './components/Home/Home'
import Footer from './components/Footer/Footer'
import Control from './components/Control/Control';


function App() {
  return (
    <>
    <BrowserRouter>
      <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/control" element={<Control />} />
          {/* Si se accede a una ruta no definida, muestra una página de error o redirige */}
          <Route path="*" element={<div>404 Not Found</div>} />
        </Routes>
      <Footer />
    </BrowserRouter>
    </>
  );
}

export default App;
