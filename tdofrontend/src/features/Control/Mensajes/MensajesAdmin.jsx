import React, { useState, useEffect } from 'react';
import axios from '../../../context/customAxios';
import Swal from 'sweetalert2';
import CustomButton from '../../../common/Components/Button/CustomButton';
import LoadingSpinner from '../../../common/Components/Feedback/LoadingSpinner';
import EmptyState from '../../../common/Components/Feedback/EmptyState';
import './MensajesAdmin.css';

const MensajesAdmin = () => {
    const [mensajes, setMensajes] = useState([]);
    const [config, setConfig] = useState(null);
    const [loading, setLoading] = useState(true);
    const [viewingMensaje, setViewingMensaje] = useState(null);
    const [activeTab, setActiveTab] = useState('mensajes'); // 'mensajes' or 'config'
    const [filter, setFilter] = useState({ leido: '', tipo_consulta: '' });

    const fetchMensajes = async () => {
        try {
            const params = {};
            if (filter.leido !== '') params.leido = filter.leido;
            if (filter.tipo_consulta !== '') params.tipo_consulta = filter.tipo_consulta;

            const response = await axios.get('contacto/mensajes/', { params });
            setMensajes(response.data);
        } catch (error) {
            console.error('Error al cargar mensajes:', error);
            Swal.fire('Error', 'No se pudieron cargar los mensajes', 'error');
        }
    };

    const fetchConfig = async () => {
        try {
            const response = await axios.get('contacto/configuracion/');
            setConfig(response.data);
        } catch (error) {
            console.error('Error al cargar configuración:', error);
            // Si es 404, el backend responderá con error, lo manejamos permitiendo crear uno nuevo
            if (error.response?.status !== 404) {
                Swal.fire('Error', 'No se pudo cargar la configuración de email', 'error');
            }
        }
    };

    const loadData = async () => {
        setLoading(true);
        await Promise.all([fetchMensajes(), fetchConfig()]);
        setLoading(false);
    };

    useEffect(() => {
        loadData();
    }, [filter]);

    const handleMarkAsRead = async (id, currentStatus) => {
        try {
            await axios.patch(`contacto/mensajes/${id}/`, { leido: !currentStatus });
            fetchMensajes();
        } catch (error) {
            console.error('Error al actualizar mensaje:', error);
        }
    };

    const handleMarkAsReplied = async (id, currentStatus) => {
        try {
            await axios.patch(`contacto/mensajes/${id}/`, { respondido: !currentStatus });
            fetchMensajes();
        } catch (error) {
            console.error('Error al actualizar mensaje:', error);
        }
    };

    const handleDelete = async (id) => {
        const result = await Swal.fire({
            title: '¿Estás seguro?',
            text: "El mensaje se eliminará permanentemente.",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Sí, eliminar',
            cancelButtonText: 'Cancelar',
            background: '#120804',
            color: '#f7dcb2'
        });

        if (result.isConfirmed) {
            try {
                await axios.delete(`contacto/mensajes/${id}/`);
                Swal.fire({
                    title: 'Eliminado',
                    text: 'Mensaje borrado.',
                    icon: 'success',
                    background: '#120804',
                    color: '#f7dcb2'
                });
                fetchMensajes();
            } catch (error) {
                console.error('Error al eliminar:', error);
                Swal.fire({
                    title: 'Error',
                    text: 'No se pudo eliminar el mensaje',
                    icon: 'error',
                    background: '#120804',
                    color: '#f7dcb2'
                });
            }
        }
    };

    const handleUpdateConfig = async (e) => {
        e.preventDefault();
        const email = e.target.email_destino.value;
        try {
            await axios.post('contacto/configuracion/', { email_destino: email });
            Swal.fire({
                title: 'Guardado',
                text: 'Configuración actualizada correctamente.',
                icon: 'success',
                background: '#120804',
                color: '#f7dcb2'
            });
            fetchConfig();
        } catch (error) {
            console.error('Error al actualizar configuración:', error);
            Swal.fire('Error', 'No se pudo guardar la configuración', 'error');
        }
    };

    if (loading) return <LoadingSpinner text="Cargando mensajes..." />;

    return (
        <div className="admin-content-fade-in mensajes-admin">
            <div className="admin-section-header">
                <div>
                    <h1 className="admin-title-gradient">Mensajes de Contacto</h1>
                    <p className="text-muted small mt-1">Gestiona las consultas recibidas desde la web</p>
                </div>
                <div className="mensajes-tabs">
                    <button
                        className={`mensaje-tab ${activeTab === 'mensajes' ? 'active' : ''}`}
                        onClick={() => setActiveTab('mensajes')}
                    >
                        Listado
                    </button>
                    <button
                        className={`mensaje-tab ${activeTab === 'config' ? 'active' : ''}`}
                        onClick={() => setActiveTab('config')}
                    >
                        Configuración Email
                    </button>
                </div>
            </div>

            {activeTab === 'mensajes' ? (
                <>
                    <div className="mensajes-filters">
                        <select
                            value={filter.leido}
                            onChange={(e) => setFilter({ ...filter, leido: e.target.value })}
                        >
                            <option value="">Todos los estados</option>
                            <option value="false">No leídos</option>
                            <option value="true">Leídos</option>
                        </select>
                        <select
                            value={filter.tipo_consulta}
                            onChange={(e) => setFilter({ ...filter, tipo_consulta: e.target.value })}
                        >
                            <option value="">Todos los tipos</option>
                            <option value="presupuesto">Presupuesto</option>
                            <option value="pedido">Pedido</option>
                            <option value="info">Información</option>
                            <option value="otro">Otro</option>
                        </select>
                    </div>

                    <div className="mensajes-grid">
                        {mensajes.length === 0 ? (
                            <EmptyState
                                icon="fas fa-envelope-open"
                                title="Sin mensajes"
                                description="No se encontraron mensajes con los filtros seleccionados."
                            />
                        ) : (
                            mensajes.map((m) => (
                                <div key={m.id} className={`mensaje-card ${!m.leido ? 'unread' : ''}`}>
                                    <div className="mensaje-header">
                                        <div className="mensaje-user-info">
                                            <h3>{m.nombre}</h3>
                                            <span className="mensaje-date">{new Date(m.fecha_creacion).toLocaleDateString()}</span>
                                        </div>
                                        <div className="mensaje-badges">
                                            <span className={`badge-type ${m.tipo_consulta}`}>{m.tipo_consulta}</span>
                                            {m.respondido && <span className="badge-status replied">Respondido</span>}
                                        </div>
                                    </div>
                                    <div className="mensaje-body">
                                        <p className="mensaje-excerpt">{m.mensaje.substring(0, 100)}{m.mensaje.length > 100 ? '...' : ''}</p>
                                    </div>
                                    <div className="mensaje-footer">
                                        <div className="mensaje-contact-info">
                                            <span><i className="fas fa-envelope"></i> {m.email || 'N/A'}</span>
                                            <span><i className="fas fa-phone"></i> {m.telefono || 'N/A'}</span>
                                        </div>
                                        <div className="mensaje-actions">
                                            <CustomButton variant="outline" size="sm" onClick={() => setViewingMensaje(m)}>
                                                Ver Detalle
                                            </CustomButton>
                                            <button
                                                className={`action-icon ${m.leido ? 'active' : ''}`}
                                                title={m.leido ? "Marcar como no leído" : "Marcar como leído"}
                                                onClick={() => handleMarkAsRead(m.id, m.leido)}
                                            >
                                                <i className={`fas fa-eye${m.leido ? '-slash' : ''}`}></i>
                                            </button>
                                            <button
                                                className={`action-icon delete`}
                                                title="Eliminar"
                                                onClick={() => handleDelete(m.id)}
                                            >
                                                <i className="fas fa-trash"></i>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </>
            ) : (
                <div className="config-container">
                    <form onSubmit={handleUpdateConfig} className="config-form">
                        <div className="form-group">
                            <label>Mail de destino para notificaciones</label>
                            <input
                                type="email"
                                name="email_destino"
                                defaultValue={config?.email_destino || ''}
                                placeholder="ejemplo@mail.com"
                                required
                            />
                            <p className="help-text">Aquí es donde recibirás una copia de cada mensaje que llegue por la web.</p>
                        </div>
                        <CustomButton type="submit" variant="primary">
                            Guardar Configuración
                        </CustomButton>
                    </form>
                </div>
            )}

            {/* Modal de Detalle */}
            {viewingMensaje && (
                <div className="mensaje-modal-overlay" onClick={() => setViewingMensaje(null)}>
                    <div className="mensaje-modal" onClick={e => e.stopPropagation()}>
                        <div className="modal-header">
                            <h2>Consulta de {viewingMensaje.nombre}</h2>
                            <button className="close-btn" onClick={() => setViewingMensaje(null)}>&times;</button>
                        </div>
                        <div className="modal-content">
                            <div className="modal-info-grid">
                                <div><strong>Fecha:</strong> {new Date(viewingMensaje.fecha_creacion).toLocaleString()}</div>
                                <div><strong>Tipo:</strong> {viewingMensaje.tipo_consulta}</div>
                                <div><strong>Email:</strong> {viewingMensaje.email || 'No proporcionado'}</div>
                                <div><strong>Teléfono:</strong> {viewingMensaje.telefono || 'No proporcionado'}</div>
                            </div>
                            <div className="modal-message-body">
                                <strong>Mensaje:</strong>
                                <p>{viewingMensaje.mensaje}</p>
                            </div>
                            <div className="modal-actions-bar">
                                <CustomButton
                                    variant={viewingMensaje.respondido ? "outline" : "primary"}
                                    onClick={() => handleMarkAsReplied(viewingMensaje.id, viewingMensaje.respondido)}
                                >
                                    {viewingMensaje.respondido ? "Marcar como Pendiente" : "Marcar como Respondido"}
                                </CustomButton>
                                {viewingMensaje.email && (
                                    <CustomButton
                                        as="a"
                                        href={`mailto:${viewingMensaje.email}?subject=RE: Consulta Taller de Otto - ${viewingMensaje.tipo_consulta}`}
                                        variant="outline"
                                    >
                                        Responder por Mail
                                    </CustomButton>
                                )}
                                {viewingMensaje.telefono && (
                                    <CustomButton
                                        as="a"
                                        href={`https://wa.me/${viewingMensaje.telefono.replace(/\D/g, '')}`}
                                        target="_blank"
                                        variant="outline"
                                    >
                                        Responder por WhatsApp
                                    </CustomButton>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MensajesAdmin;
