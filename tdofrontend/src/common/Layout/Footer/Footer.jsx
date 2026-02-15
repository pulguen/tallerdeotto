import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-dark text-start text-white">
      <section className="d-flex justify-content-between p-4 border-bottom">
        <div className="me-5">
          <span style={{
            fontSize: '0.85rem',
            textTransform: 'uppercase',
            letterSpacing: '2px',
            color: 'rgba(255, 255, 255, 0.4)',
            fontWeight: '600',
            display: 'block' // Ensure it behaves like a block element if needed, though span is inline usually. Divider context might need flex adjustment.
          }}>Nuestras redes sociales</span>
        </div>
        <div>
          <a href="/" className="me-4 text-reset">
            <i className="fab fa-facebook-f"></i>
          </a>
          <a href="/" className="me-4 text-reset">
            <i className="fab fa-instagram"></i>
          </a>
          <a href="/" className="me-4 text-reset">
            <i className="fab fa-linkedin"></i>
          </a>
          <a href="/" className="me-4 text-reset">
            <i className="fab fa-github"></i>
          </a>
        </div>
      </section>

      <section>
        <div className="container text-start mt-5">
          <div className="row mt-3">
            <div className="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">
              <h6 className="text-uppercase fw-bold mb-4">
                <i className="fas fa-gem me-3"></i>
                Taller de Otto
              </h6>
              <p>
                Soluciones creativas y tecnológicas para instituciones, empresas y emprendimientos.
              </p>
            </div>

            <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4">
              <h6 className="text-uppercase fw-bold mb-4">Productos</h6>
              <p><a href="#!" className="text-reset">Remeras</a></p>
              <p><a href="#!" className="text-reset">Buzos</a></p>
              <p><a href="#!" className="text-reset">Camperas</a></p>
              <p><a href="#!" className="text-reset">Gorras</a></p>
              <p><a href="#!" className="text-reset">Rockys</a></p>
            </div>

            <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4">
              <h6 className="text-uppercase fw-bold mb-4">Servicios</h6>
              <p><a href="#!" className="text-reset">Diseño gráfico</a></p>
              <p><a href="#!" className="text-reset">Programación</a></p>
              <p><a href="#!" className="text-reset">Estampado</a></p>
              <p><a href="#!" className="text-reset">Impresiones</a></p>
              <p><a href="#!" className="text-reset">Asesoramiento</a></p>
            </div>

            <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
              <h6 className="text-uppercase fw-bold mb-4">Contacto</h6>
              <p><i className="fas fa-home me-2"></i>Zapala, Nqn 8340, Argentina</p>
              <p><i className="fas fa-envelope me-3"></i>ricardorojo.dg@gmail.com</p>
              <p><i className="fas fa-phone me-3"></i>+54 11 2332 1006</p>
            </div>
          </div>
        </div>
      </section>

      <div className="text-center p-4" style={{ backgroundColor: 'rgba(0, 0, 0, 0.05)' }}>
        © 2025 Todos los derechos reservados:&nbsp;
        <a className="text-reset fw-bold" href="/">
          Taller de Otto
        </a>
      </div>
    </footer>
  );
}
