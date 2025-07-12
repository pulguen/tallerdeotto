import React, { useState, useEffect } from 'react';
import axios from '../../../context/customAxios';
import CustomButton from '../../../common/Components/Button/CustomButton';
import Swal from 'sweetalert2';

export default function SubcategoriaForm({ categorias, editData, onSuccess, defaultCategoria }) {
  const [categoriaId, setCategoriaId] = useState(defaultCategoria || '');
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (editData) {
      setNombre(editData.nombre || '');
      setDescripcion(editData.descripcion || '');
      setCategoriaId(editData.categoria || defaultCategoria || '');
    } else {
      setNombre('');
      setDescripcion('');
      setCategoriaId(defaultCategoria || '');
    }
  }, [editData, defaultCategoria]);

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    try {
      if (editData) {
        await axios.put(`gastos/subcategorias-gasto/${editData.id}/`, {
          nombre, descripcion, categoria: categoriaId
        });
        Swal.fire('Subcategoría actualizada', '', 'success');
      } else {
        await axios.post('gastos/subcategorias-gasto/', {
          nombre, descripcion, categoria: categoriaId
        });
        Swal.fire('Subcategoría creada', '', 'success');
      }
      onSuccess?.();
    } catch (error) {
      Swal.fire('Error', error.response?.data?.detail || 'Algo salió mal', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4">
      <div>
        <label>Categoría</label>
        <select className="w-full border rounded px-2 py-1" value={categoriaId} onChange={e => setCategoriaId(e.target.value)} required>
          <option value="">Seleccionar</option>
          {categorias.map(cat => (
            <option key={cat.id} value={cat.id}>{cat.nombre}</option>
          ))}
        </select>
      </div>
      <div>
        <label>Nombre</label>
        <input className="w-full border rounded px-2 py-1" value={nombre} onChange={e => setNombre(e.target.value)} required />
      </div>
      <div>
        <label>Descripción (opcional)</label>
        <textarea className="w-full border rounded px-2 py-1" rows={2} value={descripcion} onChange={e => setDescripcion(e.target.value)} />
      </div>
      <div style={{ marginTop: 16 }}>
        <CustomButton type="submit" loading={loading} disabled={loading}>
          Guardar
        </CustomButton>
      </div>
    </form>
  );
}
