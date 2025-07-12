// src/components/tu/ruta/CategoriaForm.js
import React, { useState, useEffect } from 'react';
import axios from '../../../context/customAxios';
import CustomButton from '../../../common/Components/Button/CustomButton';
import Swal from 'sweetalert2';

export default function CategoriaForm({ editData, onSuccess }) {
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (editData) {
      setNombre(editData.nombre || '');
      setDescripcion(editData.descripcion || '');
    } else {
      setNombre('');
      setDescripcion('');
    }
  }, [editData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (editData && editData.id) {
        await axios.put(`gastos/categorias-gasto/${editData.id}/`, { nombre, descripcion });
        Swal.fire('Categoría actualizada', '', 'success');
      } else {
        await axios.post('gastos/categorias-gasto/', { nombre, descripcion });
        Swal.fire('Categoría creada', '', 'success');
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
        <label>Nombre</label>
        <input
          className="w-full border rounded px-2 py-1"
          value={nombre}
          onChange={e => setNombre(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Descripción (opcional)</label>
        <textarea
          className="w-full border rounded px-2 py-1"
          rows={2}
          value={descripcion}
          onChange={e => setDescripcion(e.target.value)}
        />
      </div>
      <div className="mt-4">
        <CustomButton type="submit" loading={loading} disabled={loading}>
          Guardar
        </CustomButton>
      </div>
    </form>
  );
}
