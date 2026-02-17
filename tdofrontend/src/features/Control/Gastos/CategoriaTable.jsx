import React from 'react';
import CustomButton from '../../../common/Components/Button/CustomButton';

export default function CategoriaTable({
  categoria,
  subcategorias = [],
  gastos = [],
  onEditCategoria,
  onDeleteCategoria,
  onAddSubcategoria,
  onAddGasto,
  onEditSubcategoria,
  onDeleteSubcategoria,
  onAddGastoSubcat,
  onEditGasto,
  onDeleteGasto,
}) {
  if (!categoria || typeof categoria.nombre !== 'string') {
    console.warn('CategoriaTable: categoría inválida o vacía:', categoria);
    return null;
  }

  const gastosDirectos = Array.isArray(gastos) ? gastos.filter(g => !g.subcategoria) : [];

  return (
    <div className="gastos-category-card">
      <div className="gastos-category-header">
        <div>
          <h3 className="gastos-category-name">{categoria.nombre}</h3>
          {categoria.descripcion && <p className="gastos-category-description">{categoria.descripcion}</p>}
        </div>

        <div className="admin-actions-row">
          <CustomButton size="sm" onClick={onEditCategoria} variant="ghost">
            Editar
          </CustomButton>
          <CustomButton size="sm" variant="danger" onClick={() => onDeleteCategoria(categoria.id)}>
            Borrar
          </CustomButton>
          <CustomButton size="sm" variant="success" onClick={onAddSubcategoria}>
            + Subcategoría
          </CustomButton>
          <CustomButton size="sm" variant="primary" onClick={onAddGasto}>
            + Gasto
          </CustomButton>
        </div>
      </div>

      <div className="admin-table-shell">
        <table className="admin-table">
          <thead>
            <tr className="admin-table-head-row">
              <th className="admin-table-head-cell">Nombre</th>
              <th className="admin-table-head-cell">Monto</th>
              <th className="admin-table-head-cell">Fecha</th>
              <th className="admin-table-head-cell">Acciones</th>
            </tr>
          </thead>

          <tbody className="admin-table-body">
            {gastosDirectos.map(gasto => (
              <tr key={gasto.id} className="admin-table-row">
                <td className="admin-table-cell">{gasto.descripcion}</td>
                <td className="admin-table-cell">${gasto.monto}</td>
                <td className="admin-table-cell">{gasto.fecha}</td>
                <td className="admin-table-cell admin-table-actions-cell">
                  <div className="admin-actions-row">
                    <CustomButton size="sm" variant="ghost" onClick={() => onEditGasto(gasto)}>
                      Editar
                    </CustomButton>
                    <CustomButton size="sm" variant="danger" onClick={() => onDeleteGasto(gasto.id)}>
                      Borrar
                    </CustomButton>
                  </div>
                </td>
              </tr>
            ))}

            {Array.isArray(subcategorias) &&
              subcategorias.map(subcat => {
                const gastosSubcat = Array.isArray(gastos) ? gastos.filter(g => g.subcategoria === subcat.id) : [];

                return (
                  <React.Fragment key={subcat.id}>
                    <tr className="gastos-subcategory-row">
                      <td className="admin-table-cell">
                        <span className="gastos-subcategory-title">{subcat.nombre}</span>
                        {subcat.descripcion && <span className="gastos-subcategory-description">{subcat.descripcion}</span>}
                      </td>
                      <td className="admin-table-cell"></td>
                      <td className="admin-table-cell"></td>
                      <td className="admin-table-cell admin-table-actions-cell">
                        <div className="admin-actions-row">
                          <CustomButton size="sm" variant="ghost" onClick={() => onEditSubcategoria(subcat)}>
                            Editar
                          </CustomButton>
                          <CustomButton size="sm" variant="danger" onClick={() => onDeleteSubcategoria(subcat.id)}>
                            Borrar
                          </CustomButton>
                          <CustomButton size="sm" variant="primary" onClick={() => onAddGastoSubcat(subcat)}>
                            + Gasto
                          </CustomButton>
                        </div>
                      </td>
                    </tr>

                    {gastosSubcat.length === 0 ? (
                      <tr className="admin-table-row">
                        <td className="admin-table-cell gastos-empty-row" colSpan={4}>
                          Sin gastos registrados en esta subcategoría.
                        </td>
                      </tr>
                    ) : (
                      gastosSubcat.map(gasto => (
                        <tr key={gasto.id} className="admin-table-row">
                          <td className="admin-table-cell">{gasto.descripcion}</td>
                          <td className="admin-table-cell">${gasto.monto}</td>
                          <td className="admin-table-cell">{gasto.fecha}</td>
                          <td className="admin-table-cell admin-table-actions-cell">
                            <div className="admin-actions-row">
                              <CustomButton size="sm" variant="ghost" onClick={() => onEditGasto(gasto)}>
                                Editar
                              </CustomButton>
                              <CustomButton size="sm" variant="danger" onClick={() => onDeleteGasto(gasto.id)}>
                                Borrar
                              </CustomButton>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </React.Fragment>
                );
              })}

            {(!subcategorias || subcategorias.length === 0) && gastosDirectos.length === 0 && (
              <tr className="admin-table-row">
                <td className="admin-table-cell gastos-empty-row" colSpan={4}>
                  Sin subcategorías ni gastos.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
