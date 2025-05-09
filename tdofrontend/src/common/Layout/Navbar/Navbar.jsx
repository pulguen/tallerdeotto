// CustomNavbar.jsx
import React from 'react';
import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap';
import './Navbar.css'
import logo from '../../../assets/logoheader.png';

const CustomNavbar = () => {
  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container className="position-relative">
        {/* Botón de menú siempre visible */}
        <Navbar.Toggle aria-controls="responsive-navbar-nav" className="icono-menu">
          <div className='contenedor-icon-menu'>
            <span className='icon-menu1'></span>
            <span className='icon-menu2'></span>
            <span className='icon-menu3'></span>
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

        {/* Carrito siempre a la derecha */}
        <Nav.Link href="#" className="order-lg-last">
          <div className='contenedor-carrito'>🛒</div>
        </Nav.Link>

        {/* Contenido central con logotipo */}
        <Navbar.Collapse id="responsive-navbar-nav">
          {/* Menú colapsado */}
          <Nav className="me-auto">
            <Nav.Link href="/" className="text-white">Home</Nav.Link>
            <Nav.Link href="/about" className="text-white">Tienda</Nav.Link>
            <Nav.Link href="/services" className="text-white">Presupuestos</Nav.Link>
            <Nav.Link href="/services" className="text-white">El taller</Nav.Link>
            <Nav.Link href="/services" className="text-white">Contacto</Nav.Link>

            {/* Menú desplegable */}
            <NavDropdown title="Productos" id="basic-nav-dropdown" className="text-white">
              <NavDropdown.Item href="#action/3.1">Remeras</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">Buzos</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">Gorras</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">Otra categoría</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default CustomNavbar;
