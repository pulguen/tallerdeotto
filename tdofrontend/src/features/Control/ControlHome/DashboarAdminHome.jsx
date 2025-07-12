import React, { useEffect, useState } from "react";
import axios from "../../../context/customAxios";
import ResumenGeneral from "../../../common/Components/Resumen/ResumenGeneral"; // Ajustá la ruta según tu estructura

export default function DashboardHome() {
  const [stats, setStats] = useState({
    totalGastos: 0,
    totalIngresos: 0,
    totalCategorias: 0,
    totalSubcategorias: 0,
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchStats = async () => {
      setLoading(true);
      try {
        // Ajustá los endpoints a tu backend real
        const [gastosRes, ingresosRes, catRes, subcatRes] = await Promise.all([
          axios.get("gastos/gastos/"),
          axios.get("ingresos/ingresos/"), // Si NO tenés, quitá este y el de abajo
          axios.get("gastos/categorias-gasto/"),
          axios.get("gastos/subcategorias-gasto/"),
        ]);
        setStats({
          totalGastos: gastosRes.data?.reduce((acc, g) => acc + parseFloat(g.monto), 0),
          totalIngresos: ingresosRes.data?.reduce((acc, i) => acc + parseFloat(i.monto), 0),
          totalCategorias: catRes.data?.length || 0,
          totalSubcategorias: subcatRes.data?.length || 0,
        });
      } catch (err) {
        // Opcional: Mostrar error
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  // Arma los datos a mostrar en ResumenGeneral
  const resumenItems = [
    { label: "Total Gastos", value: stats.totalGastos, currency: true },
    { label: "Total Ingresos", value: stats.totalIngresos, currency: true },
    { label: "Categorías", value: stats.totalCategorias, currency: false },
    { label: "Subcategorías", value: stats.totalSubcategorias, currency: false },
  ];

  return (
    <div style={{ padding: 24 }}>
      <h2 className="mb-4">Dashboard General</h2>
      {loading ? (
        <div className="text-muted text-center p-5">Cargando...</div>
      ) : (
        <ResumenGeneral items={resumenItems} />
      )}

      {/* Acá sumá charts, tablas o KPIs que quieras */}
    </div>
  );
}