export default function CommonTable({
  columns,
  data,
  actions,
  exportable = false,
  exportName = 'export.csv',
  className = '',
}) {
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
    <div className={`admin-table-shell ${className}`.trim()}>
      {exportable && data.length > 0 && (
        <div className="admin-table-toolbar">
          <button
            onClick={handleExport}
            className="admin-table-export"
          >
            <i className="fas fa-file-csv"></i> Descargar CSV
          </button>
        </div>
      )}
      <table className="admin-table">
        <thead>
          <tr className="admin-table-head-row">
            {columns.map(col => (
              <th key={col.key} className="admin-table-head-cell">
                {col.header}
              </th>
            ))}
            {actions && <th className="admin-table-head-cell">Acciones</th>}
          </tr>
        </thead>
        <tbody className="admin-table-body">
          {data.map((row, idx) => (
            <tr key={row.id || idx} className="admin-table-row">
              {columns.map((col, cIdx) => {
                return (
                  <td key={`${col.key}-${cIdx}`} className="admin-table-cell">
                    {typeof col.render === 'function'
                      ? col.render(row[col.key], row)
                      : row[col.key]}
                  </td>
                );
              })}
              {actions && (
                <td className="admin-table-cell admin-table-actions-cell">
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
