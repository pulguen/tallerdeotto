// tdofrontend/src/features/Control/Trabajos/TrabajoForm.jsx
import React, { useState, useEffect } from 'react';
import axios from '../../../context/customAxios';
import Swal from 'sweetalert2';
import CustomButton from '../../../common/Components/Button/CustomButton';

const TrabajoForm = ({ trabajo, onCancel, onSubmit }) => {
    const isEditing = !!trabajo;

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        fecha_realizacion: new Date().toISOString().split('T')[0],
        cliente: '',
        destacado: false,
        orden: 0
    });

    // Estado para tags
    const [availableTags, setAvailableTags] = useState([]);
    const [selectedTags, setSelectedTags] = useState([]);

    // Estado para imágenes
    const [newImages, setNewImages] = useState([]); // Archivos File
    const [newImagesPreview, setNewImagesPreview] = useState([]); // URLs preview

    const [submitting, setSubmitting] = useState(false);

    // Cargar tags disponibles
    useEffect(() => {
        const fetchTags = async () => {
            try {
                const response = await axios.get('trabajos/tags/');
                setAvailableTags(response.data);
            } catch (error) {
                console.error("Error cargando tags:", error);
            }
        };
        fetchTags();
    }, []);

    useEffect(() => {
        if (trabajo) {
            setFormData({
                title: trabajo.title,
                description: trabajo.description,
                fecha_realizacion: trabajo.fecha_realizacion,
                cliente: trabajo.cliente || '',
                destacado: trabajo.destacado,
                orden: trabajo.orden || 0
            });
            // Cargar tags seleccionados
            if (trabajo.tags) {
                setSelectedTags(trabajo.tags.map(t => t.id));
            }
        }
    }, [trabajo]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleTagToggle = (tagId) => {
        setSelectedTags(prev => {
            if (prev.includes(tagId)) {
                return prev.filter(id => id !== tagId);
            }
            return [...prev, tagId];
        });
    };

    const handleImageChange = (e) => {
        if (e.target.files) {
            const filesArray = Array.from(e.target.files);
            setNewImages(prev => [...prev, ...filesArray]);

            // Generar previews
            const filePreviews = filesArray.map(file => URL.createObjectURL(file));
            setNewImagesPreview(prev => [...prev, ...filePreviews]);
        }
    };

    const removeNewImage = (index) => {
        setNewImages(prev => prev.filter((_, i) => i !== index));
        setNewImagesPreview(prev => prev.filter((_, i) => i !== index));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);

        const data = new FormData();
        Object.keys(formData).forEach(key => {
            data.append(key, formData[key]);
        });

        // Agregar Tags
        selectedTags.forEach(tagId => {
            data.append('tag_ids', tagId);
        });

        // Agregar Imágenes (solo nuevas)
        newImages.forEach(file => {
            data.append('images', file);
        });

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
            let msg = 'Ocurrió un error al guardar';
            if (error.response?.data?.detail) msg = error.response.data.detail;
            Swal.fire('Error', msg, 'error');
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="trabajo-admin-form animate-fade-in">
            <div className="form-main-content">
                <div className="trabajo-form-header">
                    <h2>{isEditing ? 'Editar Trabajo' : 'Nuevo Trabajo'}</h2>
                    <p className="text-muted">Complete la información del proyecto</p>
                </div>

                <form id="workForm" onSubmit={handleSubmit} className="form-grid-2">
                    {/* Título */}
                    <div className="form-group" style={{ gridColumn: '1 / -1' }}>
                        <label className="form-label">Título del Proyecto</label>
                        <input
                            type="text"
                            name="title"
                            className="form-control"
                            value={formData.title}
                            onChange={handleChange}
                            required
                            placeholder="Ej: Rediseño de Identidad Corporativa"
                        />
                    </div>

                    {/* Tags / Categorías */}
                    <div className="form-group" style={{ gridColumn: '1 / -1' }}>
                        <label className="form-label">Etiquetas (Categorías)</label>
                        <div className="tags-container" style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                            {availableTags.map(tag => (
                                <button
                                    type="button"
                                    key={tag.id}
                                    onClick={() => handleTagToggle(tag.id)}
                                    className={`badge-btn ${selectedTags.includes(tag.id) ? 'active' : ''}`}
                                    style={{
                                        padding: '6px 12px',
                                        borderRadius: '20px',
                                        border: '1px solid ' + (selectedTags.includes(tag.id) ? 'var(--brand-500)' : 'var(--border-subtle)'),
                                        backgroundColor: selectedTags.includes(tag.id) ? 'var(--brand-500)' : 'transparent',
                                        color: selectedTags.includes(tag.id) ? '#fff' : 'var(--text-secondary)',
                                        cursor: 'pointer',
                                        fontSize: '0.85rem',
                                        transition: 'all 0.2s'
                                    }}
                                >
                                    {tag.nombre}
                                </button>
                            ))}
                            {availableTags.length === 0 && <p className="text-muted text-sm">No hay tags disponibles. (Contacte al admin)</p>}
                        </div>
                    </div>

                    {/* Cliente */}
                    <div className="form-group">
                        <label className="form-label">Cliente</label>
                        <input
                            type="text"
                            name="cliente"
                            className="form-control"
                            value={formData.cliente}
                            onChange={handleChange}
                            placeholder="Nombre del cliente"
                        />
                    </div>

                    {/* Fecha */}
                    <div className="form-group">
                        <label className="form-label">Fecha de Realización</label>
                        <input
                            type="date"
                            name="fecha_realizacion"
                            className="form-control"
                            value={formData.fecha_realizacion}
                            onChange={handleChange}
                        />
                    </div>

                    {/* Orden */}
                    <div className="form-group">
                        <label className="form-label">Orden de Visualización</label>
                        <input
                            type="number"
                            name="orden"
                            className="form-control"
                            value={formData.orden}
                            onChange={handleChange}
                            min="0"
                        />
                        <small className="form-help">Menor número = aparece primero</small>
                    </div>

                    {/* Checkbox Destacado */}
                    <div className="form-group checkbox-group" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <input
                            type="checkbox"
                            name="destacado"
                            id="destacado"
                            checked={formData.destacado}
                            onChange={handleChange}
                            className="form-checkbox"
                        />
                        <label htmlFor="destacado" className="form-label mb-0" style={{ cursor: 'pointer' }}>Destacar en Home</label>
                    </div>

                    {/* Descripción */}
                    <div className="form-group" style={{ gridColumn: '1 / -1' }}>
                        <label className="form-label">Descripción Detallada</label>
                        <textarea
                            name="description"
                            className="form-control"
                            rows="4"
                            value={formData.description}
                            onChange={handleChange}
                            required
                            placeholder="Describa el trabajo realizado..."
                        ></textarea>
                    </div>

                </form>
            </div>

            {/* Sidebar: Galería de Imágenes */}
            <div className="form-sidebar form-main-content">
                <div className="form-group">
                    <label className="form-section-title">Galería de Imágenes</label>

                    {/* Upload Area */}
                    <div className="upload-area" style={{ marginBottom: '1rem' }}>
                        <label htmlFor="image-upload" className="custom-file-upload" style={{
                            display: 'block',
                            padding: '1rem',
                            border: '2px dashed var(--border-subtle)',
                            borderRadius: '8px',
                            textAlign: 'center',
                            cursor: 'pointer',
                            color: 'var(--brand-500)'
                        }}>
                            <i className="fa-solid fa-cloud-arrow-up fa-lg mb-2"></i>
                            <div>Agregar Imágenes</div>
                        </label>
                        <input
                            id="image-upload"
                            type="file"
                            multiple
                            accept="image/*"
                            onChange={handleImageChange}
                            style={{ display: 'none' }}
                        />
                    </div>

                    {/* Preview Grid */}
                    <div className="gallery-preview-grid" style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(2, 1fr)',
                        gap: '8px'
                    }}>
                        {/* Imágenes existentes (si editamos) */}
                        {isEditing && trabajo.imagenes && trabajo.imagenes.map(img => (
                            <div key={img.id} className="gallery-item-preview" style={{ position: 'relative', aspectRatio: '1' }}>
                                <img src={img.image_url || img.image} alt="preview" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '4px' }} />
                                {img.es_principal && <div style={{ position: 'absolute', top: 2, left: 2, background: 'var(--brand-500)', color: 'white', fontSize: '0.6rem', padding: '2px 4px', borderRadius: '2px' }}>Principal</div>}
                            </div>
                        ))}

                        {/* Nuevas Imágenes */}
                        {newImagesPreview.map((src, idx) => (
                            <div key={`new-${idx}`} className="gallery-preview-item" style={{ position: 'relative', aspectRatio: '1' }}>
                                <img src={src} alt="New upload" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '4px', border: '2px solid var(--brand-500)' }} />
                                <button
                                    type="button"
                                    onClick={() => removeNewImage(idx)}
                                    style={{
                                        position: 'absolute', top: '-5px', right: '-5px',
                                        background: 'red', color: 'white', border: 'none',
                                        borderRadius: '50%', width: '20px', height: '20px',
                                        display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer'
                                    }}
                                >
                                    &times;
                                </button>
                            </div>
                        ))}
                    </div>
                    <small className="form-help text-center d-block mt-2">Puede subir múltiples imágenes a la vez.</small>
                </div>

                <div className="form-actions-sidebar">
                    <CustomButton variant="outline" onClick={onCancel} className="w-100 mb-2">
                        Cancelar
                    </CustomButton>
                    <CustomButton type="submit" form="workForm" variant="primary" className="w-100" disabled={submitting}>
                        {submitting ? 'Guardando...' : (isEditing ? 'Actualizar' : 'Crear Trabajo')}
                    </CustomButton>
                </div>
            </div>
        </div>
    );
};

export default TrabajoForm;
