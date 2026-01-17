// src/common/components/Navbar/CustomNavbar.jsx
import React from 'react';
import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap';
import './Navbar.css';
import logo from '../../../assets/logoheader.png';

// ✅ Importamos la misma data del carrusel
import { SERVICIOS_DESTACADOS_DEFAULT } from '../../../features/Home/ServiciosDestacados/ServiciosDestacadosData';

const CustomNavbar = ({ cartCount = 0 }) => {
  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container className="position-relative">
        {/* Botón de menú siempre visible */}
        <Navbar.Toggle aria-controls="responsive-navbar-nav" className="icono-menu">
          <div className="contenedor-icon-menu">
            <span className="icon-menu1"></span>
            <span className="icon-menu2"></span>
            <span className="icon-menu3"></span>
          </div>
        </Navbar.Toggle>

        {/* Logo centrado */}
        <Navbar.Brand href="/" className="mx-auto logo">
          <img
            src={logo}
            alt="Taller de Otto Logo"
            height="30"
          />
        </Navbar.Brand>

        {/* ✅ Carrito siempre a la derecha + badge */}
        <Nav.Link href="#" className="order-lg-last">
          <div className="contenedor-carrito" aria-label={`Carrito (${cartCount})`}>
            🛍️
            <span className="cart-badge">{cartCount}</span>
          </div>
        </Nav.Link>

        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/" className="text-white">Home</Nav.Link>
            <Nav.Link href="/about" className="text-white">Tienda</Nav.Link>

            {/* ✅ Servicios desplegable (mismos del carrusel) */}
            <NavDropdown title="Servicios" id="servicios-nav-dropdown" className="text-white">
              {SERVICIOS_DESTACADOS_DEFAULT.map((s) => (
                <NavDropdown.Item key={s.id} href={s.link}>
                  {s.title}
                </NavDropdown.Item>
              ))}
            </NavDropdown>

            <Nav.Link href="/services" className="text-white">Portafolio</Nav.Link>
            <Nav.Link href="/services" className="text-white">Contacto</Nav.Link>

            {/* Productos desplegable */}
            <NavDropdown title="Productos" id="basic-nav-dropdown" className="text-white">
              <NavDropdown.Item href="#action/3.1">Remeras</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">Buzos</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">Camperas</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">Gorras</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">Pilusos</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">Rockys</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">Insumos</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default CustomNavbar;
