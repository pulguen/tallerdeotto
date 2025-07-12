import React from "react";
import CustomButton from "../../../common/Components/Button/CustomButton";

// ¡Asegurate que nunca explote si falta la categoría!
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
  // PROTECCIÓN: Si no hay categoría válida, no renderizar (ni intentar leer .nombre)
  if (!categoria || typeof categoria.nombre !== "string") {
    console.warn("CategoriaTable: categoria inválida o vacía:", categoria);
    return null;
  }

  const gastosDirectos = Array.isArray(gastos)
    ? gastos.filter(g => !g.subcategoria)
    : [];

  return (
    <div className="mb-8 border rounded-xl shadow bg-white">
      {/* Header de categoría */}
      <div className="flex items-center justify-between p-4 border-b bg-blue-50 rounded-t">
        <div>
          <span className="font-extrabold text-2xl text-blue-900">{categoria.nombre}</span>
          {categoria.descripcion && (
            <span className="ml-3 text-gray-500 text-base">{categoria.descripcion}</span>
          )}
        </div>
        <div className="flex gap-2">
          <CustomButton size="sm" onClick={onEditCategoria}>Editar</CustomButton>
          <CustomButton size="sm" variant="danger" onClick={() => onDeleteCategoria(categoria.id)}>Borrar</CustomButton>
          <CustomButton size="sm" variant="success" onClick={onAddSubcategoria}>+ Subcat</CustomButton>
          <CustomButton size="sm" variant="primary" onClick={onAddGasto}>+ Gasto</CustomButton>
        </div>
      </div>
      <table className="min-w-full">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-2 text-left">Nombre</th>
            <th className="px-4 py-2">Monto</th>
            <th className="px-4 py-2">Fecha</th>
            <th className="px-4 py-2">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {/* Gastos directos en la categoría */}
          {gastosDirectos.map(gasto => (
            <tr key={gasto.id}>
              <td className="px-4 py-2 pl-8 text-gray-800">💸 {gasto.descripcion}</td>
              <td className="px-4 py-2">${gasto.monto}</td>
              <td className="px-4 py-2">{gasto.fecha}</td>
              <td className="px-4 py-2">
                <CustomButton size="sm" onClick={() => onEditGasto(gasto)}>Editar</CustomButton>
                <CustomButton size="sm" variant="danger" onClick={() => onDeleteGasto(gasto.id)}>Borrar</CustomButton>
              </td>
            </tr>
          ))}

          {/* Subcategorías */}
          {Array.isArray(subcategorias) && subcategorias.map(subcat => {
            const gastosSubcat = Array.isArray(gastos)
              ? gastos.filter(g => g.subcategoria === subcat.id)
              : [];
            return (
              <React.Fragment key={subcat.id}>
                <tr className="bg-gray-50">
                  <td className="px-4 py-2 pl-4 font-bold text-blue-900 flex items-center">
                    🗂️ {subcat.nombre}
                    <span className="ml-2 text-gray-400">{subcat.descripcion}</span>
                  </td>
                  <td></td>
                  <td></td>
                  <td>
                    <CustomButton size="sm" onClick={() => onEditSubcategoria(subcat)}>Editar</CustomButton>
                    <CustomButton size="sm" variant="danger" onClick={() => onDeleteSubcategoria(subcat.id)}>Borrar</CustomButton>
                    <CustomButton size="sm" variant="primary" onClick={() => onAddGastoSubcat(subcat)}>+ Gasto</CustomButton>
                  </td>
                </tr>
                {gastosSubcat.length === 0 ? (
                  <tr>
                    <td className="pl-8 px-4 py-2 text-gray-400" colSpan={4}>
                      Sin gastos registrados en esta subcategoría.
                    </td>
                  </tr>
                ) : (
                  gastosSubcat.map(gasto => (
                    <tr key={gasto.id}>
                      <td className="px-4 py-2 pl-12 text-gray-700">💸 {gasto.descripcion}</td>
                      <td className="px-4 py-2">${gasto.monto}</td>
                      <td className="px-4 py-2">{gasto.fecha}</td>
                      <td className="px-4 py-2">
                        <CustomButton size="sm" onClick={() => onEditGasto(gasto)}>Editar</CustomButton>
                        <CustomButton size="sm" variant="danger" onClick={() => onDeleteGasto(gasto.id)}>Borrar</CustomButton>
                      </td>
                    </tr>
                  ))
                )}
              </React.Fragment>
            );
          })}

          {/* Si no hay subcategorías ni gastos */}
          {(!subcategorias || subcategorias.length === 0) && gastosDirectos.length === 0 && (
            <tr>
              <td className="px-4 py-6 text-center text-gray-400" colSpan={4}>
                Sin subcategorías ni gastos en esta categoría.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
