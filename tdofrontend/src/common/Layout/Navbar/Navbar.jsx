import React from 'react';
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import logo from '../../../assets/logoheader.png';
import { SERVICIOS_DESTACADOS_DEFAULT } from '../../../features/Home/ServiciosDestacados/ServiciosDestacadosData';
import { useCart } from '../../../context/useCart';
import './Navbar.css';

const CustomNavbar = () => {
  const { cartCount, openCart } = useCart();

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container className="position-relative">
        <Navbar.Toggle aria-controls="responsive-navbar-nav" className="icono-menu">
          <div className="contenedor-icon-menu">
            <span className="icon-menu1"></span>
            <span className="icon-menu2"></span>
            <span className="icon-menu3"></span>
          </div>
        </Navbar.Toggle>

        <Navbar.Brand href="/" className="mx-auto logo">
          <img src={logo} alt="Taller de Otto Logo" height="30" />
        </Navbar.Brand>

        <button
          type="button"
          className="navbar-cart-trigger order-lg-last"
          onClick={openCart}
          aria-label={`Abrir carrito con ${cartCount} productos`}
        >
          <div className="contenedor-carrito" aria-label={`Carrito (${cartCount})`}>
            <i className="fa-solid fa-bag-shopping" aria-hidden="true" />
            <span className="cart-badge">{cartCount}</span>
          </div>
        </button>

        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/" className="text-white">Home</Nav.Link>
            <Nav.Link href="/about" className="text-white">Tienda</Nav.Link>

            <NavDropdown title="Servicios" id="servicios-nav-dropdown" className="text-white">
              {SERVICIOS_DESTACADOS_DEFAULT.map((service) => (
                <NavDropdown.Item key={service.id} href={service.link}>
                  {service.title}
                </NavDropdown.Item>
              ))}
            </NavDropdown>

            <Nav.Link href="/portafolio" className="text-white">Portafolio</Nav.Link>
            <Nav.Link href="#contacto" className="text-white">Contacto</Nav.Link>

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
