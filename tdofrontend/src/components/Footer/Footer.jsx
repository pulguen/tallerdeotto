import React from 'react';
import { MDBFooter, MDBContainer, MDBRow, MDBCol, MDBIcon } from 'mdb-react-ui-kit';

export default function App() {
  return (
    <MDBFooter bgColor='dark' className='text-center text-lg-start text-muted'>
      <section className='d-flex justify-content-center justify-content-lg-between p-4 border-bottom'>
        <div className='me-5 d-none d-lg-block'>
          <span>Conéctate con nosotros en las redes sociales:</span>
        </div>

        <div>
          <a href='/' className='me-4 text-reset'>
            <MDBIcon fab icon="facebook-f" />
          </a>
          <a href='/' className='me-4 text-reset'>
            <MDBIcon fab icon="twitter" />
          </a>
          <a href='/' className='me-4 text-reset'>
            <MDBIcon fab icon="google" />
          </a>
          <a href='/' className='me-4 text-reset'>
            <MDBIcon fab icon="instagram" />
          </a>
          <a href='/' className='me-4 text-reset'>
            <MDBIcon fab icon="linkedin" />
          </a>
          <a href='/' className='me-4 text-reset'>
            <MDBIcon fab icon="github" />
          </a>
        </div>
      </section>

      <section className=''>
        <MDBContainer className='text-center text-md-start mt-5'>
          <MDBRow className='mt-3'>
            <MDBCol md="3" lg="4" xl="3" className='mx-auto mb-4'>
              <h6 className='text-uppercase fw-bold mb-4'>
                <MDBIcon icon="gem" className="me-3" />
                Taller de Otto
              </h6>
              <p>
                Taller de diseño gráfico, edicion y serigrafia para instituciones, empresas y emprendedores.
              </p>
            </MDBCol>

            <MDBCol md="2" lg="2" xl="2" className='mx-auto mb-4'>
              <h6 className='text-uppercase fw-bold mb-4'>Productos</h6>
              <p>
                <a href='#!' className='text-reset'>
                  Remeras
                </a>
              </p>
              <p>
                <a href='#!' className='text-reset'>
                  Buzos
                </a>
              </p>
              <p>
                <a href='#!' className='text-reset'>
                  Gorras
                </a>
              </p>
              <p>
                <a href='#!' className='text-reset'>
                  Gorros
                </a>
              </p>
            </MDBCol>

            <MDBCol md="3" lg="2" xl="2" className='mx-auto mb-4'>
              <h6 className='text-uppercase fw-bold mb-4'>Servicios</h6>
              <p>
                <a href='#!' className='text-reset'>
                  Diseño gráfico
                </a>
              </p>
              <p>
                <a href='#!' className='text-reset'>
                  Serigrafia
                </a>
              </p>
              <p>
                <a href='#!' className='text-reset'>
                  Presupuestos
                </a>
              </p>
              <p>
                <a href='#!' className='text-reset'>
                  Asesoramiento
                </a>
              </p>
            </MDBCol>

            <MDBCol md="4" lg="3" xl="3" className='mx-auto mb-md-0 mb-4'>
              <h6 className='text-uppercase fw-bold mb-4'>Contact</h6>
              <p>
                <MDBIcon icon="home" className="me-2" />
                Zapala, Nqn 8340, Argentina
              </p>
              <p>
                <MDBIcon icon="envelope" className="me-3" />
                ricardorojo.dg@gmail.com
              </p>
              <p>
                <MDBIcon icon="phone" className="me-3" /> + 54 11 2332 1006
              </p>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </section>

      <div className='text-center p-4' style={{ backgroundColor: 'rgba(0, 0, 0, 0.05)' }}>
        © 2024 Todos los derechos reservados:
        <a className='text-reset fw-bold' href='https://mdbootstrap.com/'>
          Taller de Otto
        </a>
      </div>
    </MDBFooter>
  );
}