// tdofrontend/src/features/Control/Trabajos/TrabajoForm.jsx
import React, { useState, useEffect } from 'react';
import axios from '../../../context/customAxios';
import Swal from 'sweetalert2';
import CustomButton from '../../../common/Components/Button/CustomButton';

const CATEGORIAS = [
    { value: 'diseno_grafico', label: 'Diseño Gráfico' },
    { value: 'social_media', label: 'Social Media' },
    { value: 'diseno_web', label: 'Diseño Web' },
    { value: 'desarrollo_software', label: 'Desarrollo de Software' },
    { value: 'estampado', label: 'Estampado' },
    { value: 'impresiones', label: 'Impresiones' },
    { value: 'branding', label: 'Branding' },
    { value: 'packaging', label: 'Packaging' },
    { value: 'otro', label: 'Otro' },
];

const TrabajoForm = ({ trabajo, onCancel, onSubmit }) => {
    const isEditing = !!trabajo;


    const [formData, setFormData] = useState({
        title: '',
        description: '',
        categoria: 'diseno_grafico',
        fecha_realizacion: new Date().toISOString().split('T')[0],
        cliente: '',
        destacado: false,
        orden: 0
    });

    const [image, setImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        if (trabajo) {
            setFormData({
                title: trabajo.title,
                description: trabajo.description,
                categoria: trabajo.categoria,
                fecha_realizacion: trabajo.fecha_realizacion,
                cliente: trabajo.cliente || '',
                destacado: trabajo.destacado,
                orden: trabajo.orden || 0
            });
            setImagePreview(trabajo.image_url || trabajo.image);
        }
    }, [trabajo]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);

        const data = new FormData();
        Object.keys(formData).forEach(key => {
            data.append(key, formData[key]);
        });

        if (image) {
            data.append('image', image);
        }

        try {
            const config = {
                headers: { 'Content-Type': 'multipart/form-data' },

            };

            if (isEditing) {
                await axios.put(`trabajos/${trabajo.id}/`, data, config);
                Swal.fire('Éxito', 'Trabajo actualizado correctamente', 'success');
            } else {
                await axios.post('trabajos/', data, config);
                Swal.fire('Éxito', 'Trabajo creado correctamente', 'success');
            }
            onSubmit();
        } catch (error) {
            console.error('Error al guardar:', error);
            const errorMsg = error.response?.data ? JSON.stringify(error.response.data) : 'Ocurrió un error al guardar';
            Swal.fire('Error', errorMsg, 'error');
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="trabajo-form-wrapper">
            <div className="trabajo-form-header">
                <h2>{isEditing ? 'Editar Trabajo' : 'Nuevo Trabajo'}</h2>
                <p className="text-muted">{isEditing ? `Editando: ${trabajo.title}` : 'Completa los campos para añadir un nuevo proyecto al portafolio.'}</p>
            </div>

            <form onSubmit={handleSubmit} className="trabajo-admin-form">
                <div className="form-main-content">
                    <div className="form-section">
                        <h3 className="form-section-title">Información General</h3>
                        <div className="mb-4">
                            <label className="form-label-custom">Título del Proyecto</label>
                            <input
                                type="text"
                                className="form-input-custom"
                                name="title"
                                placeholder="Ej: Branding para Cafetería"
                                value={formData.title}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label className="form-label-custom">Descripción Detallada</label>
                            <textarea
                                className="form-input-custom"
                                name="description"
                                rows="5"
                                placeholder="Describe el trabajo realizado..."
                                value={formData.description}
                                onChange={handleChange}
                                required
                            ></textarea>
                        </div>
                    </div>

                    <div className="form-grid-2">
                        <div className="mb-4">
                            <label className="form-label-custom">Categoría</label>
                            <select
                                className="form-input-custom"
                                name="categoria"
                                value={formData.categoria}
                                onChange={handleChange}
                            >
                                {CATEGORIAS.map(cat => (
                                    <option key={cat.value} value={cat.value}>{cat.label}</option>
                                ))}
                            </select>
                        </div>
                        <div className="mb-4">
                            <label className="form-label-custom">Fecha de Realización</label>
                            <input
                                type="date"
                                className="form-input-custom"
                                name="fecha_realizacion"
                                value={formData.fecha_realizacion}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>

                    <div className="form-grid-2">
                        <div className="mb-4">
                            <label className="form-label-custom">Cliente</label>
                            <input
                                type="text"
                                className="form-input-custom"
                                name="cliente"
                                placeholder="Nombre del cliente"
                                value={formData.cliente}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="mb-4">
                            <label className="form-label-custom">Prioridad de Orden</label>
                            <input
                                type="number"
                                className="form-input-custom"
                                name="orden"
                                value={formData.orden}
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    <div className="mb-4 custom-checkbox-wrapper">
                        <label className="custom-checkbox">
                            <input
                                type="checkbox"
                                name="destacado"
                                checked={formData.destacado}
                                onChange={handleChange}
                            />
                            <span className="checkmark"></span>
                            Destacar este trabajo en la landing page
                        </label>
                    </div>
                </div>

                <div className="form-sidebar">
                    <div className="form-section">
                        <h3 className="form-section-title">Imagen Principal</h3>
                        <div className="image-preview-container">
                            {imagePreview ? (
                                <img src={imagePreview} alt="Preview" />
                            ) : (
                                <div className="no-image-placeholder">
                                    <i className="fas fa-image fa-2x"></i>
                                    <span>Sin imagen seleccionada</span>
                                </div>
                            )}
                        </div>
                        <div className="mt-3">
                            <input
                                type="file"
                                id="trabajo-image-upload"
                                className="hidden"
                                onChange={handleImageChange}
                                accept="image/*"
                                style={{ display: 'none' }}
                            />
                            <label
                                htmlFor="trabajo-image-upload"
                                className="flex items-center justify-center w-full px-4 py-2 border-dashed border-2 rounded-xl cursor-pointer transition-colors"
                                style={{
                                    borderColor: 'var(--brand-400)',
                                    color: 'var(--brand-400)',
                                    background: 'rgba(34, 211, 238, 0.05)'
                                }}
                            >
                                <i className="fas fa-upload me-2"></i>
                                {isEditing ? 'Cambiar Imagen' : 'Subir Imagen'}
                            </label>
                            {!isEditing && !image && <p className="text-sm mt-2" style={{ color: '#ef4444' }}>La imagen es obligatoria</p>}
                        </div>
                    </div>

                    <div className="form-actions-sidebar">
                        <CustomButton type="submit" variant="primary" className="w-100 mb-2" disabled={submitting}>
                            {submitting ? 'Guardando...' : (isEditing ? 'Guardar Cambios' : 'Crear Proyecto')}
                        </CustomButton>
                        <CustomButton type="button" variant="outline-secondary" className="w-100" onClick={onCancel} disabled={submitting}>
                            Cancelar
                        </CustomButton>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default TrabajoForm;
