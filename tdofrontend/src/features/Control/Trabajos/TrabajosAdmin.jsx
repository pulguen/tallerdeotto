// tdofrontend/src/features/Control/Trabajos/TrabajosAdmin.jsx
import React, { useState, useEffect } from 'react';
import axios from '../../../context/customAxios';
import Swal from 'sweetalert2';
import CustomButton from '../../../common/Components/Button/CustomButton';
import TrabajoForm from './TrabajoForm';
import LoadingSpinner from '../../../common/Components/Feedback/LoadingSpinner';
import EmptyState from '../../../common/Components/Feedback/EmptyState';
import './TrabajosAdmin.css';

const TrabajosAdmin = () => {
    const [trabajos, setTrabajos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [editingTrabajo, setEditingTrabajo] = useState(null);



    const fetchTrabajos = async () => {
        setLoading(true);
        try {
            const response = await axios.get('trabajos/');
            setTrabajos(response.data);
        } catch (error) {
            console.error('Error al cargar trabajos:', error);
            Swal.fire('Error', 'No se pudieron cargar los trabajos', 'error');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTrabajos();
    }, []);

    const handleCreate = () => {
        setEditingTrabajo(null);
        setShowForm(true);
    };

    const handleEdit = (trabajo) => {
        setEditingTrabajo(trabajo);
        setShowForm(true);
    };

    const handleDelete = async (id) => {
        const result = await Swal.fire({
            title: '¿Estás seguro?',
            text: "No podrás revertir esta acción",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Sí, eliminar',
            cancelButtonText: 'Cancelar',
            background: '#1e293b',
            color: '#fff'
        });

        if (result.isConfirmed) {
            try {
                await axios.delete(`trabajos/${id}/`);
                Swal.fire({
                    title: 'Eliminado',
                    text: 'El trabajo ha sido eliminado.',
                    icon: 'success',
                    background: '#1e293b',
                    color: '#fff'
                });
                fetchTrabajos();
            } catch (error) {
                console.error('Error al eliminar:', error);
                Swal.fire({
                    title: 'Error',
                    text: 'No se pudo eliminar el trabajo',
                    icon: 'error',
                    background: '#1e293b',
                    color: '#fff'
                });
            }
        }
    };

    const handleFormSubmit = () => {
        setShowForm(false);
        fetchTrabajos();
    };

    if (loading && !showForm) {
        return <LoadingSpinner text="Cargando trabajos..." />;
    }

    // Si estamos en modo formulario, renderizamos solo el form (que ya tiene sus estilos)
    if (showForm) {
        return (
            <div className="admin-content-fade-in">
                <TrabajoForm
                    trabajo={editingTrabajo}
                    onCancel={() => setShowForm(false)}
                    onSubmit={handleFormSubmit}
                />
            </div>
        );
    }

    return (
        <div className="admin-content-fade-in">
            <div className="admin-section-header">
                <div>
                    <h1 className="admin-title-gradient">Trabajos Recientes</h1>
                    <p className="text-gray-400 text-sm mt-1">Administra el portafolio de trabajos</p>
                </div>
                <CustomButton variant="primary" onClick={handleCreate}>
                    <i className="fas fa-plus me-2"></i> Nuevo Trabajo
                </CustomButton>
            </div>

            <div className="trabajos-admin-grid">
                {trabajos.length === 0 ? (
                    <div className="col-span-full">
                        <EmptyState
                            icon="fas fa-briefcase"
                            title="Sin Trabajos"
                            description="No hay trabajos registrados todavía."
                            actionLabel="Crear Nuevo"
                            onAction={handleCreate}
                        />
                    </div>
                ) : (
                    trabajos.map((t) => (
                        <article key={t.id} className="trabajo-admin-card">
                            <div className="trabajo-admin-media">
                                <img src={t.image_url || t.image} alt={t.title} />
                                {t.destacado && <span className="trabajo-admin-badge destacado">Destacado</span>}
                                <span className="trabajo-admin-badge">{t.categoria_display}</span>
                            </div>
                            <div className="trabajo-admin-body">
                                <h3 className="trabajo-admin-title">{t.title}</h3>
                                <div className="trabajo-admin-info">
                                    <span><i className="far fa-calendar-alt me-1"></i> {t.fecha_realizacion}</span>
                                    {t.cliente && <span className="ms-3"><i className="far fa-user me-1"></i> {t.cliente}</span>}
                                </div>
                                <div className="trabajo-admin-actions">
                                    <CustomButton
                                        variant="outline"
                                        size="sm"
                                        className="flex-grow-1"
                                        onClick={() => handleEdit(t)}
                                    >
                                        Editar
                                    </CustomButton>
                                    <CustomButton
                                        variant="outline-danger"
                                        size="sm"
                                        onClick={() => handleDelete(t.id)}
                                    >
                                        <i className="fas fa-trash"></i>
                                    </CustomButton>
                                </div>
                            </div>
                        </article>
                    ))
                )}
            </div>
        </div>
    );
};

export default TrabajosAdmin;
