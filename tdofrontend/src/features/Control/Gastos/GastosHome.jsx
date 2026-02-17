import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import axios from '../../../context/customAxios';
import CategoriaTable from './CategoriaTable';
import CategoriaForm from './CategoriaForm';
import SubcategoriaForm from './SubcategoriaForm';
import CustomButton from '../../../common/Components/Button/CustomButton';
import GastoForm from './GastoForm';
import CommonModal from '../../../common/Components/Modal/CommonModal';
import LoadingSpinner from '../../../common/Components/Feedback/LoadingSpinner';
import EmptyState from '../../../common/Components/Feedback/EmptyState';

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

  const handleExport = () => {
    if (!gastos || !gastos.length) return;

    const headers = 'ID,Descripción,Monto,Fecha,Categoría,Subcategoría';
    const rows = gastos
      .map(g => {
        const catName = categorias.find(c => c.id === g.categoria)?.nombre || '';
        const subName = subcategorias.find(s => s.id === g.subcategoria)?.nombre || '';
        const desc = `"${g.descripcion.replace(/"/g, '""')}"`;
        return `${g.id},${desc},${g.monto},${g.fecha},"${catName}","${subName}"`;
      })
      .join('\n');

    const csvContent = `data:text/csv;charset=utf-8,${encodeURIComponent(`${headers}\n${rows}`)}`;
    const link = document.createElement('a');
    link.setAttribute('href', csvContent);
    link.setAttribute('download', 'gastos.csv');
    document.body.appendChild(link);
    link.click();
    link.remove();
  };

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
      Swal.fire('Error', 'No se pudieron cargar los datos.', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAll();
  }, []);

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
    const confirmation = await Swal.fire({
      title: '¿Borrar categoría?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, borrar',
      cancelButtonText: 'Cancelar',
    });

    if (!confirmation.isConfirmed) return;

    try {
      await axios.delete(`gastos/categorias-gasto/${id}/`);
      fetchAll();
    } catch (err) {
      Swal.fire('Error', 'No se pudo borrar la categoría.', 'error');
    }
  };

  const handleDeleteSubcategoria = async id => {
    const confirmation = await Swal.fire({
      title: '¿Borrar subcategoría?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, borrar',
      cancelButtonText: 'Cancelar',
    });

    if (!confirmation.isConfirmed) return;

    try {
      await axios.delete(`gastos/subcategorias-gasto/${id}/`);
      fetchAll();
    } catch (err) {
      Swal.fire('Error', 'No se pudo borrar la subcategoría.', 'error');
    }
  };

  const handleDeleteGasto = async id => {
    const confirmation = await Swal.fire({
      title: '¿Borrar gasto?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, borrar',
      cancelButtonText: 'Cancelar',
    });

    if (!confirmation.isConfirmed) return;

    try {
      await axios.delete(`gastos/gastos/${id}/`);
      fetchAll();
    } catch (err) {
      Swal.fire('Error', 'No se pudo borrar el gasto.', 'error');
    }
  };

  const getModalTitle = () => {
    if (modalType === 'categoria') return editData ? 'Editar categoría' : 'Nueva categoría';
    if (modalType === 'subcategoria') return editData ? 'Editar subcategoría' : 'Nueva subcategoría';
    if (modalType === 'gasto') return editData ? 'Editar gasto' : 'Nuevo gasto';
    return '';
  };

  return (
    <div className="admin-container">
      <div className="admin-section-header">
        <h2 className="admin-title-gradient">Gastos</h2>
        <div className="admin-actions-row">
          <CustomButton onClick={handleExport} variant="outline-primary" size="sm" disabled={loading || !gastos.length}>
            <i className="fas fa-file-csv"></i>
            Exportar CSV
          </CustomButton>
          <CustomButton onClick={() => openModal('categoria')} variant="primary">
            + Nueva categoría
          </CustomButton>
        </div>
      </div>

      {loading && <LoadingSpinner text="Cargando gastos..." />}

      {!loading && categorias.length === 0 && (
        <EmptyState
          icon="fas fa-coins"
          title="Sin categorías"
          description="No hay categorías de gastos cargadas."
          actionLabel="+ Nueva categoría"
          onAction={() => openModal('categoria')}
        />
      )}

      {!loading &&
        categorias.map(cat =>
          cat && typeof cat.nombre === 'string' ? (
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

      <CommonModal isOpen={showModal} onClose={closeModal} title={getModalTitle()}>
        {modalType === 'categoria' && <CategoriaForm editData={editData} onSuccess={() => { closeModal(); fetchAll(); }} />}
        {modalType === 'subcategoria' && (
          <SubcategoriaForm
            categorias={categorias}
            editData={editData}
            onSuccess={() => {
              closeModal();
              fetchAll();
            }}
            defaultCategoria={parentCategoria}
          />
        )}
        {modalType === 'gasto' && (
          <GastoForm
            categorias={categorias}
            subcategorias={subcategorias}
            editData={editData}
            onSuccess={() => {
              closeModal();
              fetchAll();
            }}
            onClose={closeModal}
            categoriaId={parentCategoria}
            subcategoriaId={parentSubcategoria}
          />
        )}
      </CommonModal>
    </div>
  );
}
