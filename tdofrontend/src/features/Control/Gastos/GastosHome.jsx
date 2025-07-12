import React, { useEffect, useState } from 'react';
import axios from '../../../context/customAxios';
import CategoriaTable from './CategoriaTable';
import CategoriaForm from './CategoriaForm';
import SubcategoriaForm from './SubcategoriaForm';
import CustomButton from '../../../common/Components/Button/CustomButton';
import Swal from 'sweetalert2';
import GastoForm from './GastoForm';

export default function GastosHome() {
  const [categorias, setCategorias] = useState([]);
  const [subcategorias, setSubcategorias] = useState([]);
  const [gastos, setGastos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('');
  const [editData, setEditData] = useState(null);
  const [parentCategoria, setParentCategoria] = useState(null);
  const [parentSubcategoria, setParentSubcategoria] = useState(null);

  const fetchAll = async () => {
    setLoading(true);
    try {
      const [catRes, subRes, gastoRes] = await Promise.all([
        axios.get('gastos/categorias-gasto/'),
        axios.get('gastos/subcategorias-gasto/'),
        axios.get('gastos/gastos/'),
      ]);
      setCategorias(catRes.data || []);
      setSubcategorias(subRes.data || []);
      setGastos(gastoRes.data || []);
    } catch (err) {
      setCategorias([]);
      setSubcategorias([]);
      setGastos([]);
      Swal.fire('Error', 'No se pudieron cargar los datos', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchAll(); }, []);

  const openModal = (type, data = null, cat = null, subcat = null) => {
    setModalType(type);
    setEditData(data);
    setParentCategoria(cat);
    setParentSubcategoria(subcat);
    setShowModal(true);
  };
  const closeModal = () => {
    setShowModal(false);
    setEditData(null);
    setParentCategoria(null);
    setParentSubcategoria(null);
  };

  const handleDeleteCategoria = async id => {
    if (!(await Swal.fire({ title: '¿Borrar categoría?', showCancelButton: true, icon: 'warning' })).isConfirmed) return;
    try {
      await axios.delete(`gastos/categorias-gasto/${id}/`);
      fetchAll();
    } catch (err) {
      Swal.fire('Error', 'No se pudo borrar la categoría', 'error');
    }
  };
  const handleDeleteSubcategoria = async id => {
    if (!(await Swal.fire({ title: '¿Borrar subcategoría?', showCancelButton: true, icon: 'warning' })).isConfirmed) return;
    try {
      await axios.delete(`gastos/subcategorias-gasto/${id}/`);
      fetchAll();
    } catch (err) {
      Swal.fire('Error', 'No se pudo borrar la subcategoría', 'error');
    }
  };
  const handleDeleteGasto = async id => {
    if (!(await Swal.fire({ title: '¿Borrar gasto?', showCancelButton: true, icon: 'warning' })).isConfirmed) return;
    try {
      await axios.delete(`gastos/gastos/${id}/`);
      fetchAll();
    } catch (err) {
      Swal.fire('Error', 'No se pudo borrar el gasto', 'error');
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-5">Gastos</h2>
      <div className="flex gap-3 mb-4">
        <CustomButton onClick={() => openModal('categoria')}>Nueva Categoría</CustomButton>
      </div>
      {loading && <div className="text-center text-gray-400 p-8">Cargando...</div>}
      {!loading && categorias.length === 0 && (
        <div className="text-center text-gray-400 p-8">No hay categorías cargadas.</div>
      )}
      {!loading && categorias.map(cat =>
        cat && typeof cat.nombre === "string" ? (
          <CategoriaTable
            key={cat.id}
            categoria={cat}
            subcategorias={Array.isArray(subcategorias) ? subcategorias.filter(sc => sc.categoria === cat.id) : []}
            gastos={Array.isArray(gastos) ? gastos.filter(g => g.categoria === cat.id) : []}
            onEditCategoria={() => openModal('categoria', cat)}
            onDeleteCategoria={handleDeleteCategoria}
            onAddSubcategoria={() => openModal('subcategoria', null, cat.id)}
            onAddGasto={() => openModal('gasto', null, cat.id)}
            onEditSubcategoria={subcat => openModal('subcategoria', subcat, cat.id)}
            onDeleteSubcategoria={handleDeleteSubcategoria}
            onAddGastoSubcat={subcat => openModal('gasto', null, cat.id, subcat.id)}
            onEditGasto={gasto => openModal('gasto', gasto, cat.id, gasto.subcategoria)}
            onDeleteGasto={handleDeleteGasto}
          />
        ) : null
      )}

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-xl shadow-lg p-6 min-w-[350px] max-w-md">
            <div className="flex justify-between items-center mb-3">
              <h2 className="text-lg font-semibold">
                {modalType === 'categoria' && (editData ? 'Editar Categoría' : 'Nueva Categoría')}
                {modalType === 'subcategoria' && (editData ? 'Editar Subcategoría' : 'Nueva Subcategoría')}
                {modalType === 'gasto' && (editData ? 'Editar Gasto' : 'Nuevo Gasto')}
              </h2>
              <button onClick={closeModal} className="text-xl font-bold hover:text-red-600">×</button>
            </div>
            {modalType === 'categoria' &&
              <CategoriaForm editData={editData} onSuccess={() => { closeModal(); fetchAll(); }} />
            }
            {modalType === 'subcategoria' &&
              <SubcategoriaForm
                categorias={categorias}
                editData={editData}
                onSuccess={() => { closeModal(); fetchAll(); }}
                defaultCategoria={parentCategoria}
              />
            }
            {modalType === 'gasto' &&
              <GastoForm
                categorias={categorias}
                subcategorias={subcategorias}
                editData={editData}
                onSuccess={() => { closeModal(); fetchAll(); }}
                onClose={closeModal}
                categoriaId={parentCategoria}
                subcategoriaId={parentSubcategoria}
              />
            }
          </div>
        </div>
      )}
    </div>
  );
}
