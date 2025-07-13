import React, { useEffect, useState } from "react";
import axios from "../../../context/customAxios";
import ResumenGeneral from "../../../common/Components/Resumen/ResumenGeneral";
import EvolucionMensualChart from "./EvolucionMensualChart";

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
  if (desde && hasta && desde.slice(0,7) === hasta.slice(0,7)) {
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
    { label: "Total Gastos", value: stats.totalGastos, currency: true },
    { label: "Total Ingresos", value: stats.totalIngresos, currency: true },
    { label: "Saldo Neto", value: stats.totalIngresos - stats.totalGastos, currency: true }
  ];

  return (
    <div style={{ padding: 24 }}>
      <h2 className="mb-4">{getTituloPorRango(desde, hasta)}</h2>

      {/* Filtro por fecha */}
      <div style={{
        display: 'flex',
        gap: 16,
        alignItems: 'center',
        marginBottom: 24
      }}>
        <label>
          Desde:
          <input
            type="date"
            value={desde}
            onChange={e => setDesde(e.target.value)}
            style={{ marginLeft: 4 }}
          />
        </label>
        <label>
          Hasta:
          <input
            type="date"
            value={hasta}
            onChange={e => setHasta(e.target.value)}
            style={{ marginLeft: 4 }}
          />
        </label>
        {(desde || hasta) && (
          <button onClick={() => {
            setDesde(getPrimerDiaMesActual());
            setHasta(getUltimoDiaMesActual());
          }}>
            Mes actual
          </button>
        )}
        {(desde !== "" || hasta !== "") && (
          <button style={{ marginLeft: 8 }} onClick={() => { setDesde(""); setHasta(""); }}>
            Ver todo
          </button>
        )}
      </div>

      {loading ? (
        <div className="text-muted text-center p-5">Cargando...</div>
      ) : (
        <>
          <ResumenGeneral items={resumenItems} />
          <EvolucionMensualChart data={evolucion} />
        </>
      )}
    </div>
  );
}
