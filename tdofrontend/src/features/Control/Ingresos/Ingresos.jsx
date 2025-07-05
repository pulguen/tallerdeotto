import React, { useState, useEffect, useCallback } from 'react';
import axios from '../../../context/customAxios';
import { useAuth } from '../../../context/useAuth';

export default function Ingresos() {
  const { user } = useAuth();

  const isAdmin = user?.groups?.includes('Admin');
  const isStaff = user?.groups?.includes('Staff');
  const canEdit = isAdmin || isStaff;

  const [ingresos, setIngresos] = useState([]);
  const [newDescripcion, setNewDescripcion] = useState('');
  const [newFecha, setNewFecha] = useState('');
  const [newMonto, setNewMonto] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editDescripcion, setEditDescripcion] = useState('');
  const [editFecha, setEditFecha] = useState('');
  const [editMonto, setEditMonto] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const normalizeData = data => {
    if (Array.isArray(data)) return data;
    if (data.results && Array.isArray(data.results)) return data.results;
    if (data.data && Array.isArray(data.data)) return data.data;
    if (data.ingresos && Array.isArray(data.ingresos)) return data.ingresos;
    return [];
  };

  const fetchIngresos = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const { data } = await axios.get('ingresos/');
      console.log('Respuesta de la API:', data);
      setIngresos(normalizeData(data));
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.detail || err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    console.log("Componente Ingresos montado");
    console.log("Usuario actual:", user);
    console.log("Grupos:", user?.groups);
    fetchIngresos();
  }, [fetchIngresos, user]);

  const handleAdd = async () => {
    if (!canEdit) return;
    setError('');
    const montoNum = parseFloat(newMonto);
    if (!newDescripcion.trim() || !newFecha || isNaN(montoNum)) {
      setError('Completa todos los campos con valores válidos');
      return;
    }

    setLoading(true);
    try {
      const { data: created } = await axios.post('ingresos/', {
        descripcion: newDescripcion,
        fecha: newFecha,
        monto: montoNum,
      });
      setIngresos(prev => [...prev, created]);
      setNewDescripcion('');
      setNewFecha('');
      setNewMonto('');
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.detail || err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async id => {
    if (!canEdit) return;
    setError('');
    setLoading(true);
    try {
      await axios.delete(`ingresos/${id}/`);
      setIngresos(prev => prev.filter(i => i.id !== id));
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.detail || err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = ingreso => {
    if (!canEdit) return;
    setEditingId(ingreso.id);
    setEditDescripcion(ingreso.descripcion);
    setEditFecha(ingreso.fecha);
    setEditMonto(String(ingreso.monto));
    setError('');
  };

  const handleUpdate = async id => {
    if (!canEdit) return;
    setError('');
    const montoNum = parseFloat(editMonto);
    if (!editDescripcion.trim() || !editFecha || isNaN(montoNum)) {
      setError('Completa todos los campos con valores válidos');
      return;
    }

    setLoading(true);
    try {
      const { data: updated } = await axios.put(`ingresos/${id}/`, {
        descripcion: editDescripcion,
        fecha: editFecha,
        monto: montoNum,
      });
      setIngresos(prev => prev.map(i => i.id === id ? updated : i));
      setEditingId(null);
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.detail || err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Gestión de Ingresos</h1>
      </div>

      {error && <div className="mb-4 text-red-600">{error}</div>}
      {loading && <div className="mb-4">Cargando...</div>}

      {canEdit && (
        <div className="flex flex-col sm:flex-row gap-2 mb-6">
          <input
            className="border p-2 flex-1"
            type="text"
            placeholder="Descripción"
            value={newDescripcion}
            onChange={e => setNewDescripcion(e.target.value)}
            disabled={loading}
          />
          <input
            className="border p-2"
            type="date"
            value={newFecha}
            onChange={e => setNewFecha(e.target.value)}
            disabled={loading}
          />
          <input
            className="border p-2 w-32"
            type="number"
            placeholder="Monto"
            value={newMonto}
            onChange={e => setNewMonto(e.target.value)}
            disabled={loading}
          />
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
            onClick={handleAdd}
            disabled={loading}
          >
            Agregar
          </button>
        </div>
      )}

      {!loading && ingresos.length === 0 && !error && (
        <div className="text-gray-600">No hay ingresos registrados.</div>
      )}

      <ul className="space-y-4">
        {ingresos.map(ing => (
          <li
            key={ing.id}
            className="border p-4 rounded shadow-sm flex justify-between items-center"
          >
            {editingId === ing.id ? (
              <div className="flex flex-col sm:flex-row gap-2 flex-1">
                <input
                  className="border p-1 flex-1"
                  type="text"
                  value={editDescripcion}
                  onChange={e => setEditDescripcion(e.target.value)}
                  disabled={loading}
                />
                <input
                  className="border p-1"
                  type="date"
                  value={editFecha}
                  onChange={e => setEditFecha(e.target.value)}
                  disabled={loading}
                />
                <input
                  className="border p-1 w-24"
                  type="number"
                  value={editMonto}
                  onChange={e => setEditMonto(e.target.value)}
                  disabled={loading}
                />
                <button
                  className="bg-green-500 text-white px-2 py-1 rounded disabled:opacity-50"
                  onClick={() => handleUpdate(ing.id)}
                  disabled={loading}
                >
                  Guardar
                </button>
                <button
                  className="bg-gray-300 px-2 py-1 rounded"
                  onClick={() => setEditingId(null)}
                  disabled={loading}
                >
                  Cancelar
                </button>
              </div>
            ) : (
              <>
                <div className="flex-1">
                  <div className="font-medium">{ing.descripcion}</div>
                  <div className="text-sm text-gray-600">
                    {ing.fecha} — ${ing.monto}
                  </div>
                </div>
                <div className="flex gap-2">
                  {canEdit && (
                    <>
                      <button
                        className="text-blue-600 hover:underline"
                        onClick={() => handleEdit(ing)}
                        disabled={loading}
                      >
                        Editar
                      </button>
                      <button
                        className="text-red-600 hover:underline"
                        onClick={() => handleDelete(ing.id)}
                        disabled={loading}
                      >
                        Eliminar
                      </button>
                    </>
                  )}
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
