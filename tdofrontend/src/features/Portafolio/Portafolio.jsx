// src/features/Portafolio/Portafolio.jsx
import { useState, useEffect } from "react";
import axios from "../../context/customAxios";
import "./Portafolio.css";

export default function Portafolio() {
    const [trabajos, setTrabajos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState("all"); // all, diseño, web, estampado, etc.

    useEffect(() => {
        const fetchTrabajos = async () => {
            try {
                const response = await axios.get("trabajos/");
                if (Array.isArray(response.data)) {
                    setTrabajos(response.data);
                }
            } catch (error) {
                console.error("Error fetching portfolio:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchTrabajos();
    }, []);

    const filteredTrabajos = filter === "all"
        ? trabajos
        : trabajos.filter(t => t.categoria === filter);

    if (loading) {
        return (
            <div className="portafolio-page">
                <div className="portafolio-loading">
                    <p>Cargando portafolio completo...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="portafolio-page">
            <header className="portafolio-header">
                <h1 className="portafolio-title">Portafolio Completo</h1>
                <p className="portafolio-subtitle">
                    Todos nuestros proyectos de diseño, desarrollo y producción gráfica.
                </p>
            </header>

            {/* Filtros opcionales */}
            <div className="portafolio-filters">
                <button
                    className={filter === "all" ? "filter-btn active" : "filter-btn"}
                    onClick={() => setFilter("all")}
                >
                    Todos
                </button>
                <button
                    className={filter === "diseño" ? "filter-btn active" : "filter-btn"}
                    onClick={() => setFilter("diseño")}
                >
                    Diseño Gráfico
                </button>
                <button
                    className={filter === "web" ? "filter-btn active" : "filter-btn"}
                    onClick={() => setFilter("web")}
                >
                    Desarrollo Web
                </button>
                <button
                    className={filter === "estampado" ? "filter-btn active" : "filter-btn"}
                    onClick={() => setFilter("estampado")}
                >
                    Estampado
                </button>
            </div>

            {/* Grid de trabajos */}
            <div className="portafolio-grid">
                {filteredTrabajos.length > 0 ? (
                    filteredTrabajos.map((trabajo) => (
                        <article key={trabajo.id || trabajo.pk} className="portafolio-card">
                            <div className="portafolio-card-media">
                                <img
                                    src={trabajo.image_url || trabajo.image}
                                    alt={trabajo.title}
                                    loading="lazy"
                                    onError={(e) => { e.target.src = "/Images/placeholder-work.jpg"; }}
                                />
                            </div>
                            <div className="portafolio-card-body">
                                <h3 className="portafolio-card-title">{trabajo.title}</h3>
                                <p className="portafolio-card-desc">{trabajo.description}</p>
                            </div>
                        </article>
                    ))
                ) : (
                    <p className="portafolio-empty">No hay trabajos en esta categoría.</p>
                )}
            </div>
        </div>
    );
}
