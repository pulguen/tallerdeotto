import React, { useEffect, useState } from "react";
import axios from "../../../context/customAxios";
import ResumenGeneral from "../../../common/Components/Resumen/ResumenGeneral";
import EvolucionMensualChart from "./EvolucionMensualChart";
import CustomButton from "../../../common/Components/Button/CustomButton";
import LoadingSpinner from "../../../common/Components/Feedback/LoadingSpinner";

// Helpers para primer y último día del mes actual
function getPrimerDiaMesActual() {
  const now = new Date();
  return now.toISOString().slice(0, 8) + '01';
}
function getUltimoDiaMesActual() {
  const now = new Date();
  const last = new Date(now.getFullYear(), now.getMonth() + 1, 0);
  return last.toISOString().slice(0, 10);
}

// Título dinámico según rango seleccionado
function getTituloPorRango(desde, hasta) {
  if (!desde && !hasta) return "Todos los meses";
  if (desde && hasta && desde.slice(0, 7) === hasta.slice(0, 7)) {
    // Un solo mes
    const [anio, mes] = desde.split("-");
    const meses = [
      "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
      "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
    ];
    return `${meses[parseInt(mes, 10) - 1]} ${anio}`;
  }
  // Rango
  const mostrarMes = fecha => {
    const [anio, mes] = fecha.split("-");
    const meses = [
      "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
      "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
    ];
    return `${meses[parseInt(mes, 10) - 1]} ${anio}`;
  };
  if (desde && hasta)
    return `${mostrarMes(desde)} a ${mostrarMes(hasta)}`;
  if (desde)
    return `Desde ${mostrarMes(desde)}`;
  if (hasta)
    return `Hasta ${mostrarMes(hasta)}`;
}

export default function DashboardHome() {
  // Estados para fechas: inicializar con el mes actual
  const [desde, setDesde] = useState(getPrimerDiaMesActual());
  const [hasta, setHasta] = useState(getUltimoDiaMesActual());

  // Resto igual...
  const [stats, setStats] = useState({ totalGastos: 0, totalIngresos: 0 });
  const [evolucion, setEvolucion] = useState([]);
  const [loading, setLoading] = useState(true);
  const [allEvolucion, setAllEvolucion] = useState([]);
  const [allGastosTotal, setAllGastosTotal] = useState(0);
  const [allIngresosTotal, setAllIngresosTotal] = useState(0);

  useEffect(() => {
    const fetchAll = async () => {
      setLoading(true);
      try {
        const [
          gastosResumen, ingresosResumen,
          gastosTotal, ingresosTotal
        ] = await Promise.all([
          axios.get("/gastos/gastos/resumen_mensual/"),
          axios.get("/ingresos/resumen_mensual/"),
          axios.get("/gastos/gastos/total/"),
          axios.get("/ingresos/total/")
        ]);

        const mesesSet = new Set([
          ...gastosResumen.data.map(x => x.mes),
          ...ingresosResumen.data.map(x => x.mes)
        ]);
        const meses = Array.from(mesesSet).sort();

        const datos = meses.map(mes => ({
          mes,
          gastos: gastosResumen.data.find(x => x.mes === mes)?.total || 0,
          ingresos: ingresosResumen.data.find(x => x.mes === mes)?.total || 0,
        }));

        setAllEvolucion(datos);
        setAllGastosTotal(gastosTotal.data.total || 0);
        setAllIngresosTotal(ingresosTotal.data.total || 0);

        // No setea stats ni evolucion acá: eso lo maneja el efecto de filtro

      } catch (e) {
        console.error("Error obteniendo datos del dashboard:", e);
      } finally {
        setLoading(false);
      }
    };
    fetchAll();
  }, []);

  // Filtra por defecto al mes actual o al rango seleccionado
  useEffect(() => {
    if (!allEvolucion.length) return;

    // Si no hay filtro, muestra todo
    if (!desde && !hasta) {
      setEvolucion(allEvolucion);
      setStats({
        totalGastos: allGastosTotal,
        totalIngresos: allIngresosTotal,
      });
      return;
    }

    const mesInicio = desde ? desde.slice(0, 7) : null;
    const mesFin = hasta ? hasta.slice(0, 7) : null;
    const evolucionFiltrada = allEvolucion.filter(({ mes }) => {
      if (mesInicio && mes < mesInicio) return false;
      if (mesFin && mes > mesFin) return false;
      return true;
    });

    const totalGastosFiltrado = evolucionFiltrada.reduce((acc, x) => acc + x.gastos, 0);
    const totalIngresosFiltrado = evolucionFiltrada.reduce((acc, x) => acc + x.ingresos, 0);

    setEvolucion(evolucionFiltrada);
    setStats({
      totalGastos: totalGastosFiltrado,
      totalIngresos: totalIngresosFiltrado,
    });
  }, [desde, hasta, allEvolucion, allGastosTotal, allIngresosTotal]);

  const resumenItems = [
    { label: "Total Gastos", value: stats.totalGastos, currency: true, icon: 'fas fa-arrow-down', colorClass: 'text-red-500' },
    { label: "Total Ingresos", value: stats.totalIngresos, currency: true, icon: 'fas fa-arrow-up', colorClass: 'text-green-500' },
    { label: "Saldo Neto", value: stats.totalIngresos - stats.totalGastos, currency: true, icon: 'fas fa-wallet', colorClass: 'text-cyan-400' }
  ];

  return (
    <div className="admin-container">
      <div className="admin-section-header">
        <h2 className="admin-title-gradient">{getTituloPorRango(desde, hasta)}</h2>
      </div>

      {/* Filtro por fecha - Minimalista */}
      <div className="admin-filters-bar mb-5">
        <label className="form-label-custom mb-0 text-sm">
          Desde
          <input
            type="date"
            className="form-input-custom"
            value={desde}
            onChange={e => setDesde(e.target.value)}
          />
        </label>
        <label className="form-label-custom mb-0 text-sm">
          Hasta
          <input
            type="date"
            className="form-input-custom"
            value={hasta}
            onChange={e => setHasta(e.target.value)}
          />
        </label>

        <div className="flex gap-2 flex-grow justify-end items-end mt-2 md:mt-0">
          {(desde || hasta) && (
            <CustomButton
              variant="action"
              size="sm"
              onClick={() => {
                setDesde(getPrimerDiaMesActual());
                setHasta(getUltimoDiaMesActual());
              }}
            >
              Mes actual
            </CustomButton>
          )}
          {(desde !== "" || hasta !== "") && (
            <CustomButton
              variant="outline-primary"
              size="sm"
              onClick={() => { setDesde(""); setHasta(""); }}
            >
              Ver todo
            </CustomButton>
          )}
        </div>
      </div>

      {loading ? (
        <LoadingSpinner text="Cargando datos maestros..." />
      ) : (
        <>
          <ResumenGeneral items={resumenItems} />
          <div className="minimal-card p-4 mt-4">
            <h4 className="mb-4 fw-bold fs-5" style={{ color: 'var(--ink)' }}>Evolución Mensual</h4>
            <EvolucionMensualChart data={evolucion} />
          </div>
        </>
      )}
    </div>
  );
}
