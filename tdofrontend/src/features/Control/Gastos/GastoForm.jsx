import React, { useState, useEffect } from "react";
import CustomButton from "../../../common/Components/Button/CustomButton";
import axios from "../../../context/customAxios";
import Swal from "sweetalert2";

export default function GastoForm({
  categorias = [],
  subcategorias = [],
  categoriaId: initialCategoriaId,
  subcategoriaId: initialSubcategoriaId,
  editData,
  onSuccess,
  onClose,
}) {
  const [categoriaId, setCategoriaId] = useState(initialCategoriaId || "");
  const [subcategoriaId, setSubcategoriaId] = useState(initialSubcategoriaId || "");
  const [descripcion, setDescripcion] = useState("");
  const [monto, setMonto] = useState("");
  const [fecha, setFecha] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (editData) {
      setDescripcion(editData.descripcion || "");
      setMonto(editData.monto || "");
      setFecha(editData.fecha || "");
      setCategoriaId(editData.categoria || "");
      setSubcategoriaId(editData.subcategoria || "");
    } else {
      setDescripcion("");
      setMonto("");
      setFecha("");
      setCategoriaId(initialCategoriaId || "");
      setSubcategoriaId(initialSubcategoriaId || "");
    }
    // eslint-disable-next-line
  }, [editData, initialCategoriaId, initialSubcategoriaId]);

  // Filtra subcategorías según categoría
  const subcatsFiltradas = categoriaId
    ? subcategorias.filter((sc) => String(sc.categoria) === String(categoriaId))
    : subcategorias;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const data = {
      descripcion,
      monto: parseFloat(monto),
      fecha,
      categoria: categoriaId,
      subcategoria: subcategoriaId || null,
    };
    try {
      if (editData && editData.id) {
        await axios.put(`gastos/gastos/${editData.id}/`, data);
        Swal.fire("Gasto actualizado", "", "success");
      } else {
        await axios.post("gastos/gastos/", data);
        Swal.fire("Gasto creado", "", "success");
      }
      onSuccess?.();
      onClose?.();
    } catch (error) {
      Swal.fire(
        "Error",
        error.response?.data?.detail ||
          JSON.stringify(error.response?.data) ||
          "Algo salió mal",
        "error"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 space-y-3">
      {/* Solo muestra los selects si no están fijos */}
      {!initialCategoriaId && (
        <div>
          <label className="block text-sm">Categoría</label>
          <select
            className="w-full border rounded px-2 py-1"
            value={categoriaId}
            onChange={(e) => {
              setCategoriaId(e.target.value);
              setSubcategoriaId(""); // reset
            }}
            required
          >
            <option value="">Seleccionar</option>
            {categorias.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.nombre}
              </option>
            ))}
          </select>
        </div>
      )}
      {initialCategoriaId && (
        <div>
          <label className="block text-sm">Categoría</label>
          <input
            className="w-full border rounded px-2 py-1 bg-gray-100"
            value={
              categorias.find((cat) => String(cat.id) === String(categoriaId))?.nombre || ""
            }
            disabled
            readOnly
          />
        </div>
      )}
      {/* Subcategoria */}
      {initialCategoriaId && (
        initialSubcategoriaId ? (
          <div>
            <label className="block text-sm">Subcategoría</label>
            <input
              className="w-full border rounded px-2 py-1 bg-gray-100"
              value={
                subcategorias.find((s) => String(s.id) === String(subcategoriaId))?.nombre || ""
              }
              disabled
              readOnly
            />
          </div>
        ) : (
          <div>
            <label className="block text-sm">Subcategoría <span className="text-xs">(opcional)</span></label>
            <select
              className="w-full border rounded px-2 py-1"
              value={subcategoriaId}
              onChange={e => setSubcategoriaId(e.target.value)}
            >
              <option value="">Sin subcategoría</option>
              {subcatsFiltradas.map((subcat) => (
                <option key={subcat.id} value={subcat.id}>
                  {subcat.nombre}
                </option>
              ))}
            </select>
          </div>
        )
      )}
      {/* Otros campos */}
      <div>
        <label className="block text-sm">Descripción</label>
        <input
          className="w-full border rounded px-2 py-1"
          value={descripcion}
          onChange={e => setDescripcion(e.target.value)}
          required
        />
      </div>
      <div>
        <label className="block text-sm">Monto</label>
        <input
          className="w-full border rounded px-2 py-1"
          type="number"
          value={monto}
          onChange={e => setMonto(e.target.value)}
          min="0"
          step="0.01"
          required
        />
      </div>
      <div>
        <label className="block text-sm">Fecha</label>
        <input
          className="w-full border rounded px-2 py-1"
          type="date"
          value={fecha}
          onChange={e => setFecha(e.target.value)}
          required
        />
      </div>
      <div className="flex gap-2 mt-4 justify-end">
        {onClose && (
          <CustomButton
            type="button"
            onClick={onClose}
            variant="secondary"
            disabled={loading}
          >
            Cancelar
          </CustomButton>
        )}
        <CustomButton type="submit" loading={loading} disabled={loading}>
          Guardar
        </CustomButton>
      </div>
    </form>
  );
}
