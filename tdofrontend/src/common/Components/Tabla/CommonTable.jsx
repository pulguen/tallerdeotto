export default function CommonTable({ columns, data, actions, exportable = false, exportName = 'export.csv' }) {
  const handleExport = () => {
    if (!data || !data.length) return;

    // Header row
    const headers = columns.map(col => col.header).join(',');

    // Data rows
    const rows = data.map(row => {
      return columns.map(col => {
        let val = row[col.key];
        // Handle render functions if needed, typically we export raw data or simple string
        // For simplicity, we export raw data values, wrapping strings in quotes
        if (typeof val === 'string') val = `"${val.replace(/"/g, '""')}"`; // Escape quotes
        return val;
      }).join(',');
    }).join('\n');

    const csvContent = "data:text/csv;charset=utf-8," + encodeURIComponent(headers + '\n' + rows);
    const link = document.createElement("a");
    link.setAttribute("href", csvContent);
    link.setAttribute("download", exportName);
    document.body.appendChild(link);
    link.click();
    link.remove();
  };

  return (
    <div className="overflow-x-auto rounded-xl border border-[var(--border-subtle)]">
      {exportable && data.length > 0 && (
        <div className="bg-[var(--card)] p-2 border-b border-[var(--border-subtle)] flex justify-end">
          <button
            onClick={handleExport}
            className="text-xs font-medium text-[var(--brand-400)] hover:text-[var(--brand-300)] flex items-center gap-1 transition-colors"
          >
            <i className="fas fa-file-csv"></i> Descargar CSV
          </button>
        </div>
      )}
      <table className="min-w-full border-collapse">
        <thead>
          <tr className="bg-[var(--card)]">
            {columns.map(col => (
              <th key={col.key} className="px-4 py-3 text-left text-sm font-semibold" style={{ color: 'var(--muted)', borderBottom: '1px solid var(--border-subtle)' }}>
                {col.header}
              </th>
            ))}
            {actions && <th className="px-4 py-3 text-left text-sm font-semibold" style={{ color: 'var(--muted)', borderBottom: '1px solid var(--border-subtle)' }}>Acciones</th>}
          </tr>
        </thead>
        <tbody className="divide-y divide-[var(--border-subtle)] bg-[var(--card)]">
          {data.map((row, idx) => (
            <tr key={row.id || idx} className="hover:bg-white/5 transition-colors">
              {columns.map((col, cIdx) => {
                return (
                  <td key={col.key} className="px-4 py-3 text-sm" style={{ color: 'var(--ink)' }}>
                    {typeof col.render === 'function'
                      ? col.render(row[col.key], row)
                      : row[col.key]}
                  </td>
                );
              })}
              {actions && (
                <td className="px-4 py-3 text-sm whitespace-nowrap">
                  {actions(row)}
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
