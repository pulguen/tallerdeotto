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
    <div className="w-full h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--border-subtle)" vertical={false} />
          <XAxis
            dataKey="mes"
            stroke="var(--muted)"
            tick={{ fill: 'var(--muted)', fontSize: 12 }}
            tickLine={{ stroke: 'var(--border-subtle)' }}
            axisLine={{ stroke: 'var(--border-subtle)' }}
          />
          <YAxis
            stroke="var(--muted)"
            tick={{ fill: 'var(--muted)', fontSize: 12 }}
            tickLine={{ stroke: 'var(--border-subtle)' }}
            axisLine={{ stroke: 'var(--border-subtle)' }}
            tickFormatter={(value) => `$${value}`}
          />
          <Tooltip
            formatter={v => [`$${v.toLocaleString()}`, '']}
            contentStyle={{
              backgroundColor: 'var(--card)', /* Theme Card BG */
              borderColor: 'var(--border-subtle)',
              color: 'var(--ink)',
              borderRadius: '12px', /* radius-lg */
              boxShadow: 'var(--shadow-soft)',
              padding: '12px'
            }}
            itemStyle={{ color: 'var(--ink)', fontWeight: 500 }}
            labelStyle={{ color: 'var(--muted)', marginBottom: '8px', fontSize: '0.9em' }}
            cursor={{ stroke: 'var(--border-subtle)', strokeWidth: 1 }}
          />
          <Legend wrapperStyle={{ paddingTop: '20px' }} />
          <Line
            type="monotone"
            dataKey="gastos"
            name="Gastos"
            stroke="#ef4444"
            strokeWidth={3}
            dot={{ r: 4, strokeWidth: 2, fill: 'var(--bg)', stroke: '#ef4444' }}
            activeDot={{ r: 7, strokeWidth: 0, fill: '#ef4444' }}
          />
          <Line
            type="monotone"
            dataKey="ingresos"
            name="Ingresos"
            stroke="var(--brand-500)" /* Brand color for Ingresos/Positive */
            strokeWidth={3}
            dot={{ r: 4, strokeWidth: 2, fill: 'var(--bg)', stroke: 'var(--brand-500)' }}
            activeDot={{ r: 7, strokeWidth: 0, fill: 'var(--brand-500)' }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}