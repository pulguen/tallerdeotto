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
    <div className="mb-8 border border-[var(--border-subtle)] rounded-xl shadow-[var(--shadow-soft)] overflow-hidden bg-[var(--card)]">
      {/* Header de categoría */}
      <div className="flex items-center justify-between p-4 border-b border-[var(--border-subtle)] bg-[var(--bg-soft)]">
        <div>
          <span className="font-extrabold text-2xl text-[var(--brand-400)]">{categoria.nombre}</span>
          {categoria.descripcion && (
            <span className="ml-3 text-base text-[var(--muted)]">{categoria.descripcion}</span>
          )}
        </div>
        <div className="flex gap-2">
          <CustomButton size="sm" onClick={onEditCategoria} variant="ghost">Editar</CustomButton>
          <CustomButton size="sm" variant="danger" onClick={() => onDeleteCategoria(categoria.id)}>Borrar</CustomButton>
          <CustomButton size="sm" variant="success" onClick={onAddSubcategoria}>+ Subcat</CustomButton>
          <CustomButton size="sm" variant="primary" onClick={onAddGasto}>+ Gasto</CustomButton>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="border-b border-[var(--border-subtle)]">
              <th className="px-4 py-3 text-left font-semibold text-[var(--muted)]">Nombre</th>
              <th className="px-4 py-3 text-left font-semibold text-[var(--muted)]">Monto</th>
              <th className="px-4 py-3 text-left font-semibold text-[var(--muted)]">Fecha</th>
              <th className="px-4 py-3 text-left font-semibold text-[var(--muted)]">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--border-subtle)]">
            {/* Gastos directos en la categoría */}
            {gastosDirectos.map(gasto => (
              <tr key={gasto.id} className="hover:bg-white/5 transition-colors">
                <td className="px-4 py-3 pl-8 text-[var(--ink)]">💸 {gasto.descripcion}</td>
                <td className="px-4 py-3 text-[var(--ink)]">${gasto.monto}</td>
                <td className="px-4 py-3 text-[var(--ink)]">{gasto.fecha}</td>
                <td className="px-4 py-3">
                  <div className="flex gap-2">
                    <CustomButton size="sm" variant="ghost" onClick={() => onEditGasto(gasto)}>Editar</CustomButton>
                    <CustomButton size="sm" variant="danger" onClick={() => onDeleteGasto(gasto.id)}>Borrar</CustomButton>
                  </div>
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
                  <tr className="bg-[var(--bg-soft)]">
                    <td className="px-4 py-3 pl-4 font-bold flex items-center text-[var(--brand-500)]">
                      🗂️ {subcat.nombre}
                      <span className="ml-2 font-normal text-[var(--muted)]">{subcat.descripcion}</span>
                    </td>
                    <td></td>
                    <td></td>
                    <td className="px-4 py-2">
                      <div className="flex gap-2">
                        <CustomButton size="sm" variant="ghost" onClick={() => onEditSubcategoria(subcat)}>Editar</CustomButton>
                        <CustomButton size="sm" variant="danger" onClick={() => onDeleteSubcategoria(subcat.id)}>Borrar</CustomButton>
                        <CustomButton size="sm" variant="primary" onClick={() => onAddGastoSubcat(subcat)}>+ Gasto</CustomButton>
                      </div>
                    </td>
                  </tr>
                  {gastosSubcat.length === 0 ? (
                    <tr>
                      <td className="pl-8 px-4 py-3 italic text-[var(--muted)]" colSpan={4}>
                        Sin gastos registrados en esta subcategoría.
                      </td>
                    </tr>
                  ) : (
                    gastosSubcat.map(gasto => (
                      <tr key={gasto.id} className="hover:bg-white/5 transition-colors border-b border-[var(--border-subtle)]">
                        <td className="px-4 py-3 pl-12 text-[var(--ink)]">💸 {gasto.descripcion}</td>
                        <td className="px-4 py-3 text-[var(--ink)]">${gasto.monto}</td>
                        <td className="px-4 py-3 text-[var(--ink)]">{gasto.fecha}</td>
                        <td className="px-4 py-3">
                          <div className="flex gap-2">
                            <CustomButton size="sm" variant="ghost" onClick={() => onEditGasto(gasto)}>Editar</CustomButton>
                            <CustomButton size="sm" variant="danger" onClick={() => onDeleteGasto(gasto.id)}>Borrar</CustomButton>
                          </div>
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
                <td className="px-4 py-6" colSpan={4}>
                  <div className="flex flex-col items-center justify-center py-4 text-[var(--muted)] opacity-70">
                    <i className="fas fa-folder-open text-2xl mb-2"></i>
                    <span className="text-sm">Sin subcategorías ni gastos</span>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
