// src/components/Home/ContactoHome.jsx
import React, { useState } from 'react';
import './ContactHome.css';

const ContactoHome = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    telefono: '',
    tipoConsulta: 'presupuesto',
    mensaje: '',
  });

  const [sending, setSending] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // Validaciones básicas
    if (!formData.nombre.trim() || !formData.mensaje.trim()) {
      setError('Por favor completá tu nombre y el mensaje.');
      return;
    }

    setSending(true);
    try {
      if (onSubmit) {
        // Si el padre pasa una función, la usamos
        await onSubmit(formData);
      } else {
        // Placeholder: acá después podés pegar tu fetch a la API
        console.log('Datos de contacto enviados:', formData);
      }
      setSuccess('¡Mensaje enviado! Te vamos a responder a la brevedad.');
      setFormData({
        nombre: '',
        email: '',
        telefono: '',
        tipoConsulta: 'presupuesto',
        mensaje: '',
      });
    } catch (err) {
      setError('No pudimos enviar el mensaje. Probá de nuevo en unos segundos.');
    } finally {
      setSending(false);
    }
  };

  return (
    <section className="contacto-home" id="contacto">
      <div className="contacto-home__container">
        {/* Columna texto */}
        <div className="contacto-home__info">
          <h2 className="contacto-home__title">Ponete en contacto con el taller</h2>
          <p className="contacto-home__subtitle">
            Contanos qué necesitás: remeras para tu marca, uniformes para tu equipo,
            merch para eventos o algo totalmente a medida.
          </p>

          <ul className="contacto-home__highlights">
            <li>💬 Respuesta personalizada</li>
            <li>🧵 Asesoría sobre materiales y técnicas de estampado</li>
            <li>📦 Producciones chicas y medianas</li>
          </ul>

          <div className="contacto-home__whatsapp">
            <span>¿Preferís hablar directo?</span>
            <a
              href="https://wa.me/5491123321006"
              target="_blank"
              rel="noreferrer"
              className="contacto-home__whatsapp-btn"
            >
              Escribir por WhatsApp
            </a>
          </div>
        </div>

        {/* Columna formulario */}
        <div className="contacto-home__form-wrapper">
          <form className="contacto-home__form" onSubmit={handleSubmit}>
            <div className="contacto-home__field">
              <label htmlFor="nombre">Nombre y apellido *</label>
              <input
                type="text"
                id="nombre"
                name="nombre"
                placeholder="Cómo te llamás"
                value={formData.nombre}
                onChange={handleChange}
              />
            </div>

            <div className="contacto-home__field-group">
              <div className="contacto-home__field">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="tuemail@ejemplo.com"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>

              <div className="contacto-home__field">
                <label htmlFor="telefono">Teléfono / WhatsApp</label>
                <input
                  type="tel"
                  id="telefono"
                  name="telefono"
                  placeholder="+54 9 ..."
                  value={formData.telefono}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="contacto-home__field">
              <label htmlFor="tipoConsulta">Tipo de consulta</label>
              <select
                id="tipoConsulta"
                name="tipoConsulta"
                value={formData.tipoConsulta}
                onChange={handleChange}
              >
                <option value="presupuesto">Quiero un presupuesto</option>
                <option value="pedido">Consulta sobre un pedido</option>
                <option value="info">Quiero info sobre servicios</option>
                <option value="otro">Otro</option>
              </select>
            </div>

            <div className="contacto-home__field">
              <label htmlFor="mensaje">Mensaje *</label>
              <textarea
                id="mensaje"
                name="mensaje"
                rows="4"
                placeholder="Contanos cantidad aproximada, tipo de prenda, plazos, etc."
                value={formData.mensaje}
                onChange={handleChange}
              />
            </div>

            {error && <p className="contacto-home__feedback contacto-home__feedback--error">{error}</p>}
            {success && (
              <p className="contacto-home__feedback contacto-home__feedback--success">{success}</p>
            )}

            <button
              type="submit"
              className="contacto-home__submit"
              disabled={sending}
            >
              {sending ? 'Enviando...' : 'Enviar mensaje'}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactoHome;
