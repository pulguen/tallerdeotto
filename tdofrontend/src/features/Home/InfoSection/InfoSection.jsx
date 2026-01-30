// src/features/Home/InfoSection/InfoSection.jsx
import React, { useEffect, useRef, useState } from 'react';
import './InfoSection.css';

const InfoSection = () => {
    const sectionRef = useRef(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.disconnect(); // Animar solo una vez
                }
            },
            { threshold: 0.3 } // Disparar cuando el 30% sea visible
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => observer.disconnect();
    }, []);

    return (
        <section className="info-section">
            <div
                className={`info-container ${isVisible ? 'visible' : ''}`}
                ref={sectionRef}
            >
                <div className="info-left">
                    <h2 className="info-title">
                        Transformamos tus ideas en <span className="highlight ff-brokenscript">realidad digital</span>
                    </h2>

                    <ul className="info-features" aria-label="Beneficios">
                        <li>⚡ Entregas ágiles</li>
                        <li>🎯 Enfoque a resultados</li>
                        <li>🌱 Comunicación efectiva para todos tus canales</li>
                    </ul>
                </div>

                <div className="info-right">
                    <p className="info-desc">
                        Combinamos diseño, tecnología y producción gráfica para ofrecer resultados integrales:
                        desde tu identidad visual hasta plataformas web y aplicaciones personalizadas para marcas,
                        empresas e instituciones.
                    </p>
                </div>
            </div>
        </section>
    );
};

export default InfoSection;
