import React from "react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid
} from "recharts";

export default function EvolucionMensualChart({ data }) {
  return (
    <div className="bg-white rounded-2xl shadow p-4 mb-8">
      <h4 className="mb-2 font-semibold">Evolución Mensual</h4>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="mes" />
          <YAxis />
          <Tooltip formatter={v => `$${v.toLocaleString()}`} />
          <Legend />
          <Line type="monotone" dataKey="gastos" name="Gastos" stroke="#ef4444" />
          <Line type="monotone" dataKey="ingresos" name="Ingresos" stroke="#22c55e" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
