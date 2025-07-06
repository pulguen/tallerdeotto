import React, { useState, useEffect, useCallback } from 'react';
import axios from '../../../context/customAxios';
import { useAuth } from '../../../context/useAuth';
import CommonTable from '../../../common/Components/Tabla/CommonTable';
import CommonModal from '../../../common/Components/Modal/CommonModal';
import CustomButton from '../../../common/Button/CustomButton';
import TotalBox from '../../../common/Components/Resumen/TotalBox';


export default function Ingresos() {
  const { user } = useAuth();
  const isAdmin = user?.groups?.includes('Admin');
  const isStaff = user?.groups?.includes('Staff');
  const canEdit = isAdmin || isStaff;
  const [ingresos, setIngresos] = useState([]);
  const [newDescripcion, setNewDescripcion] = useState('');
  const [newCliente, setNewCliente] = useState('');
  const [newFecha, setNewFecha] = useState('');
  const [newMonto, setNewMonto] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editDescripcion, setEditDescripcion] = useState('');
  const [editCliente, setEditCliente] = useState('');
  const [editFecha, setEditFecha] = useState('');
  const [editMonto, setEditMonto] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(false);

  const totalIngresos = ingresos.reduce((sum, ingreso) => sum + parseFloat(ingreso.monto), 0);


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
      setIngresos(normalizeData(data));
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.detail || err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchIngresos();
  }, [fetchIngresos]);

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
        cliente: newCliente,
      });
      setIngresos(prev => [...prev, created]);
      setNewDescripcion('');
      setNewCliente('');
      setNewFecha('');
      setNewMonto('');
      setShowModal(false);
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
    setEditCliente(ingreso.cliente || '');
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
        cliente: editCliente,
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
    <div className="p-6 max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-2xl font-bold">Ingresos</h2>
      </div>

      {error && <div className="mb-4 text-red-600">{error}</div>}
      {loading && <div className="mb-4">Cargando...</div>}

      {!loading && ingresos.length === 0 && !error && (
        <div className="text-gray-600">No hay ingresos registrados.</div>
      )}

      {canEdit && (
        <div className="mb-3">
          <TotalBox label="Total de Ingresos" value={totalIngresos} />
        </div>
      )}


      {!loading && ingresos.length > 0 && (
        <CommonTable
          columns={[
            {
              key: 'cliente',
              header: 'Cliente',
              render: (_, row) =>
                editingId === row.id ? (
                  <input
                    className="border p-1 w-full"
                    type="text"
                    value={editCliente}
                    onChange={e => setEditCliente(e.target.value)}
                    disabled={loading}
                  />
                ) : (
                  row.cliente || ''
                ),
            },
            {
              key: 'descripcion',
              header: 'Descripción',
              render: (_, row) =>
                editingId === row.id ? (
                  <input
                    className="border p-1 w-full"
                    type="text"
                    value={editDescripcion}
                    onChange={e => setEditDescripcion(e.target.value)}
                    disabled={loading}
                  />
                ) : (
                  row.descripcion
                ),
            },

            {
              key: 'fecha',
              header: 'Fecha',
              render: (_, row) =>
                editingId === row.id ? (
                  <input
                    className="border p-1"
                    type="date"
                    value={editFecha}
                    onChange={e => setEditFecha(e.target.value)}
                    disabled={loading}
                  />
                ) : (
                  row.fecha
                ),
            },
            {
              key: 'monto',
              header: 'Monto',
              render: (_, row) =>
                editingId === row.id ? (
                  <input
                    className="border p-1 w-24"
                    type="number"
                    value={editMonto}
                    onChange={e => setEditMonto(e.target.value)}
                    disabled={loading}
                  />
                ) : (
                  `$${parseFloat(row.monto).toLocaleString('es-AR')}`
                ),
            },
          ]}
          data={ingresos}
          actions={(row) =>
            editingId === row.id ? (
              <div className="flex gap-2">
                <CustomButton
                  variant="success"
                  size="sm"
                  onClick={() => handleUpdate(row.id)}
                  disabled={loading}
                >
                  Guardar
                </CustomButton>
                <CustomButton
                  variant="secondary"
                  size="sm"
                  onClick={() => setEditingId(null)}
                  disabled={loading}
                >
                  Cancelar
                </CustomButton>
              </div>
            ) : (
              canEdit && (
                <div className="flex gap-2">
                  <CustomButton
                    variant="ghost"
                    size="sm"
                    onClick={() => handleEdit(row)}
                    disabled={loading}
                  >
                    Editar
                  </CustomButton>
                  <CustomButton
                    variant="danger"
                    size="sm"
                    onClick={() => handleDelete(row.id)}
                    disabled={loading}
                  >
                    Eliminar
                  </CustomButton>
                </div>
              )
            )
          }
        />
      )}
      <div className="flex justify-between items-center mt-2 mb-4">
        {canEdit && (
          <CustomButton onClick={() => setShowModal(true)} disabled={loading}>
            Nuevo Ingreso
          </CustomButton>
        )}
      </div>
      {/* Modal para nuevo ingreso */}
      <CommonModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title="Nuevo Ingreso"
      >
        <div className="flex flex-col gap-2">
          <input
            className="border p-2"
            type="text"
            placeholder="Descripción"
            value={newDescripcion}
            onChange={e => setNewDescripcion(e.target.value)}
            disabled={loading}
          />
          <input
            className="border p-2"
            type="text"
            placeholder="Cliente"
            value={newCliente}
            onChange={e => setNewCliente(e.target.value)}
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
            className="border p-2"
            type="number"
            placeholder="Monto"
            value={newMonto}
            onChange={e => setNewMonto(e.target.value)}
            disabled={loading}
          />
          <div className="flex justify-end gap-2 mt-4">
            <CustomButton
              variant="secondary"
              onClick={() => setShowModal(false)}
              disabled={loading}
            >
              Cancelar
            </CustomButton>
            <CustomButton
              variant="success"
              onClick={handleAdd}
              disabled={loading}
              loading={loading}
            >
              Guardar
            </CustomButton>
          </div>
        </div>
      </CommonModal>
    </div>
  );
}